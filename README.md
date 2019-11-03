# fancy-todo

**Register User**

* **URL**
    <_/register_>

* **Method:**
    `POST` 

* **Data Params** <br />
    **Required:**
    
    `name=[string]` <br />
    `email=[string]` <br />
    `password=[string]` <br />
    `confirm-password=[string]` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript
            {
                "_id": "5dbf463e66d4901e33fe6b81",
                "email": "foo@bar.com",
                "password": "$2a$10$8cEP6gHdxjU7aZimMA8xouv3Xq40htC6ikfpUHOdPsPWVg8IFHpzG",
                "name": "foo",
                "createdAt": "2019-11-03T21:27:26.087Z",
                "updatedAt": "2019-11-03T21:27:26.087Z",
                "__v": 0
            }
        ```

* **Error Response:**
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Error" }`


**Login User**

* **URL**
    <_/login_>

* **Method:**
    `POST` 

* **Data Params** <br />
    **Required:**
    
    `email=[string]` <br />
    `password=[string]` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript
            {
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmY0NjNlNjZkNDkwMWUzM2ZlNmI4MSIsImVtYWlsIjoiYXNkYXNkYXNkQGFzZC5jb20iLCJpYXQiOjE1NzI4MTY1Mjl9.QPqj-wyuPI-pErO-PxDuJqe8a7gHysxRgQ8_yufcwH0"

            }
        ```

* **Error Response:**
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Error" }`


**Create Todo**

* **URL**
    <_/todos>

* **Method:**
    `POST` 

* **Data Params** <br />
    **Required:**
    `name=[string]` <br />

    **Optional:**
    `description=[string]` <br />
    `dueDate=[string]` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript
            {
                "_id":"5dbf34e09da365145d36755c",
                "name":"todo here",
                "description":"description here",
                "dueDate":null,
                "UserId":"5dbf17b458a59d8400e66b2b",
                "createdAt":"2019-11-03T20:13:20.750Z",
                "updatedAt":"2019-11-03T20:46:50.270Z",
                "status":false,
                "__v":0
            }
        ```

* **Error Response:**
    * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Error" }`
    * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Error" }`

**Get All Todos**

* **URL**
    <_/todos>

* **Method:**
    `GET` 

* **URL Params** <br />
    `token=[string]`

* **Data Params** <br />
    none

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript
           [
                {
                    "_id": "5dbf34e09da365145d36755c",
                    "title": "First title",
                    "description": "First description",
                    "status": false,
                    "UserId":"5dbf17b458a59d8400e66b2b",
                    "createdAt": "2019-10-28T05:27:22.871Z",
                    "updatedAt": "2019-10-28T05:27:22.871Z"
                },
                {
                    "_id": "5dbf34e09da365112376755c",
                    "title": "Second title",
                    "description": "Second description",
                    "status": true,
                    "UserId":"5dbf17b458a59d8400e66b2b",
                    "createdAt": "2019-10-28T05:29:10.826Z",
                    "updatedAt": "2019-10-28T05:29:10.826Z"
                }
            ]
        ```

* **Error Response:**
    * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Error" }`
    * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Error" }`


**Get a single todo info**

* **URL**
    <_/api/todos/{id}_>

* **Method:**
    `GET` 

* **URL Params** <br />
    `token=[string]`

* **Data Params** <br />
    None

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript 
            {
                "_id": "5dbf34e09da365145d36755c",
                "title": "First title",
                "description": "First description",
                "status": false,
                "UserId":"5dbf17b458a59d8400e66b2b",
                "createdAt": "2019-10-28T05:27:22.871Z",
                "updatedAt": "2019-10-28T05:27:22.871Z"
            }
        ```

* **Error Response:**
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"msg": "no access"}`


**Delete a todo**

* **URL**
    <_/api/todos/{id}_>

* **Method:**
    `DELETE` 

* **URL Params** <br />
    `token=[string]`

* **Data Params** <br />
    None

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript 
            {
                "message": "Todo successfully deleted."
            }  
        ```

* **Error Response:**
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"msg": "no access"}`



**Update a todo with new info**

* **URL**
    <_/api/todos/{id}_>

* **Method:**
    `PUT` 

* **URL Params** <br />
    `token=[string]`

* **Data Params** <br />
    **Required:**
    
    `title=[string]` <br />
    `description=[string]` <br />
    `dueDate=[string]` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript 
            {
                "_id": "5dbf34e09da365145d36755c",
                "title": "First title",
                "description": "First description",
                "status": false,
                "UserId":"5dbf17b458a59d8400e66b2b",
                "createdAt": "2019-10-28T05:27:22.871Z",
                "updatedAt": "2019-10-28T05:27:22.871Z"
            }
        ```

* **Error Response:**
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"msg": "no access"}`

**Update a todo status**

* **URL**
    <_/api/todos/{id}_>

* **Method:**
    `PATCH` 

* **URL Params** <br />
    `token=[string]`

* **Data Params** <br />
    None
    
* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript 
            {
                "_id": "5dbf34e09da365145d36755c",
                "title": "First title",
                "description": "First description",
                "status": true,
                "UserId":"5dbf17b458a59d8400e66b2b",
                "createdAt": "2019-10-28T05:27:22.871Z",
                "updatedAt": "2019-10-28T05:27:22.871Z"
            }
        ```

* **Error Response:**
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"msg": "no access"}`