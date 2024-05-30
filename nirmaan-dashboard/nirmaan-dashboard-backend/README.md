# Nirmaan AI's FastAPI Backend for the Morpheus-Lumerin Node Dashboard 

This is the backend repository for the Morpheus-Lumerin Node Dashboard developed by Nirmaan.ai.
This backend hosts a variety of FastAPI endpoints responsible for fetching data from the Lumerin Testnet Node Smart 
Contracts and allowing communication between our backend and frontend.



## How to run this project:
1) Create a `.env` file and fill in your Alchemy HTTPS URL for the Arbitrum Sepolia Network.
   (You can refer to the `.env.example` file to see how to fill in the values and visit Alchemy to create a project
and get the URL)
2) Install the project dependencies by running the command: 
```
pip install -r "requirements.txt"
```
3) Spin up a terminal in the project folder and run the command: 
```
uvicorn main:app --reload 
```

## API Endpoints Reference Table:
| Endpoint            | Params             | Method | Response Structure | Example                                                      | Use                                                                                                                  |
|---------------------|--------------------|--------|--------------------|--------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| /publicCards        | None               | GET    | List[Card]         | https://example.com/publicCards                              | Retrieves a list of cards displaying statistical data for the dashboard page.                                        |
| /modelData          | None               | GET    | List[ModelInfo]    | https://example.com/modelData                                | Retrieve summarized data for all models for display on the dashboard page.                                           |
| /providerExists     | address (string)   | GET    | bool               | https://example.com/providerExists?address={address}         | Determines whether the given Ethereum address is registered as a provider in the provider ecosystem.                 |
| /hostedModels       | address (string)   | GET    | Dict[str, int]     | https://example.com/hostedModels?address={address}           | Retrieves a list of models currently hosted by a specific provider based on their Ethereum address.                  |
| /model              | modelName (string) | GET    | Dict               | https://example.com/model?modelName={modelName}              | Retrieves detailed data for a specific model from the marketplace, intended to be displayed on the Models Page.      |
| /providerTableData  | modelName (string) | GET    | Dict               | https://example.com/providerTableData?modelName={modelName}  | Retrieves detailed earnings and session data for a specific model, primarily used on the Provider Page.              |
| /providerModelChart | modelName (string) | GET    | Dict               | https://example.com/providerModelChart?modelName={modelName} | Retrieves time-series data for visualization of performance metrics related to a specific model hosted by providers. |
| /recentActivity     | None               | GET    | List[Dict]         | https://example.com/recentActivity                           | Retrieves Alerts and Updates in the Home/Dashboard Section                                                           |

- Note: In order to check the detailed response structure for each method, `models.py` can be used for reference.