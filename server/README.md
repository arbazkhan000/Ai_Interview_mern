
## User Routes

### Create User
- **URL**: `/api/v1/users/create`
- **Method**: `POST`
- **Description**: Create a new user.
- **Request Body**:
  ```json
  {
    "fullname": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **Success**: 
    ```json
    {
      "message": "User created successfully",
      "success": true,
      "data": {
        "fullname": "John Doe",
        "email": "john.doe@example.com",
        "_id": "user_id"
      },
      "token": "jwt_token"
    }
    ```
  - **Error**: 
    ```json
    {
      "message": "All fields are required",
      "success": false
    }
    ```

### Login User
- **URL**: `/api/v1/users/login`
- **Method**: `POST`
- **Description**: Login a user.
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **Success**: 
    ```json
    {
      "message": "Login Successful, Welcome John Doe",
      "success": true,
      "token": "jwt_token"
    }
    ```
  - **Error**: 
    ```json
    {
      "message": "Invalid credentials",
      "success": false
    }
    ```

### Get User Profile
- **URL**: `/api/v1/users/profile`
- **Method**: `GET`
- **Description**: Get the profile of the logged-in user.
- **Headers**:
  - `Authorization`: `Bearer jwt_token`
- **Response**:
  - **Success**: 
    ```json
    {
      "message": "User Profile John Doe",
      "success": true,
      "data": {
        "fullname": "John Doe",
        "email": "john.doe@example.com",
        "_id": "user_id"
      }
    }
    ```
  - **Error**: 
    ```json
    {
      "message": "Unauthorized user",
      "success": false
    }
    ```