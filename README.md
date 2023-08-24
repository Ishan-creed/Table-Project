# User Management System

![Project Preview](project-preview.png)

A User Management System with features for viewing, adding, updating, and deleting user records. Users can also send emails to specific users.



## Introduction

The User Management System is a web application that allows users to manage user records. It provides a user-friendly interface for performing CRUD (Create, Read, Update, Delete) operations on user data. The system also supports sending emails to specific users.

## Features

- View a table displaying user information, including name, hobbies, and contact details.
- Add new users by providing necessary details.
- Update existing user information, including name, hobbies, and contact details.
- Delete users from the system.
- Send emails to specific users with their contact details.
- Responsive and user-friendly UI for easy navigation and interaction.

## Technologies Used

- Frontend: React
- Backend: Node.js, Express.js
- Database: MongoDB
- Axios for HTTP requests
- Nodemailer for sending emails

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ishan-creed/Table-Project
   cd frontend
   npm install
   npm start

2. Backend
   cd backend
   npm install
   nodemon app.js

3. Usage
Access the application at http://localhost:3000.
View the list of users in a table format.
Use the "Update" button to modify user information.
Use the "Delete" button to remove users.
Use the "Email" button to send emails to users.
API Endpoints
GET /getUser: Get a list of all users.
POST /addUser: Add a new user.
PUT /updateUser Update user information by ID.
DELETE /deleteUser Delete a user by ID.
POST /mail: Send an email to a user.
   
   
