# Fancy To Do
# Author : Luky Winata

| **Frequently Asked Questions**                                       |
| -------------------------------------------------------------------- |
| Client Site: http://localhost:8080/                                  |
| Server Site: http://localhost:3000/                                  |
| npm init -y (inside root server folder)                              |
| npm run dev (on terminal inside root server folder)                  |
| live-server --host=localhost (on terminal inside root client folder) |
| .env-template: PORT, DB_URI, JWT_SECRET, CLIENT_ID(google)           | 

**List of Routes User:**

| **Route**         | **HTTP** | **Description**                             |
| ----------------- | -------- | ------------------------------------------- |
| /user/register    | POST     | Sign up with new user info                  |
| /user/login       | POST     | Sign in and get an access token             |
| /user/googleLogin | POST     | Sign in with google and get an access token |

**List of Routes Task:**
| **Route** | **HTTP** | **Description**                 | **Notes**               |
| --------- | -------- | ------------------------------- | ----------------------- |
| /task     | POST     | Create a task                   | Authenticated user only |
| /task     | GET      | Get all tasks' info             | Authenticated user only |
| /task/:id | GET      | Get a single task's detail      | Authorized user only    |
| /task/:id | PUT      | Update a task with new details  | Authorized user only    |
| /task/:id | PATCH    | Undo a task from Done to Active | Authorized user only    |
| /task/:id | DELETE   | Delete a task                   | Authorized user only    |

**Errors:**
| Code | Name                  | Description                               |
| ---- | --------------------- | ----------------------------------------- |
| 400  | Authentication Failed | Email or password is incorrect            |
| 401  | Email is Not Unique   | Email is already in use                   |
| 401  | Unauthorized Access   | User is not authorized to do the action   |
| 404  | Not Found             | The requested resource could not be found |
| 500  | Internal Server Error | We had a problem with our server          |


**Register User**
----
* **URL:** `/user/register`

* **Method:** `POST`

* **Body Data:** 

  ```
  name: Luky Winata
  email: lukywinata@outlook.com
  password: 12345678
  ```

* **Success Response:**
  
  * **Status:** 201
    **Content:** 
    
    ```
    {
        "_id": "5dbd4a607ad5b61201781b95",
        "name": "Luky Winata",
        "email": "lukywinata@outlook.com",
        "password": "$2a$10$dSgyVFM47duFThRKlEBJG.paG2GMt.pMbcsBKgWcjlfDVSZQmLdO6",
        "__v": 0
    }
    ```
  
* **Error Response:**
  
  * **Status:** 401
    **Content:**
    
    ```
    {
        "message": "Email is already in use"
    }
    ```



**Login User**
----

* **URL:** `/user/login`

* **Method:** `POST`

* **Body Data:** 

  ```
  email: lukywinata@outlook.com
  password: 12345678
  ```

