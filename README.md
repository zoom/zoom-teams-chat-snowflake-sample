# Zoom Teams Chat Snowflake Cortex Sample App

This project demonstrates the integration between Zoom Chat, and Snowflake using Cortex for intelligent data querying. It allows users to interact with Snowflake data through chat interfaces, providing natural language query capabilities for support tickets and supply chain data.

## Features

- Integration with Zoom Chat Bot
- Snowflake database integration with sample datasets
- Support for querying support tickets and supply chain data
- Natural language processing using Snowflake Cortex
- Express.js backend server
- Semantic models for data interpretation

## Prerequisites

- Node.js
- Snowflake account
- Zoom Bot credentials
- `.env` file with necessary configuration

## Setup

1. **Database Setup**
   ```sql
   -- Run setup.sql to create:
   - DASH_DB database
   - DASH_SCHEMA schema
   - Support tickets table
   - Supply chain data table
   - Required stages and file formats
   ```

2. **Environment Variables**
   Create a `.env` file with the following variables:
   ```
   PORT=5000
   SNOWFLAKE_ACCOUNT=your_account
   SNOWFLAKE_USERNAME=your_username
   SNOWFLAKE_PASSWORD=your_password
   SNOWFLAKE_DATABASE=DASH_DB
   SNOWFLAKE_SCHEMA=DASH_SCHEMA
   ZOOM_BOT_JID=your_zoom_bot_jid
   ZOOM_CLIENT_ID=your_zoom_client_id
   ZOOM_CLIENT_SECRET=your_zoom_client_secret
   ZOOM_VERIFICATION_TOKEN=your_zoom_verification_token
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start the Server**
   ```bash
   npm start
   ```

## Project Structure

- `index.js` - Main Express server setup and bot endpoint
- `snowflake.js` - Snowflake connection and query handling
- `zoom.js` - Zoom Chat integration functions
- `setup.sql` - Database setup scripts
- `*_semantic_model.yaml` - Semantic models for data interpretation
- `create_search_service.sql` - Search service setup
- `cortex_search_service.sql` - Cortex service configuration

## Usage

1. Deploy the application to a server accessible by Zoom
2. Configure your Zoom Bot to point to the `/botendpoint` endpoint
3. Users can then interact with the bot in Zoom Chat to query support tickets and supply chain data
4. The bot will process natural language queries and return relevant data from Snowflake

## Data Models

The application includes two main data models:

1. **Support Tickets**
   - Customer information
   - Service requests
   - Contact preferences

2. **Supply Chain**
   - Product information
   - Shipping details
   - Supplier data
   - Pricing and delivery metrics

## Security

- All sensitive credentials should be stored in environment variables
- Snowflake SSE encryption is used for data storage
- Zoom Bot verification tokens ensure secure communication


## License

This project is licensed under the MIT License.
