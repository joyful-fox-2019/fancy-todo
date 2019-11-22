# fancy-todo

## register

**POST /register**
* **URL**

  `/register`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' email 'value' [string] = your email`

   `'key' password 'value' [string] = your password`

* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
        "_id": "your id",
        "email": "your email",
        "password : "your hashed password"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'Email is already Token' }`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'email/password is required' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`

## login  

**POST /login**
* **URL**

  `/login`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' email 'value' [string] = your email`

   `'key' password 'value' [string] = your password`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "token": "your token",
        "email" : "your email information"
    }
    ```
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{ message: 'invalid email/password' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`

## googleSign  

**POST /googleSign**
* **URL**

  `/googleSign`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' id_token 'value' [string] = your google ID Token`

   `'key' audience 'value' [string] = your google client ID`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "token": "your token",
        "email" : "your email information"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`

## todos

**GET /todos**
* **URL**

  `/todos`

* **Method:**

  `GET` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    [
        {
            "description": "todo description",
            "status": "boolean",
            "_id": "your todo Id",
            "name": "todo name",
            "dueDate": "todo due-date"
        },
        ............................................and more
    ]
        	
    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`



**GET todos/:id**
* **URL**

  `todos/:id`

* **Method:**

  `GET` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = todo Id`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "description": "todo description",
        "status": "boolean",
        "_id": "your todo Id",
        "name": "todo name",
        "dueDate": "todo due-date"
    }

    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 403 <br />
    **Content:** `{ message: 'not authorized' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`



**POST /todos**
* **URL**

  `/todos`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' name 'value' [string] = your todo name`

   `'key' description 'value' [string] = your todo descripton`

   `'key' dueDate 'value' [date] = your todo due-date`

* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
        "description": "created todo description",
        "status": "boolean (false by default)",
        "_id": "created todo Id",
        "name": "created todo name",
        "dueDate": "created todo due-date"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : 'title is required' }`

  * **Code:** 400 <br />
    **Content:** `{ message : 'dueDate is required' }`

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`



**PUT /todos/:id**
* **URL**

  `/todos/:id`

* **Method:**

  `PUT` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = todo Id`

* **Data Body**
 
    **body:** 

   `'key' title 'value' [string] = your updated name`

   `'key' description 'value' [string] = your updated Description`

   `'key' dueDate 'value' [date] = your updated dueDate`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "description": "updated todo description",
        "status": "boolean (false by default)",
        "_id": "your todo Id",
        "name": "updated todo name",
        "dueDate": "updated todo due-date"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : 'title is required' }`

  * **Code:** 400 <br />
    **Content:** `{ message : 'dueDate is required' }`

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: 'not authorized' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**PATCH /todos/:id**
* **URL**

  `/todos/:id`

* **Method:**

  `PATCH` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = todo Id`

* **Data Body**
 
    **body:** 

   `'key' title 'status' [boolean] = true`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "description": "your todo description",
        "status": "boolean (true)",
        "_id": "your todo Id",
        "name": "your todo name",
        "dueDate": "your todo due-date"
    }
    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: 'not authorized' }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**DELETE /todos/:id**
* **URL**

  `/todos/:id`

* **Method:**

  `DELETE` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = product ID`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "description": "deleted todo description",
        "status": "boolean (true)",
        "_id": "deleted todo Id",
        "name": "deleted todo name",
        "dueDate": "deleted todo due-date"
    } 
    ```
 
* **Error Response:**


  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: 'not authorized' }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


## users

**GET /users**
* **URL**

  `/users`

* **Method:**

  `GET` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    [
        {
            "TodosId": [
                {
                    "description": "group todo's",
                    "status": boolean (default false),
                    "_id": "group todo's id",
                    "name": "group todo's name",
                    "dueDate": ""
                },
                ............................................and more
            ],
            "UsersId": [
                {
                    "todoList": [
                        "list of members todolist"
                    ],
                    "_id": "members id",
                    "email": "member email",
                    "password": "member hashed password"
                },
                ............................................and more
            ],
            "_id": "Project id",
            "name": "name of Project"
        }
         ............................................and more
    ]
         	
    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`

**POST /users**
* **URL**

  `/users`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' name 'value' [string] = your group name`

* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
        "TodosId": [],
        "UsersId": [
            "Your Id as an Admin"
        ],
        "_id": "Your Project Id",
        "name": "Your Project Name"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : 'project name is required' }`

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**PATCH users/member/:id**
* **URL**

  `users/member/:id`

* **Method:**

  `PATCH` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = project Id`

* **Data Body**
 
   `'key' email 'value' [string] = email of the member that you want to add`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg": "Success add <member email> to Group",
        "data": {
            "TodosId": [
                list of todos
            ],
            "UsersId": [
                list of users (including the new added member)
            ],
            "_id": "project id",
            "name": "your Project"
        }
    }

    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : 'member already in group' }`

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 403 <br />
    **Content:** `{ message: 'not authorized' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**PATCH users/projectTodo/:id**
* **URL**

  `users/projectTodo/:id`

* **Method:**

  `PATCH` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = project Id`

* **Data Body**
 
   `'key' name 'value' [string] = project todo name`

   `'key' description 'value' [string] = project todo description`

   `'key' dueDate 'value' [string] = project todo due - date`   

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg": "Success add Todo Project",
        "data": {
            "TodosId": [
                list of todos (including the new one)
            ],
            "UsersId": [
                list of users
            ],
            "_id": "project id",
            "name": "your Project"
        }
    }

    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : 'title is required' }`

  * **Code:** 400 <br />
    **Content:** `{ message : 'dueDate is required' }`

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 403 <br />
    **Content:** `{ message: 'not authorized' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**PATCH users/editProject/:id**
* **URL**

  `users/editProject/:id`

* **Method:**

  `PATCH` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = todo's Id`

* **Data Body**
 
   `'key' name 'value' [string] = updated project todo name`

   `'key' description 'value' [string] = updated project todo description`

   `'key' dueDate 'value' [string] = updated project todo due - date`   

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg": "Success edit Todo Project",
        "data": {
            "TodosId": [
                list of todos (including the updated one)
            ],
            "UsersId": [
                list of users
            ],
            "_id": "project id",
            "name": "your Project"
        }
    }

    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : 'project not found' }`

  * **Code:** 400 <br />
    **Content:** `{ message : 'title is required' }`

  * **Code:** 400 <br />
    **Content:** `{ message : 'dueDate is required' }`

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 403 <br />
    **Content:** `{ message: 'not authorized' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**DELETE users/projectTodo/:id**
* **URL**

  `users/projectTodo/:id`

* **Method:**

  `DELETE` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = todo's Id`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg": "Success delete Todo Project",
        "data": {
            "TodosId": [
                list of todos (including the deleted one)
            ],
            "UsersId": [
                list of users
            ],
            "_id": "project id",
            "name": "your Project"
        }
    }

    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : 'project not found' }`

  * **Code:** 400 <br />
    **Content:** `{ message : 'title is required' }`

  * **Code:** 400 <br />
    **Content:** `{ message : 'dueDate is required' }`

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 403 <br />
    **Content:** `{ message: 'not authorized' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**DELETE users/:id**
* **URL**

  `users/:id`

* **Method:**

  `DELETE` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = project Id`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg": "Success delete Project",
        "data": {
            "TodosId": [
                list of todos deleted
            ],
            "UsersId": [
                list of users before
            ],
            "_id": "project id",
            "name": "your Project"
        }
    }

    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : 'project not found' }`

  * **Code:** 403 <br />
    **Content:** `{ message: 'You're Not The Owner of Project' }`

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 403 <br />
    **Content:** `{ message: 'not authorized' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`

## holidays

**GET /holidays**
* **URL**

  `/holidays`

* **Method:**

  `GET` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "meta": {
            "code": 200
        },
        "response": {
            "holidays": [
                {
                    "name": "New Year's Day",
                    "description": "New Year’s Day is the first     day of the year, or January 1, in the     Gregorian calendar.",
                    "date": {
                        "iso": "2019-01-01",
                        "datetime": {
                            "year": 2019,
                            "month": 1,
                            "day": 1
                        }
                    },
                    "type": [
                        "National holiday"
                    ],
                    "locations": "All",
                    "states": "All"
                },
             ............................................and more
    }
         	
    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`




