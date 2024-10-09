
---

# Business Directory Backend

## 🙏 Acknowledgment

We would like to extend our heartfelt thanks to **Etech Company** for providing us with the incredible opportunity to work on this project during our internship. Your support and guidance have been invaluable in helping us develop our skills and grow as developers.

Additionally, we would like to thank all of our friends who offered insights, suggestions, and encouragement throughout the development process. Your input played a significant role in shaping the success of this project!


## 📑 Table of Contents

1. [📖 Project Overview](#📖-Project-Overview)
2. [✨ Features](#✨-features)
3. [🛠️ Technologies Used](#🛠️-technologies-used)
4. [🚀 Getting Started](#🚀-getting-started)
   - [🔧 Prerequisites](#🔧-prerequisites)
   - [⚙️ Installation](#⚙️-installation)
5. [📚 API Manual for Business Directory Project](#📚-api-manual-for-business-directory-project)
6. [🧪 Running Tests](#🧪-running-tests)
7. [🤝 Contributing](#🤝-contributing)
8. [📜 License](#📜-license)
9. [📞 Contact](#📞-contact)




## 📖 Project Overview

This repository contains the backend code for the **Business Directory** platform, a service designed to connect business owners and users by enabling businesses to be registered, rated, and managed efficiently. The backend is built using Node.js and Express and leverages PostgreSQL for data storage. Key features include JWT authentication for security, role-based access control to differentiate between regular users, business owners, and admins, and a RESTful API for interacting with the platform's data.



## 📸 Screenshot1
![Projects Screenshots](./utils/image/2.jpg)



## 📸 Screenshot2

![Projects Screenshots](./utils/image/3.jpg)


---

## ✨Features

- **Business Registration**: Allows business owners to register their businesses by selecting from a predefined list of categories.
- **User Authentication**: Secure user authentication using JWT (JSON Web Token) for session management.
- **Role-Based Access Control**: Differentiates access rights among regular users, business owners, and administrators.
- **Business Search and Ratings**: Enables users to search for businesses and leave ratings and reviews.
- **Admin Management**: Admins can manage the platform, including approving or rejecting business registrations.
- **Data Persistence**: Uses PostgreSQL for robust data storage and management.
- **Category Management**: Businesses are categorized into predefined categories, facilitating easy search and filtering.

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express**: Web framework for Node.js, used for building RESTful APIs and handling HTTP requests.
- **PostgreSQL**: Relational database management system for data persistence.
- **Prisma**: ORM (Object-Relational Mapping) tool for database interaction and schema management.
- **JWT (JSON Web Tokens)**: Used for implementing secure authentication and authorization.


## 🚀 Getting Started

### 🔧Prerequisites

- **Node.js**: Install from [Node.js official website](https://nodejs.org/).
- **PostgreSQL**: Install and set up PostgreSQL. Refer to the [official documentation](https://www.postgresql.org/docs/) for installation guidance.


### ⚙️Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/Fitsumhelina/business-directory-backend.git
    cd business-directory-backend
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:

    Create a `.env` file in the root directory and define the following environment variables:

    ```plaintext
    JWT_SECRET=your_jwt_secret
    DATABASE_URL="postgresql://username:password@localhost:5432/Business-Directory?schema=public"
    PORT=your_port
    ```

    Replace placeholders with your actual database credentials, JWT secret, and preferred port number.

4. **Migrate the Database**:

    Set up the database schema using Prisma migrations:

    ```bash
    npx prisma migrate dev --name init
    ```

5. **Seed the Database**:

    Seed the database with predefined categories:

    ```bash
    npm run seed
    ```

6. **Start the Server**:

    ```bash
    npm start
    ```

    The server will start, and you can access the application at `http://localhost:5000`.


# 📚 API Manual for Business Directory Project

## Overview
This manual provides detailed information about the API endpoints available in the Business Directory application. It includes descriptions, required fields, and example requests for both backend and frontend developers.

---

## User Management APIs

### 1. **User Registration**
- **Endpoint**: `/api/users/register`
- **Method**: `POST`
- **Purpose**: Register a new user.

#### Required Fields
| Field      | Description                          |
|------------|--------------------------------------|
| `username` | The unique username for the user.    |
| `email`    | The user's email address.            |
| `password` | The user's password.                 |
| `firstname`| The user's first name.               |
| `lastname` | The user's last name.                |

#### Example Request
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword",
  "firstname": "John",
  "lastname": "Doe"
}
```
### 2. User Login

- **Endpoint**: `/api/users/login`
- **Method**: `POST`
- **Purpose**: Log in an existing user.

#### Required Fields

| Field    | Description                  |
|----------|------------------------------|
| `email`  | The user's email address.    |
| `password` | The user's password.       |

#### Example Request

```json
POST /api/users/login
Content-Type: application/json

{
  "email": "testuser@example.com",
  "password": "Password@123"
}

```
### 3. Get User Profile

- **Endpoint**: `/api/users/profile`
- **Method**: `GET`
- **Purpose**: Retrieve the current user's profile.

#### Usage

- **Authentication**: Requires an authentication token.

#### Example Request

```http
GET /api/users/profile
Authorization: Bearer YOUR_AUTH_TOKEN
```
### 4. Update User Profile

- **Endpoint**: `/api/users/profile`
- **Method**: `PUT`
- **Purpose**: Update the user's profile information.
- **Authentication**: Requires an authentication token.
- **Required Fields**:
firstname: The updated first name.
lastname: The updated last name.
email: The updated email address.
#### Example Request

```json
PUT /api/users/profile
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "firstname": "Updated",
  "lastname": "User",
  "email": "updateduser@example.com"
}

```
### 5. Delete User Profile

- **Endpoint**: `/api/users/profile`
- **Method**: `DELETE`
- **Purpose**: Delete the current user's profile.

#### Usage

- **Authentication**: Requires an authentication token.

#### Example Request

```http
DELETE /api/users/profile
Authorization: Bearer YOUR_AUTH_TOKEN
```
## Business Directory APIs

### 1. Register Business

- **Endpoint**: `/api/businesses/register`
- **Method**: `POST`
- **Purpose**: Register a new business.

#### Required Fields


| Field                | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| `businessName`        | The name of the business.                                                   |
| `businessEmail`       | The email address of the business owner, used to identify the owner.        |
| `categoryId`          | The ID of the category to which the business belongs.                       |
| `subcategoryId`       | The ID of the subcategory to which the business belongs. **(New)**          |
| `businessAddress`     | The physical address of the business.                                       |
| `businessPhone`       | The contact phone number for the business.                                  |
| `websiteUrl`          | The business's website URL.                                                 |
| `latitude`            | The latitude coordinate of the business location.                           |
| `longitude`           | The longitude coordinate of the business location.                          |
| `openingTime`         | The opening time of the business.                              |
| `closingTime`         | The closing time of the business.                               |
| `businessLicenseNumber` | The license number of the business for verification purposes.  |



#### Example Request

```json
POST /api/businesses/register
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "businessName": "Test Business",
  "businessEmail": "business@example.com",
  "categoryId": "CATEGORY_ID_HERE",
  "businessAddress": "123 Business St",
  "businessPhone": "123-456-7890",
  "websiteUrl": "http://example.com",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "openingTime": "09:00",
  "closingTime": "17:00",
  "businessLicenseNumber": "123456789"
}


```


### 2. Get All Businesses

- **Endpoint**: `/api/businesses`
- **Method**: `GET`
- **Purpose**: Retrieve a list of all registered businesses.

#### Example Request

```http
GET /api/businesses
```
### 3. Get Business by ID

- **Endpoint**: `/api/businesses/{BUSINESS_ID}`
- **Method**: `GET`
- **Purpose**: Retrieve details of a specific business by its ID.

#### Example Request

```http
GET /api/businesses/123
```
### 4. Update Business

- **Endpoint**: `/api/businesses/business/{BUSINESS_ID}`
- **Method**: `PUT`
- **Purpose**: Update the details of an existing business.
- **Required Fields**:
  - *businessName*: The updated name of the business.
  - *businessEmail*: The updated email address.
  - *businessAddress*: The updated address.
  - *businessPhone*: The updated phone number.

#### Example Request

```json
PUT /api/businesses/123
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "businessName": "Updated Business Name",
  "businessEmail": "updated@example.com",
  "businessAddress": "456 New Address",
  "businessPhone": "987-654-3210"
}

```
### 5. Delete Business

- **Endpoint**: `/api/businesses/business/{BUSINESS_ID}`
- **Method**: `DELETE`
- **Purpose**: Delete a specific business by its ID.
- **Authentication**: Requires an authentication token.
#### Example Request

```http
DELETE /api/businesses/123
Authorization: Bearer YOUR_JWT_TOKEN

```
### 6. Get Businesses by Category ID

- **Endpoint**: `/api/businesses/businesses/category/{CATEGORY_ID}`
- **Method**: `GET`
- **Purpose**: Retrieve businesses belonging to a specific category.

#### Example Request

```http
GET /api/businesses/businesses/category/1
```
### 7. Get Businesses by Search Criteria

- **Endpoint**: `/api/businesses/search`
- **Method**: `GET`
- **Purpose**: Search for businesses based on various criteria (e.g., name, location).

#### Example Request

```http
GET /api/businesses/businesses/search?name=Test Busiyu&address=123 Business St
```

### 8,Get Category Name by Category ID

- **Endpoint**: `http://localhost:5000/api/businesses/categories/{CATEGORY_ID}`
- **Method**: `GET`
- **Purpose**: Retrieve the name of a category by its ID.

#### Example Request

```http
GET http://localhost:5000/api/businesses/categories/1
```



  
### 🧪 Running Tests

To run tests, execute the following command in the root directory:

```bash
npm test
```

Tests are located in the `tests` directory and cover various functionalities of the application.

## 🤝 Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add feature description'`).
5. Push to the branch (`git push origin feature-branch-name`).
6. Create a Pull Request.

## 📜 License

This project is licensed under the MIT License. For more information, see the [LICENSE](LICENSE) file.

## 📞 Contact the developers 

For questions or suggestions, please reach out:

- Yeabsira Behailu: [GitHub Profile](https://github.com/Yabe12)
- Fitsum Helina: [dev.fitsum@gmail.com](mailto:dev.fitsum@gmail.com)


---
