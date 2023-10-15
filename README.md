# Express.js Contact Management API 

## Introduction

This API allows you to manage contacts and user-related operations. The API is built using Express.js and MongoDB.

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Installation](#2-installation)
3. [Running the Server](#3-running-the-server)
4. [API Endpoints](#4-api-endpoints)
   - [Contacts](#4a-contacts)
   - [User](#4b-user)
5. [Authentication](#5-authentication)
6. [Error Handling](#6-error-handling)

## 1. Getting Started

### 1.1 API Features

- **Contact Management**: Create, read, update, and delete contacts.
- **User Authentication**: Sign up, log in, and delete user accounts.

## 2. Installation

Follow these steps to set up and install the Express.js Contact Management API:

1. Clone the GitHub repository to your local machine.

   ```bash
    https://github.com/rkipchumba/express-contact-api.git

2. Install project dependencies using npm.
    ```bash
     - cd express-contact-api
     - npm install express
     - npm install mongoose
     - npm install crypto-js
    
## 3. Running the Server

To run the Express.js server, execute the following command:

    ```bash
    npm start

The server will start on the default port, typically http://localhost:3000.

## 4.  API Endpoints

### 4a. Contacts

#### 4.1.1 Get All Contacts

* Endpoint: GET /contacts
* Description: Get a list of all contacts.
* Authentication: Not required.
* Response: Returns a JSON object containing an array of contact information.

#### 4.1.2 Create a New Contact

* Endpoint: POST /contacts
* Description: Create a new contact.
* Authentication: Required (user authentication token).
* Request Body: JSON object with first_name, last_name, and phone_number.
* Response: Returns a JSON object with the newly created contact information.

#### 4.1.3 Get Contact by ID

* Endpoint: GET /contacts/:contactId
* Description: Get a contact by its unique identifier.
* Authentication: Not required.
* Response: Returns a JSON object with the contact information.

#### 4.1.4 Update Contact

* Endpoint: PATCH /contacts/:contactId
* Description: Update an existing contact by its unique identifier.
* Authentication: Required (user authentication token).
* Request Body: JSON object with fields to update.
* Response: Returns a message indicating the contact was updated.

#### 4.1.5 Delete Contact

* Endpoint: DELETE /contacts/:contactId
* Description: Delete a contact by its unique identifier.
* Authentication: Required (user authentication token).
* Response: Returns a message indicating the contact was deleted.

### 4b.  User

#### 4.2.1 User Signup

* Endpoint: POST /user/signup
* Description: Create a new user account.
* Authentication: Not required.
* Request Body: JSON object with email and password.
* Response: Returns a message indicating the user was created.

#### 4.2.2 User Login

* Endpoint: POST /user/login
* Description: Log in to an existing user account.
* Authentication: Not required.
* Request Body: JSON object with email and password.
* Response: Returns an authentication token.

#### 4.2.3 User Delete

* Endpoint: DELETE /user/:userId
* Description: Delete a user account by ID.
* Authentication: Required (user authentication token).
* Response: Returns a message indicating the user was deleted.

## 5. Authentication

User authentication is required for certain API endpoints. To authenticate, include an authorization token in the request header:


Header: Authorization: Bearer {your_token_here}


## 6. Error Handling

The API provides error responses for various scenarios. The response will include a status code and a JSON object with an error message.

