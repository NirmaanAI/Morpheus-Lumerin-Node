import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress } from "viem";
import { expectError, getTxTimestamp } from "./utils";
import { deployDiamond, deploySingleProvider } from "./fixtures";

describe("Provider registry", function () {
  describe("Actions", function () {
    it("Should count correctly", async function () {
      const { providerRegistry } = await loadFixture(deployDiamond);

      expect(await providerRegistry.read.providerGetCount()).eq(0n);
    });

    it("Should register", async function () {
      const { providerRegistry, provider, expectedProvider } =
        await loadFixture(deploySingleProvider);
      const data = await providerRegistry.read.providerMap([
        provider.account.address,
      ]);
      const events = await providerRegistry.getEvents.ProviderRegisteredUpdated(
        {
          provider: getAddress(provider.account.address),
        },
      );

      expect(await providerRegistry.read.providerGetCount()).eq(1n);
      expect(await providerRegistry.read.providers([0n])).eq(
        getAddress(provider.account.address),
      );
      expect(data).deep.equal({
        endpoint: expectedProvider.endpoint,
        stake: expectedProvider.stake,
        timestamp: expectedProvider.timestamp,
        isDeleted: false,
      });
      expect(events.length).eq(1);
    });

    it("Should error when registering with insufficient stake", async function () {
      const { providerRegistry, provider } = await loadFixture(deployDiamond);
      const minStake = 100n;
      await providerRegistry.write.providerSetMinStake([minStake]);
      try {
        await providerRegistry.simulate.providerRegister([
          provider.account.address,
          minStake - 1n,
          "endpoint",
        ]);
        expect.fail("Expected error");
      } catch (e) {
        expectError(e, providerRegistry.abi, "StakeTooLow");
      }
    });

    it("Should error when registering with insufficient allowance", async function () {
      const { providerRegistry, provider, tokenMOR } =
        await loadFixture(deployDiamond);
      try {
        await providerRegistry.simulate.providerRegister([
          provider.account.address,
          100n,
          "endpoint",
        ]);
        expect.fail("Expected error");
      } catch (e) {
        expectError(e, tokenMOR.abi, "ERC20InsufficientAllowance");
      }
    });

    it("Should error when register account doesnt match sender account", async function () {
      const [, , user] = await hre.viem.getWalletClients();

      const { providerRegistry, provider, tokenMOR, owner } =
        await loadFixture(deployDiamond);
      try {
        await providerRegistry.simulate.providerRegister(
          [user.account.address, 100n, "endpoint"],
          {
            account: provider.account.address,
          },
        );
        expect.fail("Expected error");
      } catch (e) {
        expectError(e, providerRegistry.abi, "NotSenderOrOwner");
      }
    });

    it("Should deregister by provider", async function () {
      const { providerRegistry, provider, expectedProvider } =
        await loadFixture(deploySingleProvider);

      await providerRegistry.write.providerDeregister(
        [provider.account.address],
        {
          account: provider.account,
        },
      );
      const events = await providerRegistry.getEvents.ProviderDeregistered({
        provider: getAddress(provider.account.address),
      });

      expect(await providerRegistry.read.providerGetCount()).eq(0n);
      expect(
        (await providerRegistry.read.providerMap([provider.account.address]))
          .isDeleted,
      ).to.equal(true);
      expect(events.length).eq(1);
      await expect(providerRegistry.read.providerGetByIndex([0n])).rejectedWith(
        /.*reverted with panic code 0x32 (Array accessed at an out-of-bounds or negative index)*/,
      );
      expect(await providerRegistry.read.providers([0n])).equals(
        getAddress(provider.account.address),
      );
    });

    it("Should deregister by admin", async function () {
      const { providerRegistry, provider, owner } =
        await loadFixture(deploySingleProvider);

      await providerRegistry.write.providerDeregister(
        [provider.account.address],
        {
          account: owner.account,
        },
      );
      const events = await providerRegistry.getEvents.ProviderDeregistered({
        provider: getAddress(provider.account.address),
      });

      expect(await providerRegistry.read.providerGetCount()).eq(0n);
      expect(events.length).eq(1);
    });

    it("Should return stake on deregister", async function () {
      const { providerRegistry, provider, tokenMOR, expectedProvider } =
        await loadFixture(deploySingleProvider);

      const balanceBefore = await tokenMOR.read.balanceOf([
        provider.account.address,
      ]);
      await providerRegistry.write.providerDeregister([
        provider.account.address,
      ]);
      const balanceAfter = await tokenMOR.read.balanceOf([
        provider.account.address,
      ]);

      expect(balanceAfter - balanceBefore).eq(expectedProvider.stake);
    });

    it("Should update stake and url", async function () {
      const {
        providerRegistry,
        provider,
        tokenMOR,
        expectedProvider,
        publicClient,
      } = await loadFixture(deploySingleProvider);
      const updates = {
        addStake: expectedProvider.stake * 2n,
        endpoint: "new-endpoint",
      };
      await tokenMOR.write.approve(
        [providerRegistry.address, updates.addStake],
        {
          account: provider.account,
        },
      );

      const txHash = await providerRegistry.write.providerRegister(
        [provider.account.address, updates.addStake, updates.endpoint],
        { account: provider.account },
      );
      const timestamp = await getTxTimestamp(publicClient, txHash);
      const providerData = await providerRegistry.read.providerMap([
        provider.account.address,
      ]);

      expect(providerData).deep.equal({
        endpoint: updates.endpoint,
        stake: expectedProvider.stake + updates.addStake,
        timestamp: timestamp,
        isDeleted: expectedProvider.isDeleted,
      });
    });

    it("Should emit event on update", async function () {
      const { providerRegistry, provider, tokenMOR, expectedProvider } =
        await loadFixture(deploySingleProvider);
      const updates = {
        addStake: expectedProvider.stake * 2n,
        endpoint: "new-endpoint",
      };

      await tokenMOR.write.approve(
        [providerRegistry.address, updates.addStake],
        {
          account: provider.account,
        },
      );
      await providerRegistry.write.providerRegister(
        [provider.account.address, updates.addStake, updates.endpoint],
        { account: provider.account },
      );

      const events = await providerRegistry.getEvents.ProviderRegisteredUpdated(
        {
          provider: getAddress(provider.account.address),
        },
      );
      expect(events.length).eq(1);
    });
  });

  describe("Getters", function () {
    it("Should get by index", async function () {
      const { providerRegistry, provider, expectedProvider } =
        await loadFixture(deploySingleProvider);
      const [address, providerData] =
        await providerRegistry.read.providerGetByIndex([0n]);

      expect(address).eq(getAddress(provider.account.address));
      expect(providerData).deep.equal({
        endpoint: expectedProvider.endpoint,
        stake: expectedProvider.stake,
        timestamp: expectedProvider.timestamp,
        isDeleted: expectedProvider.isDeleted,
      });
    });

    it("Should get by address", async function () {
      const { providerRegistry, provider, expectedProvider } =
        await loadFixture(deploySingleProvider);

      const providerData = await providerRegistry.read.providerMap([
        provider.account.address,
      ]);
      expect(providerData).deep.equal({
        endpoint: expectedProvider.endpoint,
        stake: expectedProvider.stake,
        timestamp: expectedProvider.timestamp,
        isDeleted: expectedProvider.isDeleted,
      });
    });
  });

  describe("Views", function () {
    it("should get all", async function () {
      const { providerRegistry, expectedProvider } =
        await loadFixture(deploySingleProvider);
      const [ids, providers] = await providerRegistry.read.providerGetAll();

      expect(providers.length).eq(1);
      expect(ids.length).eq(1);
      expect(ids[0]).eq(expectedProvider.address);
      expect(providers[0]).deep.equal({
        endpoint: expectedProvider.endpoint,
        stake: expectedProvider.stake,
        timestamp: expectedProvider.timestamp,
        isDeleted: expectedProvider.isDeleted,
      });
    });
  });

  describe("Min stake", function () {
    it("Should set min stake", async function () {
      const { providerRegistry, owner } = await loadFixture(deployDiamond);
      const minStake = 100n;

      await providerRegistry.write.providerSetMinStake([minStake], {
        account: owner.account,
      });
      const events = await providerRegistry.getEvents.ProviderMinStakeUpdated();
      expect(await providerRegistry.read.providerMinStake()).eq(minStake);
      expect(events.length).eq(1);
      expect(events[0].args.newStake).eq(minStake);
    });

    it("Should error when not owner is setting min stake", async function () {
      const { providerRegistry, provider } =
        await loadFixture(deploySingleProvider);

      try {
        await providerRegistry.write.providerSetMinStake([100n], {
          account: provider.account,
        });
        expect.fail("Expected error");
      } catch (e) {
        expectError(
          e,
          (await hre.artifacts.readArtifact("OwnershipFacet")).abi,
          "NotContractOwner",
        );
      }
    });
  });
});
