# Task Tracker

This project is a simple Task Tracker application built using Express.js and React. It allows users to add, update, delete, and view tasks. The backend is developed using Express.js with MySQL as the database, and the frontend is built using React.

![Home](./client//src//assets/Home.png)

## Features:

- **Add Task:** Users can add tasks with a name and creation date.
- **Update Task:** Users can update task names.
- **Delete Task:** Users can delete tasks.
- **View Tasks:** Users can view all tasks with their creation and update timestamps.

## Backend (Express.js):

The backend is built using Express.js and MySQL, providing RESTful APIs to interact with the tasks stored in the database.

## Dependencies:

- express: Web application framework for Node.js.
- cors: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- mysql2: MySQL client for Node.js.
- dotenv: Loads environment variables from a .env file.

## Frontend (React):

The frontend is built using React, providing a user-friendly interface to interact with the Task Tracker.

## Dependencies:

- react: JavaScript library for building user interfaces.
- axios: Promise-based HTTP client for making requests to the backend API.

## How to Run:

1. Start the backend server using Express.js.
2. Start the frontend server using React.
3. I personally used MySQL Workbench.
4. This MySQL table schema defines a table with the following columns

```
idtasks	int	NO	PRI		auto_increment
task_name	varchar(225)	NO
created_at	timestamp	YES	CURRENT_TIMESTAMP	DEFAULT_GENERATED
updated_at	timestamp	YES	CURRENT_TIMESTAMP	DEFAULT_GENERATED on update CURRENT_TIMESTAMP
```

3. Make sure you give all necessary data in the `.env` file

- host: process.env.DB_HOST,
- user: process.env.DB_USER,
- password: process.env.DB_PASSWORD,
- database: process.env.DB_NAME,

## Contributors:

- Chrysovalantis Siomos.
