-- Run the following statements to create a database, schema, and tables with data loaded from AWS S3.

CREATE DATABASE IF NOT EXISTS DASH_DB;
CREATE SCHEMA IF NOT EXISTS DASH_SCHEMA;
CREATE WAREHOUSE IF NOT EXISTS DASH_S WAREHOUSE_SIZE=SMALL;

USE DASH_DB.DASH_SCHEMA;
USE WAREHOUSE DASH_S;
  
-- SUPPORT_TICKETS
create or replace file format csvformat  
  skip_header = 1  
  field_optionally_enclosed_by = '"'  
  type = 'CSV';  
  
create or replace stage support_tickets_data_stage  
  file_format = csvformat  
  url = 's3://sfquickstarts/sfguide_integrate_snowflake_cortex_agents_with_microsoft_teams/support/';  
  
create or replace table SUPPORT_TICKETS (  
  ticket_id VARCHAR(60),  
  customer_name VARCHAR(60),  
  customer_email VARCHAR(60),  
  service_type VARCHAR(60),  
  request VARCHAR,  
  contact_preference VARCHAR(60)  
);  
  
copy into SUPPORT_TICKETS  
  from @support_tickets_data_stage;

-- SUPPLY_CHAIN
create or replace stage supply_chain_data_stage  
  file_format = csvformat  
  url = 's3://sfquickstarts/sfguide_integrate_snowflake_cortex_agents_with_microsoft_teams/supply_chain/';  
  
create or replace TABLE SUPPLY_CHAIN (
	PRODUCT_ID VARCHAR(16777216),
	SUPPLIER_VENDOR_NAME VARCHAR(16777216),
	INVOICE_NUMBER VARCHAR(16777216),
	PRODUCT_NAME VARCHAR(16777216),
	ORDER_DATE DATE,
	SHIP_DATE DATE,
	DELIVERY_DATE DATE,
	DELIVERY_TIME NUMBER(38,0),
	PRICE NUMBER(38,2),
	AVERAGE_SHIPPING_TIME NUMBER(38,1),
	AVERAGE_PRODUCT_PRICE NUMBER(38,2),
	CAPACITY NUMBER(38,0),
	PAYMENT_TERMS VARCHAR(16777216),
	RETURN_RATE NUMBER(38,2),
	SHIPPING_START_LOCATION VARCHAR(16777216)
);
  
copy into SUPPLY_CHAIN  
  from @supply_chain_data_stage;

-- Run the following statement to create a Snowflake managed internal stage to store the semantic model specification file.
create or replace stage DASH_SEMANTIC_MODELS encryption = (TYPE = 'SNOWFLAKE_SSE') directory = ( ENABLE = true );

-- Run the following statement to create a Snowflake managed internal stage to store the PDF documents.
 create or replace stage DASH_PDFS encryption = (TYPE = 'SNOWFLAKE_SSE') directory = ( ENABLE = true );