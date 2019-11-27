  
  
**Check It**
----

access deployed app to: [checkit.satyowicaksana.online](http://checkit.satyowicaksana.online)

----

*  **Error Response:** 

**Code:** 400
**Description:** Server cannot process the action due to invalid request <br  />
**Content Example:**

```
{
	"messages":  [
		"Task name cannot be empty",
		"Date and time cannot be empty"
	]
}
```
**Code:** 401
**Description:** You are not authenticated or authorized to access the data <br  />
**Content Example:**

```
{
	"messages":  [
		"You have to login first"
	]
}
```
**Code:** 404
**Description:** The requested resource could not be found <br  />
**Content Example:**

```
{
	"messages":  [
		"Data not found"
	]
}
```
**Code:** 500
**Description:** There's something wrong in the server. Please try again later. <br  />
**Content Example:**

```
{
	"messages":  [
		"Something went wrong in the server"
	]
}
```
*  **Data Params**
Aside from register and login, you need authentication using token that you got from register/log in and send it as headers

**headers:**

| property | type | description |
|--|--|--|
|`'access_token'`| string | access token for authentication |

---
**POST /users/register**

*  **URL**

`/users/register`

*  **Method:**

`POST`

  *  **Data Params**

**body:**

| property | type | description |
|--|--|--|
|`'email'`| string | email of the user |
|`'password'`| string | password of the user |
 
*  **Success Response:**

**Code:** 201<br  />

**Content Example:**

```
{
    "_id": "5dbf1d7be1150a1556229b7f",
    "email": "check@it.com",
    "password": "$2a$10$cHufLiCsdhvzNrnlupIaWuSgcCkj3cn6DkXrrQ.b0wnr/LFS/wFL.",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmYxZDdiZTExNTBhMTU1NjIyOWI3ZiIsImlhdCI6MTU3MjgwNjAxMX0.gDoHwpMkID5ZXeaoxC9rWK7Wnt2P9tB9PPtxRACP-yE"
}
```
---
**POST /users/login**

*  **URL**

`/users/login`

*  **Method:**

`POST`

  *  **Data Params**

**body:**

| property | type | description |
|--|--|--|
|`'email'`| string | email of the user |
|`'password'`| string | password of the user |
 
*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
{
    "_id": "5dbf1d7be1150a1556229b7f",
    "email": "check@it.com",
    "password": "$2a$10$cHufLiCsdhvzNrnlupIaWuSgcCkj3cn6DkXrrQ.b0wnr/LFS/wFL.",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmYxZDdiZTExNTBhMTU1NjIyOWI3ZiIsImlhdCI6MTU3MjgwNjMzOX0.x3MvU9fPwRkmtDjG_kv61HHD1cSTUXMjhp2wQuzaW4U"
}
```
---
**POST /users/g-signin**

*  **URL**

`/users/g-signin`

*  **Method:**

`POST`

  *  **Data Params**

**body:**

| property | type | description |
|--|--|--|
|`'id_token'`| string | id token from google OAuth |
 
*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
{
    "_id": "5dbf1d7be1150a1556229b7f",
    "email": "check@gmail.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmYxZDdiZTExNTBhMTU1NjIyOWI3ZiIsImlhdCI6MTU3MjgwNjMzOX0.x3MvU9fPwRkmtDjG_kv61HHD1cSTUXMjhp2wQuzaW4U"
}
```
---
**GET /users**

*  **URL**

`/users`

*  **Method:**

`GET`

 
*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
[
    {
        "isGoogle": false,
        "_id": "5dbee718e22c2d03a3fefa1c",
        "email": "satyowicaksana@gmail.com",
        "password": "$2a$10$I2zTcGqdbn.pXd59kWw7juLlInjfWY7pWcTZhA2ybg49RHCOIWWWW"
    },
    {
        "isGoogle": true,
        "_id": "5dbee754e22c2d03a3fefa1e",
        "email": "satyodeveloper@gmail.com"
    },
    {
        "isGoogle": false,
        "_id": "5dbf1d7be1150a1556229b7f",
        "email": "check@it.com",
        "password": "$2a$10$cHufLiCsdhvzNrnlupIaWuSgcCkj3cn6DkXrrQ.b0wnr/LFS/wFL."
    }
]
```
---
**POST /tasks/:projectId**

*  **URL**

`/tasks/:projectId`

*  **Method:**

`POST`
  *  **Data Params**

**body:**

| property | type | description |
|--|--|--|
|`'projectId'`| string | id of project to add the task to |

**body:**

| property | type | description |
|--|--|--|
|`'name'`| string | task name |
|`'description'`| string | description of the task |
|`'dueDate'`| date | due date of the task |
 
*  **Success Response:**

**Code:** 201 <br  />

**Content Example:**

```
{
    "status": false,
    "_id": "5dbf2752e1150a1556229b81",
    "name": "Buy Eggs",
    "dueDate": "2019-10-29T06:06:23.946Z",
    "user": "5dbf1d7be1150a1556229b7f"
}
```
---
**GET /tasks**

*  **URL**

`/tasks`

*  **Method:**

`GET`

 
*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
[
    {
        "status": false,
        "_id": "5dbf2752e1150a1556229b81",
        "name": "Buy Eggs",
        "dueDate": "2019-10-29T06:06:23.946Z",
        "user": "5dbf1d7be1150a1556229b7f"
    }
]
```
---
**GET /tasks/:id**

*  **URL**

`/tasks/:id`

*  **Method:**

`GET`

   *  **Data Params**

**params:**

| property | type | description |
|--|--|--|
|`'id'`| string | id of the task |

*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
{
     "status": false,
     "_id": "5dbf2752e1150a1556229b81",
     "name": "Buy Eggs",
     "dueDate": "2019-10-29T06:06:23.946Z",
     "user": "5dbf1d7be1150a1556229b7f"
}
```
---
**PATCH /tasks/:id**

*  **URL**

`/tasks/:id`

*  **Method:**

`PATCH`

  *  **Data Params**

**params:**

| property | type | description |
|--|--|--|
|`'id'`| string | id of the task |

**body:**

| property | type | description |
|--|--|--|
|`'name'`| string | task name |
|`'description'`| string | description of the task |
|`'dueDate'`| date | due date of the task |
|`'status'`| date | status of the task |

*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
{
    "status": false,
    "_id": "5dbf2752e1150a1556229b81",
    "name": "Buy Eggs",
    "dueDate": "2019-10-29T06:06:23.946Z",
    "user": "5dbf1d7be1150a1556229b7f"
}
```
---
**DELETE /tasks/:id**

*  **URL**

`/tasks/:id`

*  **Method:**

`DELETE`

  *  **Data Params**

**params:**

| property | type | description |
|--|--|--|
|`'id'`| string | id of the task |

*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
{
    "status": false,
    "_id": "5dbf2752e1150a1556229b81",
    "name": "Buy Eggs and Milk",
    "dueDate": "2019-10-29T06:06:23.946Z",
    "user": "5dbf1d7be1150a1556229b7f"
}
```
---
**POST /projects**

*  **URL**

`/projects`

*  **Method:**

`POST`

  *  **Data Params**

**body:**

| property | type | description |
|--|--|--|
|`'name'`| string | project name |

*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
{
    "members": [
        "5dbf1d7be1150a1556229b7f"
    ],
    "tasks": [],
    "_id": "5dbf2bd5e1150a1556229b82",
    "name": "Almanac"
}
```
---
**GET /projects**

*  **URL**

`/projects`

*  **Method:**

`GET`

*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
[
    {
        "members": [
            "5dbf1d7be1150a1556229b7f"
        ],
        "tasks": [],
        "_id": "5dbf2bd5e1150a1556229b82",
        "name": "Almanac"
    }
]
```
---
**GET /projects/:id**

*  **URL**

`/projects/:id`

*  **Method:**

`GET`

**params:**

| property | type | description |
|--|--|--|
|`'id'`| string | id of the project |


*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
{
     "members": [
         "5dbf1d7be1150a1556229b7f"
     ],
     "tasks": [],
     "_id": "5dbf2bd5e1150a1556229b82",
     "name": "Almanac"
}
```
---
**PATCH /projects/:id**

*  **URL**

`/projects/:id`

*  **Method:**

`PATCH`

  *  **Data Params**

**params:**

| property | type | description |
|--|--|--|
|`'id'`| string | id of the project |

**body:**

| property | type | description |
|--|--|--|
|`'name'`| string | project name |
|`'member'`| string | user to add as a member of the project |
|`'task'`| string | task to add to the project |

*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
{
    "members": [
        "5dbf1d7be1150a1556229b7f"
    ],
    "tasks": [],
    "_id": "5dbf2bd5e1150a1556229b82",
    "name": "Almanac"
}
```
---
**DELETE /projects/:id**

*  **URL**

`/projects/:id`

*  **Method:**

`DELETE`

  *  **Data Params**

**params:**

| property | type | description |
|--|--|--|
|`'id'`| string | id of the task |

*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
{
    "members": [
        "5dbf1d7be1150a1556229b7f"
    ],
    "tasks": [],
    "_id": "5dbf2bd5e1150a1556229b82",
    "name": "Almanac"
}
```
