# ***next!***


Hi! This is a fancy to do web app. Let's get organized!

# **Error**

- **code**  : 400
- **name** : Bad Request
	- **error response :**

```
{
  "message": "Email is already used"
}
```

- **code**  : 401
- **name** : unauthorized

	- **error response :**

```
{
  "message": "your session is expired"
}
```

- **code**  : 403
- **name** : forbidden

	- **error response :**

```
{
  "message": "Not authorized"
}
```

- **code**  : 404
- **name** : Not Found

	- **error response :**

```
{
  "message": "User not found" / "Todo not found"
}
```


- **code**  : 500
- **name** : Internal Server Error

	- **error response :**

```
{
  "message": "Internal Server Error"
}
```

# **User**

> REGISTER

- **URL**
`http://localhost:3000/user/register`
- **Method**
`POST`
- **Data Params**
body :

|    property            |type                          |description                         |
|----------------|-------------------------------|-----------------------------|
|`email`|string            |user's email            |
|`password`          |string           |user's password          |



- **Success Response :**
	**code**  : 201
	**content example :**

```
 {
    "_id": "5dbd527e90191c715d019075",
    "email": "nath@mail.com",
    "password": "$2a$10$H0L2B1BYVXzyqwrqURr4y.QoCViLpQqlmUkvxTH1NplyINw.8wcOq",
    "__v": 0
}
```


> LOGIN

- **URL**
`http://localhost:3000/user/login`
- **Method**
`POST`
- **Data Params**
body :

|    property            |type                          |description                         |
|----------------|-------------------------------|-----------------------------|
|`email`|string            |user's email            |
|`password`          |string           |user's password          |



- **Success Response :**
	**code**  : 200
	**content example :**

```
 {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmQ1MjdlOTAxOTFjNzE1ZDAxOTA3NSIsImVtYWlsIjoibmF0aEBtYWlsLmNvbSIsImlhdCI6MTU3MjY4ODU0NX0.7CbmkHpAyjKYKP_7wg5OO2U8L7ut8MvyUj6-NOTJH2Y"
}

```



# **Todo**



> Find All Todos per UserId

- **URL**
`http://localhost:3000/todo?userId`
- **Method**
`GET`
- **Data Params :** none

- **Success Response :**
	**code**  : 200
	**content example :**

```
 {
    "todos": [
        {
            "Status": false,
            "_id": "5dbd538c3345af722fc6f8bf",
            "title": "call a prince",
            "description": "ask the price to bring you some snacks!",
            "userId": "5dbd527e90191c715d019075",
            "dueDate": "2019-11-02T17:00:00.000Z",
            "__v": 0
        },
        {
            "Status": false,
            "_id": "5dbd54b33345af722fc6f8c1",
            "title": "fitting the dress",
            "description": "make sure the waist section is looking good",
            "userId": "5dbd527e90191c715d019075",
            "dueDate": "2019-10-02T17:00:00.000Z",
            "__v": 0
        },
        {
            "Status": false,
            "_id": "5dbd5d07d53cb77d1c446a19",
            "title": "buy sheet mask at watson",
            "description": "colagen mask 10pcs, brightening mask 11pcs",
            "userId": "5dbd527e90191c715d019075",
            "dueDate": "2019-11-14T17:00:00.000Z",
            "__v": 0
        }
    ]
}
```


> Find One Todo

- **URL**
`http://localhost:3000/todo/:id`
- **Method**
`GET`
- **Data Params :** none

- **Success Response :**
	**code**  : 200
	**content example :**

```
{
    "todo": {
        "Status": false,
        "_id": "5dbd55543345af722fc6f8c2",
        "title": "attend maxwell bday party",
        "description": "9 oct 2019, Saturday 8pm, Rosovelt Street",
        "userId": "5dbd3f33e57986668543b7d1",
        "dueDate": "2019-11-07T17:00:00.000Z",
        "__v": 0
    }
}

```

> CREATE

- **URL**
`http://localhost:3000/todo`
- **Method**
`POST`
- **Data Params**
body :

|    property            |type                          |description                         |
|----------------|-------------------------------|-----------------------------|
|`title`|string            |user's todo's title, REQUIRED            |
|`description`          |string           |user's todo's description, REQUIRED        |
|`dueDate`| date| user's todo's due date, REQUIRED |
|`UserId` | integer | user's id, REQUIRED




- **Success Response :**
	**code**  : 201
	**content example :**

```
 {
    "Status": false,
    "_id": "5dbd627c62811e05b0453fed",
    "title": "repair the plumbing",
    "description": "follow the red sign",
    "userId": "5dbd3f33e57986668543b7d1",
    "dueDate": "2020-02-29T17:00:00.000Z",
    "__v": 0
}

```

> Delete

- **URL**
`http://localhost:3000/todo/:id`
- **Method**
`DELETE`
- **Data Params :** none

- **Success Response :**
	**code**  : 200
	**content example :**

```
{
    "Status": false,
    "_id": "5dbd55543345af722fc6f8c2",
    "title": "attend maxwell bday party",
    "description": "9 oct 2019, Saturday 8pm, Rosovelt Street",
    "userId": "5dbd3f33e57986668543b7d1",
    "dueDate": "2019-11-07T17:00:00.000Z",
    "__v": 0
}

```

> UPDATE

- **URL**
`http://localhost:3000/todo/:id`
- **Method**
`PUT`
- **Data Params**
(optional) body : 

|    property            |type                          |description                         |
|----------------|-------------------------------|-----------------------------|
|`title`|string            |user's todo's title, REQUIRED            |
|`description`          |string           |user's todo's description, REQUIRED        |
|`dueDate`| date| user's todo's due date, REQUIRED |
|`Status` | boolean | todo's done/undone status, REQUIRED




- **Success Response :**
	**code**  : 200
	**content example :**

```
 {
{
    "todo": {
        "Status": false,
        "_id": "5dbd627c62811e05b0453fed",
        "title": "repair the plumbing",
        "description": "follow the red sign and remove the rust",
        "userId": "5dbd3f33e57986668543b7d1",
        "dueDate": "2019-12-08T17:00:00.000Z",
        "__v": 0
    }
}

```