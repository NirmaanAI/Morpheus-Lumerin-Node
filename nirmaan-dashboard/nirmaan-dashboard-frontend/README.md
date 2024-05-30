# Nirmaan AI's Frontend for the Morpheus-Lumerin Node Dashboard

This is the frontend repository for the Morpheus-Lumerin Node Dashboard developed by Nirmaan.ai.

- This Dashboard can be broken down into multiple components, let's break down
the parent components from the components directory:

### 1) Header:
Forms our Dashboard's Header - contains the Nav Bar, Page Title and Logo components.
### 2) Sidebar:
Forms our Sidebar with React Router Links to the Dashboard, Model and Provider Pages.
### 3) Main:
Contains the main frame of our entire page, this is where we will include and place
our Dashboard/Provider/Model Page(s) and their relevant components.
   1) **_Dashboard_** - Contains general data and statistics about the Morpheus-Lumerin Provider Marketplace and Model data in the form of charts and tables.
   2) **_Model Page_** - This Page displays detailed stats of the various models present in the marketplace in the form of tables and graphs. When a view model button from the dashboard page is clicked, the API endpoint for all models will be called and the data for that particular model will be filtered, fetched, then plotted and loaded in the table.
   3) **_Provider Page_** - Displays personalised data for a registered provider and populates the page with the data linked to the registered provider's address. The provider page will allow a registered provider to track their hosted models, check personalised model and session details in the form of tables and graphs and track their balances.

### 4) Card:
Contains our main card component and the relevant styles for our other components to use in the form of cards.

## How to run:
1) Run the respective backend for this dashboard on `http://127.0.0.1:8000/` (Nirmaan AI's FastAPI backend for Morpheus-Lumerin Testnet Node)
and run this frontend on `http://localhost:3000/`. 
- NOTE: You can edit these URLs in `src/api/info.json` for frontend and `main.py` for backend if you wish to run these on different ports.

2) Run following command to install the necessary packages:
```
npm install
```
3) Finally, to run the project in development, execute the command:
```
npm start
```
