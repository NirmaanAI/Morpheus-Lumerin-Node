from typing import List
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from helpers import check_provider_exists, get_models_by_provider
from models import Card, ModelDataResponse, ProviderExistenceResponse
from sample import get_model_data, get_provider_table_data, get_provider_chart_data, get_recent_activity
from scripts.get_model_mapping import get_formatted_model_data
from web3_setup import web3, diamond_contract_address

app = FastAPI()

origins = [
    "http://localhost:3000"                # Frontend Development URL
    # "https://your-frontend-domain.com",  # Replace with your actual frontend domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def call_contract_method(method_name: str):
    function_selector = web3.keccak(text=method_name)[:4]
    call_data = function_selector
    raw_result = web3.eth.call({'to': diamond_contract_address, 'data': call_data})
    return int.from_bytes(raw_result, 'big')


@app.get("/")
async def read_root():
    """
    Root Endpoint for testing whether our FastAPI app is running or not.

    Parameters: None

    Returns:
        dict: A dictionary containing {"Hello": "World"} which signifies that our API is up and running

    """

    return {"Hello": "World"}


@app.get("/publicCards", response_model=List[Card])
async def public_cards():
    """
    Retrieve a list of cards displaying statistical data for the dashboard page.

    Parameters: None

    Each card includes:
    - ID
    - Name
    - Icon
    - Amount
    - Label
    - Link (URL)

    The data retrieved includes the number of registered providers, the total number of available models,
    and an adjustable field for the next disbursement time which is populated on the frontend.

    Raises:
    - HTTPException: If the data retrieval fails, it will raise a 500 internal server error with a generic message.

    Returns:
    List[Card]: A list of Card objects populated with data from the blockchain queries.
    """

    provider_count = await call_contract_method('providerGetCount()')
    model_count = await call_contract_method('modelGetCount()')

    cards = [
        Card(_id=1, name="Registered Providers",
             icon="bi bi-person-fill-check",
             amount=str(provider_count),
             label="Become a provider",
             href="https://mor.org/"),

        Card(_id=2,
             name="Available Models",
             icon="bi bi-gpu-card",
             amount=str(model_count),
             label="Explore LLMs",
             href="https://mor.org/"),

        Card(_id=3,
             name="Next Disbursement",
             icon="bi bi-hourglass-split",
             amount="",                        # Value will be overwritten by our Frontend
             label="How does it work?",
             href="https://mor.org/")
    ]
    return cards


@app.get("/modelData", response_model=ModelDataResponse)
async def model_data():
    """
    Retrieve summarized data for all models for display on the dashboard page.

    This endpoint queries the backend to fetch data regarding the number of registered providers,
    the total number of models available, and sets up the base for the next disbursement time, which
    will be filled in by the frontend (FE). Each model's data includes an identifier, the model name,
    the number of providers for that model, the best asking price in MOR/IPS, the number of active sessions,
    and a link for more details.

    Parameters: None

    Returns:
        ModelDataResponse: An object containing a list of models under the key 'recentmodeldata',
        where each model is represented as:
            - _id (int): The unique identifier of the model.
            - model (str): The name of the model.
            - numberOfProviders (int): The number of providers available for the model.
            - bestAsk (str): The best asking price for opening a session using the model,
                             formatted as a string in MOR/IPS.
            - activeSessions (int): The current number of active sessions using the model.
            - link (str): A URL to more detailed information about the model (filled in by our FE).
    """

    formatted_data = await get_formatted_model_data()
    return ModelDataResponse(recentmodeldata=formatted_data)


@app.get("/providerExists", response_model=ProviderExistenceResponse)
async def provider_exists(address: str):
    """
    Determines whether the given Ethereum address is registered as a provider in the provider ecosystem.

    This endpoint is specifically used in the Provider Page to verify if an address belongs to a registered provider.
    It checks the blockchain to confirm the provider's status.

    Parameters:
        address (str): The Ethereum address to check. This must be a valid address string.
                       The address is case-sensitive and should be provided in checksum format to avoid errors.

    Raises:
        HTTPException: If the 'address' parameter is not provided, an HTTP 400 error is returned with a message
                        stating that the address parameter is required.

    Returns:
        ProviderExistenceResponse: contains a single key 'providerExists' which maps to a boolean value:
              - True if the address is a registered provider.
              - False if the address is not registered.

    Example:
        Request URL: https://your-frontend-domain.com/providerExists?address=0x123...
        Response: {"providerExists": true}

    Note:
        If the address is not found or invalid, the endpoint still returns {"providerExists": false}, as the
        main purpose is to check for registration status, not the validity of the address.
    """

    if not address:
        raise HTTPException(status_code=400, detail="Address parameter is required")

    provider_exists_value = await check_provider_exists(address)
    return ProviderExistenceResponse(providerExists=provider_exists_value)


@app.get("/hostedModels")
async def hosted_models(address: str):
    """
    Retrieves a list of models currently hosted by a specific provider based on their Ethereum address.

    This endpoint is used to query the backend for all models that are actively hosted by a given provider.
    It is useful for monitoring and managing provider engagements across different models.

    Parameters:
        address (str): The Ethereum address of the provider. This should be a valid checksum address
                       to ensure accurate querying.

    Raises:
        HTTPException: If the 'address' parameter is not provided or is invalid, an HTTP 400 error
                        is returned with a message indicating that the address parameter is required.

    Returns:
        dict: A Dictionary where each key is the name of a model and the value is the count of how
              many instances of that model are currently hosted by the provider. This provides a quick
              overview of provider activity.

    Usage:
        To get a list of models hosted by a provider address, send a GET request to:
        https://your-frontend-domain.com/hostedModels?address=0x123...

    This information is critical for providers to understand their market engagement and for platform
    administrators to monitor the distribution of models across different providers.
    """

    if not address:
        raise HTTPException(status_code=400, detail="Address parameter is required")

    provider_hosted_models = await get_models_by_provider(address)
    return provider_hosted_models


@app.get("/model")
async def model_page(modelName: str):
    """
    NOTE: Currently in testing phase. Subject to change after the upcoming smart contract updates on the testnet.

    Retrieves detailed data for a specific model from the marketplace, intended to be displayed on the Models Page.

    Parameters:
        modelName (str): The name of the model for which data is being requested. This is a required parameter.

    Raises:
        HTTPException: If the 'modelName' parameter is not provided, an HTTP 400 error is returned with a message
                        indicating that the model name is required.

    Returns:
        dict: A dictionary containing detailed information about the specified model. This includes graphical
              data for the model's performance over time and a table of detailed session data. Each entry includes:
              - graphData: Summary of the model's metrics over time, such as average daily values and active usage.
              - tableData: Detailed data about the usage of the model, including session counts, response times,
                           asking price per session (ipsAsk), and links to more information.

    Usage:
        To fetch data for a model named 'Llama 2.0', make a GET request like so:
        https://your-frontend-domain.com/model?modelName=Llama%202.0

    This endpoint is critical for providing stakeholders with insights into specific models' usage and performance,
    facilitating better management and optimization of resources.
    """

    if not modelName:
        raise HTTPException(status_code=400, detail="Model name parameter is required")

    return get_model_data(modelName)


@app.get("/providerTableData")
async def provider_table_data(modelName: str):
    """
    Retrieves detailed earnings and session data for a specific model, primarily used on the Provider Page
    to display financial and operational metrics related to the model's use by different providers.

    This endpoint provides key metrics for each provider who has hosted sessions with the specified model,
    which helps in analyzing the performance and earning potential of the model.

    Parameters:
        modelName (str): The name of the model for which the table data is requested. This is a required
                         parameter used to fetch corresponding provider data.

    Raises:
        HTTPException: If the 'modelName' parameter is not provided, an HTTP 400 error is returned with a
                        message indicating that the model name is required.

    Returns:
        list: A list of dictionaries, each containing the following keys:
            - _id (int): The unique identifier for the provider session entry.
            - date (str): The date on which the data was recorded.
            - totalSessions (int): Total number of sessions hosted by the provider for this model.
            - avgResponseTime (str): The average response time of the provider node in milliseconds.
            - numberOfActiveSessions (int): The current number of active sessions for the model.
            - morEarned (int): Total MOR earned by the provider for this model.
            - id (str): A unique identifier for the record, useful for database management.

    Usage:
        To retrieve provider table data for the model named 'Llama 2.0', send a GET request to:
        https://your-frontend-domain.com/providerTableData?modelName=Llama%202.0
    """

    if not modelName:
        raise HTTPException(status_code=400, detail="Model name parameter is required")

    return get_provider_table_data(modelName)


@app.get("/providerModelChart")
async def provider_model_chart(modelName: str):
    """
    NOTE: Currently in testing phase. Subject to change after the upcoming smart contract updates on the testnet.

    Retrieves time-series data for visualization of performance metrics related to a specific model hosted by providers.
    This endpoint is crucial for generating line charts that track metrics such as average response time and daily
    interactive session counts (IPS) over a specified period.

    Parameters:
        modelName (str): The name of the model for which chart data is requested. This is a required parameter
                         used to fetch corresponding data for charting performance metrics.

    Raises:
        HTTPException: Currently in testing phase. Subject to change after the upcoming smart contract updates on the testnet.

    Returns:
        dict: A dictionary containing structured data suitable for plotting performance metrics over time. This includes:
            - series: A list of dictionaries, each representing a different metric with its data points over time.
            - options: Configuration settings for the chart, such as chart type, axis configurations, and other display options.

    Usage:
        To get the chart data for the model 'Llama 2.0', send a GET request to:
        https://your-frontend-domain.com/providerModelChart?modelName=Llama%202.0

    """

    if not modelName:
        raise HTTPException(status_code=400, detail="Model name parameter is required")

    return get_provider_chart_data(modelName)


@app.get("/recentActivity")
async def recent_activity():
    """
    NOTE: Currently in testing phase. Subject to change after the upcoming smart contract updates on the testnet.

    Dummy Data Endpoint for Updates in the Dashboard Section (Deprecated)
    """

    return get_recent_activity()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
