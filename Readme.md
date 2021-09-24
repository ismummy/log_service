###### **Tr1pp Coding Challenge**

####Problem Statement
- Create a service called LOGGER
    - Emit all search results to logger service in form of an event
    - Search result should be stored in a collection named: search_logs
    - Search_logs should have the following fields:
        - _id
        - searchKeyword
        - result
        - createdAt
        - updatedAt
    - Create an endpoint in SEARCH SERVICE to print all search logs with pagination 

####Solution Approach
- Subscribe to Event and Store Record
    - On app bootup, I subscribe to `LOGGER_EVENT` using RABITTMQ/AMQ package to recieve event broadcast
    - The message received from the is passed to Logger controller for processing
    - The message is destructs to get `searchKeyword, data`
    - Add or update the record in database.
- Create an endpoint in SEARCH SERVICE to print all search logs with pagination 
    - I created a GET endpoint that returns the paginated data (https://tr1pp-gateway.herokuapp.com/logger/logs) or (https://tr1pp-logger-service.herokuapp.com/logs)
    - Used `mongoose-paginate-v2` package to handle the pagination.
    - default page and limit to 1 and 10 respectively if no value is passed in the query param.
    
####To run
- Clone the repo
- Run composer install
- Make a copy of .env from .env.copy
- Start the server npm run dev
