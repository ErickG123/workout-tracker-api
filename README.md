# Workout Tracker API
This project involves creating a backend system for a workout tracker application where users can sign up, log in, create workout plans, and track their progress. The system will feature JWT authentication, CRUD operations for workouts, and generate reports on past workouts.

## Requirements
You are required to develop an API for a workout tracker application that allows users to manage their workouts and track their progress. Your first task is to think about the database schema and the API endpoints that will be needed to support the application’s functionality. Here are some of the key features you should consider:

## Exercise Data
You should write a data seeder to populate the database with a list of exercises. Each exercise should have a name, description, and category (e.g., cardio, strength, flexibility) or muscle group (e.g., chest, back, legs). Exercises will be used to create workout plans.

## User Authentication and Authorization
Users will be able to sign up, log in, and log out of the application. You should use JWTs for authentication and authorization. Only authenticated users should be able to create, update, and delete workout plans. Needless to say, users should only be able to access their own workout plans.
- <b>Sign-Up:</b> Allow users to create an account.
- <b>Login:</b> Allow users to log in to their account.
- <b>JWT:</b> Use JSON Web Tokens for authentication.

## Workout Management
Users will be able to create their workout plans. Workout plans should consist of multiple exercises, each with a set number of repetitions, sets, and weights. Users should be able to update and delete their workout plans. Additionally, users should be able to schedule workouts for specific dates and times.
- <b>Create Workout:</b> Allow users to create workouts composed of multiple exercises.
- <b>Update Workout:</b> Allow users to update workouts and add comments.
- <b>Delete Workout:</b> Allow users to delete workouts.
- <b>Schedule Workouts:</b> Allow users to schedule workouts for specific dates and times.
- <b>List Workouts:</b> List active or pending workouts sorted by date and time.
- <b>Generate Reports:</b> Generate reports on past workouts and progress.

## Constraints
You are free to choose the programming language and database of your choice. Actual decisions for the database schema, API endpoints, and other implementation details are up to you. However, you should consider the following constraints:
- <b>Database:</b> Use a relational database to store user data, workout plans, and exercise data.
- <b>API:</b> Develop a RESTful API to interact with the database.
- <b>Security:</b> Implement JWT authentication to secure the API endpoints.
- <b>Testing:</b> Write unit tests to ensure the correctness of your code.
- <b>Documentation:</b> Learn about OpenAPI Specs. Document your API endpoints and provide examples of how to use them.

Challeng Link: https://roadmap.sh/projects/fitness-workout-tracker
