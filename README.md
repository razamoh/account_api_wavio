
## API Versioning
This API implementation includes support for versioning, ensuring that future changes to the API can maintain backward compatibility. This means that older versions of the API will continue to work without issues, even as the API evolves.

All thr requests are using `/api/v1` 
example : `http://localhost:3001/api/v1/contracts/3`

I have included the [postman](./Deel.postman_collection.json) collection in the root folder
[click here](./Deel.postman_collection.json) to view

## Request Validations
To ensure the reliability and integrity of incoming requests, the API utilizes Express-validator npm package. This tool validates the data sent to the API, verifying that it conforms to the required format and meets the necessary criteria. By implementing request validations, we can prevent errors and enhance the overall stability of the API.

## Code Linting
The codebase adheres to the air-bnb coding style guide for consistent and high-quality code. I use eslint, a linting tool, to enforce these rules and maintain code integrity. Linting helps identify potential issues or mistakes in the code, improving code readability and maintainability.

`npm run lint:fix` command will fix the coding style.

## Module Alias
To simplify importing modules and reduce the length of file paths, we employ module-aliasing techniques. This allows us to create shorter and more meaningful names for modules, enhancing code readability and maintainability.

These practices and tools have been incorporated to enhance the stability, quality, and maintainability of the API implementation.
such as 
```"@root": ".",
    "@models": "src/models/",
    "@services": "src/services/v1/",
    "@utils": "src/utils/",
    "@controllers":"src/controllers/v1/",
    "@validations":"src/middleware/validations/"
```
## Indexes
Added indexes to sequelize models to improve performance


## What iam missing
 - API Documentation - I wanted to use swagger for api documentation. unfortunately could not make it .
 - tests
 - rate limiting - To Secure from DDOS kind of attacks.
 - React Front end - opyional
 - logging
## Improvements
I wanted to implement proper error handling and logging. but due time constraint i could not make it 

## Folder Structure

The folder structure of this project follows a common convention for organizing a Node.js application. Below is a brief explanation of the different directories:

- `src`: This directory contains the source code of the application.
  - `app.js`: It serves as the entry point for the application and defines its core functionality.
  - `config`: This directory contains configuration files used by the application.
    - `database.js`: It holds the configuration settings for connecting to the database.
  - `controllers`: Here, you will find the controllers responsible for handling various routes and request handling logic.
    - `v1`: This directory represents the versioned API endpoints for version 1 of the application.
      - `admin.js`: It contains the controller functions for admin-related endpoints.
      - `balances.js`: It includes the controller functions for balance-related endpoints.
      - `contract.js`: This file consists of the controller functions for contract-related endpoints.
      - `jobs.js`: It holds the controller functions for job-related endpoints.
  - `middleware`: This directory contains middleware functions used within the application.
    - `getProfile.js`: It is a middleware function responsible for fetching user profiles.
    - `validations`: Here, you will find validation middleware functions used for different endpoint validations.
      - `adminValidation.js`: It provides validation middleware functions for admin-related endpoints.
      - `balanceValidation.js`: It includes validation middleware functions for balance-related endpoints.
      - `contractValidation.js`: This file contains validation middleware functions for contract-related endpoints.
      - `jobValidation.js`: It holds validation middleware functions for job-related endpoints.
      - `profileValidation.js`: This file includes validation middleware functions for profile-related endpoints.
  - `models`: This directory contains the model definitions for various entities.
    - `index.js`: It exports the defined models.
    - `contract`: This directory contains the model definitions for contracts.
      - `contractModel.js`: It defines the model for contracts.
    - `job`: This directory contains the model definitions for jobs.
      - `index.js`: It exports the job-related models.
      - `jobModel.js`: It defines the model for jobs.
    - `profile`: This directory contains the model definitions for profiles.
      - `index.js`: It exports the profile-related models.
      - `profileModel.js`: It defines the model for profiles.
  - `routes`: This directory contains the route definitions for the API endpoints.
    - `v1`: This directory represents the versioned API endpoints for version 1 of the application.
      - `admin`: This directory contains the route definitions for admin-related endpoints.
        - `index.js`: It defines the routes for admin-related endpoints.
      - `balances`: This directory contains the route definitions for balance-related endpoints.
        - `index.js`: It defines the routes for balance-related endpoints.
      - `contracts`: This directory contains the route definitions for contract-related endpoints.
        - `index.js`: It defines the routes for contract-related endpoints.
      - `jobs`: This directory contains the route definitions for job-related endpoints.
        - `index.js`: It defines the routes for job-related endpoints.
      - `index.js`: This file acts as the main route file for API version 1.
  - `services`: This directory contains the service files that handle the application's business logic.
    - `v1`: This directory represents the versioned services for version 1 of the application.
      - `admin`: This directory contains the service functions for admin-related operations.
        - `adminService.js`: It includes the service functions for admin-related operations.
      - `balances`: This directory contains the service functions for balance-related operations.
        - `balanceService.js`: It includes the service functions for balance-related operations.
      - `contracts`: This directory contains the service functions for contract-related operations.
        - `contractService.js`: It includes the service functions for contract-related operations.
      - `jobs`: This directory contains the service functions for job-related operations.
        - `jobsService.js`: It includes the service functions for job-related operations.
      - `index.js`: This file acts as the main service file for API version 1.
  - `utils`: This directory contains utility files used within the application.
    - `errorHandler.js`: It provides utility functions for handling errors.
    - `errorMessages.js`: It contains error message constants used within the application.
  - `test` - I have not written any test cases.

