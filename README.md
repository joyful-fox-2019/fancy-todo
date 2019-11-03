# Fancy Todo

**Base URL: `http://localhost:8080`**

**List of Routes User:**

| **Route**         | **HTTP** | **Description**                                      |
| ----------------- | -------- | ---------------------------------------------------- |
| /register   | POST     | Sign up with new user info                           |
| /signin      | POST     | Sign in and get an access token based on credentials |
| /google-signin | POST     | Sign in using OAuth 2.0 Google                       |
| /profile-picture | POST     | Upload profile picture using Multer                      |

**List of Routes  Todo:**

| **Route**    | **HTTP** | **Description**                       |
| ------------ | -------- | ------------------------------------- |
| /todos | POST      | Create new todo (login required)           |
| /todos  | GET      | Get todos of current user (login required)           |
| /todos/:id  | PATCH      |  Mark todo as complete (login required)|
| /todos/:id  | DELETE      | Delete todo (login required)|

**Errors:**

| Code | Name                  | Description                               |
| ---- | --------------------- | ----------------------------------------- |
| 400  | Authentication Failed | Email or Password is incorrect            |
| 401  | Unauthorized Access   | We could not process that action          |
| 404  | Not Found             | The requested resource could not be found |
| 500  | Internal Server Error | We had a problem with our server          |


**Sign Up**
----
* **URL:** `/register`
* **Method:** `POST`
* **URL Params:** `None`
* **Data Params:**
    ```
	{
	"email":"hacktiv8@mail.com", // String, required, need to be valid email
	"username":"hacktiv8", // String, required, min 6 chars, max 20 chars
	"password":"123456", // String, required, min 6 chars
	}
    ```

* **Success Response:**
  * **Status:** `201`
    **Content:** 
    
    ```
    {
        "msg": "hacktiv8"
    }
    ```
* **Error Response:**
  * **Duplicate email - Status:** `500`
    **Content:**
    
    ```
    {
        "driver": true,
        "name": "MongoError",
        "index": 0,
        "code": 11000,
        "keyPattern": {
            "email": 1
        },
        "keyValue": {
            "email": "hacktiv8@mail.com"
        },
        "errmsg": "E11000 duplicate key error collection: fancytodo.users index: email_1 dup key: { email: \"hacktiv8@mail.com\" }"
    }
    ```

  * **Validation fail on email, username and password - Status:** `500`
    **Content:**
    
    ```
    {
    "_message": "User validation failed",
    "message": "User validation failed: email: Please enter a valid email address, username: Username minimum length is 6 characters, password: Password minimum length is 6 characters",
    "name": "ValidationError"
	}
    ```

**Sign in**
----
* **URL:** `/signin`
* **Method:** `POST`
* **URL Params:** `None`
* **Data Params:**
	```
    {
	"email":"hacktiv8@mail.com", //String
	"password":"123456" //String
	}
	```
* **Success Response:**
  * **Status:** `200`
    **Content:** 
    
    ```
    {
        "token":"eyJhbGciOiJIUzI1NiJ9. NWRiZjA1ZjNkMWI5NTAzMGQ3YmE1ODhi.kNk6Y7nMGdC2AdIxMd2HSxz9kPqSYkymSXSfyxy9PFY",
        "username": "hacktiv8",
        "picture": "undefined"
    }
    ```
 * **Error Response:**
    * **Wrong email and or password - Status:** `400`
        **Content:**
        ```
        {
            "msg": "Incorrect email and / or password"
        }
        ```

**Google Sign in**
----
* **URL:** `/google-signin`
* **Method:** `POST`
* **URL Params:** `None`
* **Data Params:**
	```
    {
	"email":"hacktiv8@mail.com", //String
	"password":"123456" //String
	}
	```
* **Success Response:**
  * **Status:** `200`
    **Content:** 
    
    ```
    {
        "token":"eyJhbGciOiJIUzI1NiJ9. NWRiZjA1ZjNkMWI5NTAzMGQ3YmE1ODhi.kNk6Y7nMGdC2AdIxMd2HSxz9kPqSYkymSXSfyxy9PFY",
        "username": "hacktiv8",
        "picture": "undefined"
    }
    ```
 * **Error Response:**
    * **Wrong email and or password - Status:** `400`
        **Content:**
        ```
        {
            "msg": "Incorrect email and / or password"
        }
        ```

#### Installation
Make sure you have Node.js and npm installed on your computer, clone the repo then run this:
````
$ cd fancy-todo/client && npm install
$ cd ../server && npm install
````

#### Usage
````
$
$ cd ../server && npm install
````

#### Environment Variables
````
JWT_SECRET = to-do-api
````