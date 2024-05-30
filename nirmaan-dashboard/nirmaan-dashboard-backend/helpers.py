import asyncio
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor
from web3_setup import web3, provider_registry_contract, model_registry_contract, marketplace_contract

async def get_model_map_by_id(model_id):
    """
    Calls the modelMap function from the ModelRegistry contract

    Parameters: model_id (string)

    Returns: modelMap tuple with metadata about the Model associated with that model_id
    """

    loop = asyncio.get_running_loop()
    with ThreadPoolExecutor() as pool:
        model_map = await loop.run_in_executor(pool,
                                               model_registry_contract
                                               .functions
                                               .modelMap(model_id)
                                               .call)
    return model_map


async def get_models_by_provider(addr):
    """
        Calls the getActiveBidsByProvider function from the MarketPlace contract to get the data associated with Models
        and their respective bids

        Parameters: addr (string)

        Returns:
            dict: a dictionary named 'model_name_counts' with the name of a model as key and no. of instances of that
            model as value.
    """
    addr = web3.to_checksum_address(addr)
    loop = asyncio.get_running_loop()
    with ThreadPoolExecutor() as pool:
        model_id_tuple = await loop.run_in_executor(pool,
                                                    marketplace_contract
                                                    .functions
                                                    .getActiveBidsByProvider(addr)
                                                    .call)

    model_name_counts = defaultdict(int)

    if not model_id_tuple:
        model_name_counts["N/A"] = 0
        return model_name_counts

    for item in model_id_tuple:
        model_id = item[1].hex()
        formatted_model_id = "0x" + model_id
        model_map = await get_model_map_by_id(formatted_model_id)
        model_name = model_map[4] if len(model_map) > 4 and model_map[4] else "N/A"
        model_name_counts[model_name] += 1

    return model_name_counts


async def check_provider_exists(addr):
    """
        Calls the providerExists function from the ProviderRegistry contract to check whether a given address is
        a provider or not.
        Parameters: addr (string)
            Returns:
                boolean: True or False
        """

    addr = web3.to_checksum_address(addr)
    loop = asyncio.get_running_loop()
    with ThreadPoolExecutor() as pool:
        provider_exists = await loop.run_in_executor(pool,
                                                     provider_registry_contract
                                                     .functions
                                                     .providrerExists(addr)
                                                     .call)
    return provider_exists