## Data Models

> **All models are defined in src/model.js**

### Profile

A profile can be either a `client` or a `contractor`.
clients create contracts with contractors. contractor does jobs for clients and get paid.
Each profile has a balance property.

### Contract

A contract between and client and a contractor.
Contracts have 3 statuses, `new`, `in_progress`, `terminated`. contracts are considered active only when in status `in_progress`
Contracts group jobs within them.

### Job

contractor get paid for jobs by clients under a certain contract.

## Getting Set Up

The exercise requires [Node.js](https://nodejs.org/en/) to be installed. We recommend using the LTS version.

1. Start by creating a local repository for this folder.

1. In the repo root directory, run `npm install` to gather all dependencies.

1. Next, `npm run seed` will seed the local SQLite database. **Warning: This will drop the database if it exists**. The database lives in a local file `database.sqlite3`.

1. Then run `npm start` which should start both the server and the React client.

❗️ **Make sure you commit all changes to the master branch!**

## Technical Notes

- The server is running with [nodemon](https://nodemon.io/) which will automatically restart for you when you modify and save a file.

- The database provider is SQLite, which will store data in a file local to your repository called `database.sqlite3`. The ORM [Sequelize](http://docs.sequelizejs.com/) is on top of it. You should only have to interact with Sequelize - **please spend some time reading sequelize documentation before starting the exercise.**

- To authenticate users use the `getProfile` middleware that is located under src/middleware/getProfile.js. users are authenticated by passing `profile_id` in the request header. after a user is authenticated his profile will be available under `req.profile`. make sure only users that are on the contract can access their contracts.
- The server is running on port 3001.

## APIs To Implement

Below is a list of the required API's for the application.

1. **_GET_** `/contracts/:id` - This API is broken 😵! it should return the contract only if it belongs to the profile calling. better fix that!

1. **_GET_** `/contracts` - Returns a list of contracts belonging to a user (client or contractor), the list should only contain non terminated contracts.

1. **_GET_** `/jobs/unpaid` - Get all unpaid jobs for a user (**_either_** a client or contractor), for **_active contracts only_**.

1. **_POST_** `/jobs/:job_id/pay` - Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance.

1. **_POST_** `/balances/deposit/:userId` - Deposits money into the the the balance of a client, a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)

1. **_GET_** `/admin/best-profession?start=<date>&end=<date>` - Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.

1. **_GET_** `/admin/best-clients?start=<date>&end=<date>&limit=<integer>` - returns the clients the paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2.

```
 [
    {
        "id": 1,
        "fullName": "Reece Moyer",
        "paid" : 100.3
    },
    {
        "id": 200,
        "fullName": "Debora Martin",
        "paid" : 99
    },
    {
        "id": 22,
        "fullName": "Debora Martin",
        "paid" : 21
    }
]
```