* **Success Response:**

  * **Status:** 200
    **Content:** 

    ```
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

* **Error Response:**

  * **Status:** 400
    **Content:**

    ```
    {
        "message": "Email or password is incorrect"
    }
    ```



**Add New Task**
----

* **URL:** `/task`

* **Method:** `POST`

* **Headers:** `access_token = [string]`

* **Body Data:** 

  ```
  title: Hacktiv8 Phase 2
  description: (allow empty)
  dueDate: 30 November 2019
  ```

* **Success Response:**

  * **Status:** 201
    **Content:** 

    ```
    {
        "_id": "5dbd56c73b90dd0eaaf71f10",
        "title": "Hacktiv8 Phase 2",
        "description": "",
        "status": "Active",
        "dueDate": "2019-11-29T17:00:00.000Z",
        "UserId": "5dbd3fb1dd9f80375017fff9",
        "createdAt": "2019-11-02T10:13:27.019Z",
        "updatedAt": "2019-11-02T10:13:27.019Z",
        "__v": 0
    }
    ```

* **Error Response:**

  * **Status:** 401
    **Content:**

    ```
    {
        "message": "User is not authorized to do the action"
    }
    ```



**List Tasks**
----

* **URL:** `/task/`

* **Method:** `GET`

* **Headers:** `access_token = [string]`

* **Success Response:**

  * **Status:** 201
    **Content:** 

    ```
    [
        {
            "_id": "5dbd504808bd83165a1263b0",
            "title": "Angular",
            "description": "",
            "status": "Done",
            "dueDate": null,
            "UserId": "5dbd3fb1dd9f80375017fff9",
            "createdAt": "2019-11-02T09:45:44.885Z",
            "updatedAt": "2019-11-02T10:09:46.633Z",
            "__v": 0
        },
        ......
    ]
    ```

* **Error Response:**

  * **Status:** 401
    **Content:**

    ```
    {
        "message": "User is not authorized to do the action"
    }
    ```



**Get Task's Detail**
----

* **URL:** `/task/:id`

* **Method:** `GET`

* **Headers:** `access_token = [string]`

* **Params:** `id = [string]`

* **Success Response:**

  * **Status:** 200
    **Content:** 

    ```
    [
        {
            "_id": "5dbd504808bd83165a1263b0",
            "title": "Angular",
            "description": "",
            "status": "Done",
            "dueDate": null,
            "UserId": "5dbd3fb1dd9f80375017fff9",
            "createdAt": "2019-11-02T09:45:44.885Z",
            "updatedAt": "2019-11-02T10:09:46.633Z",
            "__v": 0
        },
        ......
    ]
    ```

* **Error Response:**

  * **Status:** 401
    **Content:**

    ```
    {
        "message": "User is not authorized to do the action"
    }
    ```



**Update Task**
----

* **URL:** `/task/:id`

* **Method:** `PUT`

* **Headers:** `access_token = [string]`

* **Params:** `id = [string]`

* **Success Response:**

  * **Status:** 200
    **Content:** 

    ```
    [
        {
            "_id": "5dbd504808bd83165a1263b0",
            "title": "Angular",
            "description": "",
            "status": "Done",
            "dueDate": null,
            "UserId": "5dbd3fb1dd9f80375017fff9",
            "createdAt": "2019-11-02T09:45:44.885Z",
            "updatedAt": "2019-11-02T10:09:46.633Z",
            "__v": 0
        },
        ......
    ]
    ```

* **Error Response:**

  * **Status:** 401
    **Content:**

    ```
    {
        "message": "User is not authorized to do the action"
    }
    ```



**Undo Task**
----

* **URL:** `/task/:id`

* **Method:** `PATCH`

* **Headers:** `access_token = [string]`

* **Params:** `id = [string]`

* **Success Response:**

  * **Status:** 200
    **Content:** 

    ```
    {
        "_id": "5dbeb98459a4341f896bb00f",
        "title": "Belajar Javascript",
        "description": "Hacktiv8",
        "status": "Active",
        "dueDate": "2019-11-30T00:00:00.000Z",
        "UserId": "5dbeb5ed59a4341f896bb00d",
        "createdAt": "2019-11-03T11:27:00.790Z",
        "updatedAt": "2019-11-03T11:27:00.790Z",
        "__v": 0
    }
    ```

* **Error Response:**

  * **Status:** 401
    **Content:**

    ```
    {
        "message": "User is not authorized to do the action"
    }
    ```



**Delete Task**
----

* **URL:** `/task/:id`

* **Method:** `DELETE`

* **Headers:** `access_token = [string]`

* **Params:** `id = [string]`

* **Success Response:**

  * **Status:** 200
    **Content:** 

    ```
    {
        "n": 1,
        "ok": 1,
        "deletedCount": 1
    }
    ```

* **Error Response:**

  * **Status:** 401
    **Content:**

    ```
    {
        "message": "User is not authorized to do the action"
    }
    ```