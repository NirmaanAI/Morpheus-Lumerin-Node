from web3 import Web3
import os
from dotenv import load_dotenv
import json

load_dotenv()

DIAMOND_PROXY_ADDRESS = "0x64Bc398E0935df5a61375FB82d1115a8f5AC6Deb"

with open('abi/diamond_abi.json', 'r') as f:
    diamond_abi = json.load(f)
with open('abi/model_registry_abi.json', 'r') as f:
    model_registry_abi = json.load(f)
with open('abi/marketplace_abi.json', 'r') as f:
    marketplace_abi = json.load(f)
with open('abi/provider_registry_abi.json', 'r') as f:
    provider_registry_abi = json.load(f)

alchemy_url = os.getenv("ALCHEMY_URL")

if alchemy_url is None:
    raise ValueError("ALCHEMY_URL is not set in the environment variables.")
web3 = Web3(Web3.HTTPProvider(alchemy_url))

if not web3.is_connected():
    raise ConnectionError("Failed to connect to the Ethereum network via Alchemy.")

diamond_contract_address = web3.to_checksum_address(DIAMOND_PROXY_ADDRESS)

diamond_contract = web3.eth.contract(address=diamond_contract_address, abi=diamond_abi)
model_registry_contract = web3.eth.contract(address=diamond_contract_address, abi=model_registry_abi)
marketplace_contract = web3.eth.contract(address=diamond_contract_address, abi=marketplace_abi)
provider_registry_contract = web3.eth.contract(address=diamond_contract_address, abi=provider_registry_abi)
