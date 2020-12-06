# DataCave AWS Services

## Introduction
Back-end API to support the BookMyCoach application.

## Setup Nodejs Server
This repository uses NPM scripts - located in the package.json file.
The Node JS runtime and NPM installer can be downloaded from:
<https://nodejs.org/en/download/current/>

## Setup project
To setup project you need to type the following command from the command-line/terminal:
```npm install```

## Running server in local system
To run server in local system you need to type following command from the command-line/terminal:
```npm start```

## Folder structure- 

- Application: Contains all api service related files
    - Constant
    - Controller
    - Database
    - Middleware
    - Model
    - Route
    - Validation 
- index.js: This is the entry point of the script.
- .env: Environment file contains secure parameters or credentials
- env.example: .env file is a private and secure file. So, we can not push .env file in repository. So, we have added a dummy env file that names 'env.example'
- package.json: Configuration related to NPM.

## API Endpoints
You can find all API and details from following link:
<https://documenter.getpostman.com/view/559309/TVmJhJqX>