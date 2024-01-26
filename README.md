# Game High Scores API

## Overview

This API allows players to submit their high scores and view the leaderboard for a mobile game.

## Base URL

The base URL for all endpoints is: `http://loaclhost:5008`

## Authentication

The API uses JSON Web Tokens (JWT) for authentication. Include the JWT token in the "Authorization" header using the "Bearer" scheme.

## Endpoints

### 1. Create User

- **URL:** `/user/register`
- **Method:** `POST`
- **Request Payload:**
  \_ if you give the user_type :"admin" then it will create user as admin .. by default it's normal user

  ```json
  {
    "username": "",
    "email": "",
    "password": ""
  }
  ```

### 2. User Login

- **URL:** `/user/login`
- **Method:** `POST`
- **Request Payload:**

  ```json
  {
    "email": "",
    "password": ""
  }
  ```

### 3. Submit High Score

- **URL:** `/scores`
- **Method:** `POST`
- \*\*Authorization:Bearer {{token}}
- **Request Payload:**
  ```json
  {
    "score": 1000
  }
  ```

### 4. Leaderboard

- **URL:** `/leaderboard`
- **Method:** `GET`
- \*\*Authorization:Bearer {{token}}

make a Database with is ...

DB_CONNECTION="mysql"
DB_PORT="3306"
DB_USERNAME="root"
DB_PASSWORD="mysql-password"
DATABASE_NAME="backendtask"

::: RUN :
