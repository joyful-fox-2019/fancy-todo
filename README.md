# fancy-todo

**Register**

* **URL**
    <_/signup>

* **Method:**
    `POST` 

* **Data Params** <br />
    **Required:**
    
    `name= string` <br />
    `email= string` <br />
    `password= string` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript
            {
                "_id": "5dbf463e66d4901e33f7891",
                "email": "mawar@mail.com",
                "password": "$2a$10$8cEP6gHdxjU7aZimMA8xvhbjkXq40htC6ikfpUHOdPsPWVg8IFHpzG",
                "name": "mawar",
                "createdAt": "2019-11-02T21:40:26.087Z",
                "dueDate": "2019-11-02T21:40:26.087Z",
                "__v": 0
            }
        ```

* **Error Response:**
  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ message : "'Oops!! Sorry! Server is under attack!'" }`


**Login**

* **URL**
    <_/signin_>

* **Method:**
    `POST` 

* **Data Params** <br />
    **Required:**
    
    `email= string` <br />
    `password= string` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript
            {
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmY0NjNlNjZkNDkwMWUzM2ZlNmI4MSIsImVtYWlsIjoiYXNkYXNkYXNkQGFzZC5jb20iLCJpYXQiOjE1NzI4MTY1Mjl9.QPqj-wyuPI-pErO-PxDuJqe8a7gHysxRgQ8_yufcwH0"

            }
        ```

* **Error Response:**
  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ message : "'Oops!! Sorry! Server is under attack!'" }`


**Add Task**

* **URL**
    <_/todos>

* **Method:**
    `POST` 

* **Data Params** <br />
    **Required:**
    `title= string` <br />

    **Optional:**
    `description= string` <br />
    `dueDate= string` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript
            {
                "_id":"5dbf34e09da365145d36755c",
                "title":"todo",
                "description":"description todo",
                "UserId":"5dbf17b458a59d8400e66b2b",
                "createdAt":"2019-11-03T20:13:20.750Z",
                "dueDate":null,",
                "status":false,
                "__v":0
            }
        ```

* **Error Response:**
    * **Code:** 500 Internal Server Error <br />
    **Content:** `{ message : "'Oops!! Sorry! Server is under attack!'" }`
    * **Code:** 403 unauthorized <br />
    **Content:** `{"message": "Not Authorize"}`



**Show All Todos**

* **URL**
    <_/todos>

* **Method:**
    `GET` 

* **URL Params** <br />
    `token= string`

* **Data Params** <br />
    none

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript
            [
              {
                    "_id":"5dbf34e09da365145d36755c",
                    "title":"todo 1",
                    "description":"description 1",
                    "UserId":"5dbf17b458a59d8400e66b2b",
                    "createdAt":"2019-11-03T20:13:20.750Z",
                    "dueDate":null,",
                    "status":false,
                    "__v":0
                },
                {
                    "_id": "5dbf34e09da365112376755c",
                    "title": "todo 2",
                    "description": "description 2",
                    "status": true,
                    "UserId":"5dbf17b458a59d8400e66b2b",
                    "createdAt": "2019-10-28T05:29:10.826Z",
                    "dueDate": "2019-10-28T05:29:10.826Z"
                }
            ]
        ```

* **Error Response:**
    * **Code:** 500 Internal Server Error  <br />
    **Content:** `{ message : "'Oops!! Sorry! Server is under attack!'" }`
    * **Code:** 403 unauthorized <br />
    **Content:** `{"message": "Not Authorize"}`


**Delete a todo**

* **URL**
    <_/api/todos/{id}_>

* **Method:**
    `DELETE` 

* **URL Params** <br />
    `token= string`

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
  * **Code:** 403 unauthorized <br />
    **Content:** `{"message": "Not Authorize"}`



**Update a todo with new info**

* **URL**
    <_/api/todos/{id}_>

* **Method:**
    `PUT` 

* **URL Params** <br />
    `token= string`

* **Data Params** <br />
    **Required:**
    
    `title= string` <br />
    `description= string` <br />
    `dueDate= string` <br />

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
                "dueDate": "2019-10-28T05:27:22.871Z"
            }
        ```

* **Error Response:**
  * **Code:** 403 unauthorized <br />
    **Content:** `{"message": "Not Authorize"}`

**Update a todo status**

* **URL**
    <_/api/todos/{id}_>

* **Method:**
    `PATCH` 

* **URL Params** <br />
    `token= string`

* **Data Params** <br />
    None
    
* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```javascript 
            {
                "_id": "5dbf34e09da365145d36755c",
                "title": "todo 1",
                "description": "description 1",
                "status": true,
                "UserId":"5dbf17b458a59d8400e66b2b",
                "createdAt": "2019-10-28T05:27:22.871Z",
                "dueDate": "2019-10-28T05:27:22.871Z"
            }
        ```

* **Error Response:**
  * **Code:** 403 unauthorized <br />
    **Content:** `{"message": "Not Authorize"}`