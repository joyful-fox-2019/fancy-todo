# Fancy Todo

**Base URL: `http://localhost:8080`**

**List of Routes User:**

| **Route**         | **HTTP** | **Description**                                      |
| ----------------- | -------- | ---------------------------------------------------- |
| /register   | POST     | Sign up with new user info                           |
| /signin      | POST     | Sign in and get an access token based on credentials |
| /google-signin | POST     | Sign in using OAuth 2.0 Google (tested on web browser only)                      |
| /profile-picture | POST     | Upload profile picture using Multer (tested on web browser only)                      |

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

**Create Todo**
----
* **URL:** `/todos`
* **Method:** `POST`
* **URL Params:** `None`
* **Header Params:**
    ```
    {
        ft_token: YOUR_JWT_TOKEN // String, required, obtained after login
    }
    ```
* **Data Params:**
	```
    {
        "name":"Sebat", // String, required
        "description":"sebat sebat dulu biar seger" // String, optional
        "due_date":"December 1, 2019"// Date, required
    }
	```
* **Success Response:**
  * **Status:** `201`
    **Content:** 
    
    ```
    {
        "description": "sebat sebat dulu biar seger",
        "status": "pending",
        "_id": "5dbf317117c66e5925b4201d",
        "name": "Sebat",
        "due_date": "2019-11-30T17:00:00.000Z",
        "UserId": "5dbce449396cc6151c513344",
        "createdAt": "2019-11-03T19:58:41.289Z",
        "updatedAt": "2019-11-03T19:58:41.289Z",
        "__v": 0
    }
    ```
 * **Error Response:**
    * **Authentication failed - Status:** `400`
        **Content:**
        ```
        {
            "msg": "Authentication failed"
        }
        ```

**Get Todo**
----
* **URL:** `/todos`
* **Method:** `GET`
* **URL Params:** `None`
* **Header Params:**
    ```
    {
        ft_token: YOUR_JWT_TOKEN // String, required, obtained after login
    }
    ```
* **Data Params:** `NONE`
* **Success Response:**
  * **Status:** `201`
    **Content:** 
    
    ```
    [
        {
            "description": "no description",
            "status": "done",
            "_id": "5dbd144a064f6231e87e7b28",
            "name": "Sarapan",
            "due_date": "2019-12-24T17:00:00.000Z",
            "UserId": "5dbce449396cc6151c513344",
            "createdAt": "2019-11-02T05:29:46.954Z",
            "updatedAt": "2019-11-03T06:19:37.906Z",
            "__v": 0
        },
        {
            "description": "no description",
            "status": "done",
            "_id": "5dbe7ee01cb1552bc16f431c",
            "name": "Cuci muka",
            "due_date": "2019-11-30T17:00:00.000Z",
            "UserId": "5dbce449396cc6151c513344",
            "createdAt": "2019-11-03T07:16:48.245Z",
            "updatedAt": "2019-11-03T15:37:04.585Z",
            "__v": 0
        }
    ]
    ```
 * **Error Response:**
    * **Authentication failed - Status:** `400`
        **Content:**
        ```
        {
            "msg": "Authentication failed"
        }
        ```

**Mark Todo as Complete**
----
* **URL:** `/todos/:id`
* **Method:** `PATCH`
* **URL Params:** 
    ```
    id: String, required
    ````
* **Header Params:**
    ```
    {
        ft_token: YOUR_JWT_TOKEN // String, required, obtained after login
    }
    ```
* **Data Params:** `NONE`
* **Success Response:**
  * **Status:** `204`
    **Content:** 
    
    ```
    No content
    ```
 * **Error Response:**
    * **Authentication failed - Status:** `400`
        **Content:**
        ```
        {
            "msg": "Authentication failed"
        }
        ```
    * **Authorization failed - Status:** `401`
        **Content:**
        ```
        {
            "msg": "Authorization failed. You don't have access to this todo."
        }
        ```
     * **Todo not found / invalid todo id - Status:** `500`
        **Content:**
        ```
        {}
        ```

**Delete Todo**
----
* **URL:** `/todos/:id`
* **Method:** `DELETE`
* **URL Params:** 
    ```
    id: String, required
    ````
* **Header Params:**
    ```
    {
        ft_token: YOUR_JWT_TOKEN // String, required, obtained after login
    }
    ```
* **Data Params:** `NONE`
* **Success Response:**
  * **Status:** `204`
    **Content:** 
    
    ```
    No content
    ```
 * **Error Response:**
    * **Authentication failed - Status:** `400`
        **Content:**
        ```
        {
            "msg": "Authentication failed"
        }
        ```
    * **Authorization failed - Status:** `401`
        **Content:**
        ```
        {
            "msg": "Authorization failed. You don't have access to this todo."
        }
        ```
     * **Todo not found / invalid todo id - Status:** `500`
        **Content:**
        ```
        {}
        ```

#### Installation
Make sure you have Node.js and npm installed on your computer then run:
````
$ git clone https://github.com/palewing/fancy-todo.git && cd fancy-todo/client 
$ npm install
$ cd ../server && npm install
````

#### Usage
Make sure you have nodemon installed. Then run this on `server` directory
```
$ npm run dev
```
Next, make sure you have live-server installed. Then run this on `client` directory
````
$ live-server --host=localhost
````
