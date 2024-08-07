# Appointment Management API

## Overview

The Appointment Management API is a RESTful web service built with Node.js and Express.js. It provides endpoints to manage users and appointments. This API integrates with MongoDB for data storage and uses JSON Web Tokens (JWT) for user authentication and authorization.

## Features

-   **User Registration and Authentication**: Register and log in users.
-   **Appointment Management**: Create, manage, search, and cancel appointments.
-   **User Management**: Retrieve and search for user information.
-   **Error Handling**: Centralized error handling for consistent responses.

## Technologies Used

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JWT (JSON Web Tokens)
-   bcryptjs
-   cors

## Installation

### Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or later)
-   [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas instance)

### Steps

1. **Clone the Repository**

    ```bash
    git clone https://github.com/AlaminPu1007/schedule-appointment.git
    cd appointment-management-api
    ```

2. **Install Dependencies**
   `npm start`

3. Configure Environment Variables

```
MONGO_URI=mongodb://localhost:27017/yourdbname
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. **Run the Application**
   `npm start`