# Fancy Todo

## Getting Started
---
Welcome to Fancy Todo API! You can use the API to create, update, delete and read information about todos list.<br/>
All API access is performed over HTTP and accessed from the http://localhost:3000.<br/>
You can do CRUD operation for todo list by accessing to http://localhost:3000/todos.<br/>
You can also register a new user and login with existing user by accessing to http://localhost:3000/users.

API Base URL :
```html
  http://localhost:3000
```

---
# Users

**1. Sign Up**
----
Register a new user :
| Syntax                        | Description   |
| ----------------------------- | ------------- |
| **URL**                       | `/signup`     |
| **Method**                    | `POST`        |
| **Authentication Required**   | NO            |
| **Authorization Required**    | NO            |

Request Body :
| Field Name                    | Value                  |
| ----------------------------- | ---------------------- |
| **email**                     | `<your email address>` |
| **password**                  | `<your password>`      |

Success Response :
  * **HTTP Code :** 201 (Created)
  * **JSON Response :**
  ```html
  {
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjZTFmOWFiYTE0OGMzNDZhYWQ3YmUiLCJlbWFpbCI6ImVkaXJhdGVzQGdtYWlsLmNvbSIsImlhdCI6MTU3MjY2MzM4NH0.ukg3N0887onoei5mHo71uororqR8ylq31ULCdI7G68c"
  }
  ```
Error Response : 
  * **HTTP Code :** 400 (Bad Request)
  * **JSON Response :**
  ```html
  {
    "messages": [
        "Email must be unique."
    ]
  }
  ```

**2. Sign In**
----
Sign in with existing user :
| Syntax                        | Description   |
| ----------------------------- | ------------- |
| **URL**                       | `/signin`     |
| **Method**                    | `POST`        |
| **Authentication Required**   | NO            |
| **Authorization Required**    | NO            |

Request Body :
| Field Name                    | Value                  |
| ----------------------------- | ---------------------- |
| **email**                     | `<your email address>` |
| **password**                  | `<your password>`      |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjZTFmOWFiYTE0OGMzNDZhYWQ3YmUiLCJlbWFpbCI6ImVkaXJhdGVzQGdtYWlsLmNvbSIsImlhdCI6MTU3MjY2NjU2MX0.DcYLScfR9RAz0-RgnfhWsFLTnfB7a1jyFvON9OagR6o"
  }
  ```
Error Response : 
  * **HTTP Code :** 400 (Bad Request)
  * **JSON Response :**
  ```html
  {
    "messages": "User not found."
  }
  ```

**3. Google Sign In**
----
Sign in with Google Account :
| Syntax                        | Description          |
| ----------------------------- | -------------------- |
| **URL**                       | `/signin-google`     |
| **Method**                    | `POST`               |
| **Authentication Required**   | NO                   |
| **Authorization Required**    | NO                   |

Request Body :
| Field Name                    | Value                   |
| ----------------------------- | ----------------------- |
| **CLIENT_ID**                 | `<Google Client ID>`    |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjZTFmOWFiYTE0OGMzNDZhYWQ3YmUiLCJlbWFpbCI6ImVkaXJhdGVzQGdtYWlsLmNvbSIsImlhdCI6MTU3MjY2NjU2MX0.DcYLScfR9RAz0-RgnfhWsFLTnfB7a1jyFvON9OagR6o"
  }
  ```
Error Response : 
  * **HTTP Code :** 500 (Internal Server Error)
  * **JSON Response :**
  ```html
  {
    "messages": "Internal Server Error."
  }
  ```


---
# To Dos

**1. Show All**
----
Show all todo list of logged in user :
| Syntax                        | Description   |
| ----------------------------- | ------------- |
| **URL**                       | `/todos`      |
| **Method**                    | `GET`         |
| **Authentication Required**   | YES           |
| **Authorization Required**    | YES           |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Query :
| Field Name                    | Value                      |
| ----------------------------- | -------------------------- |
| **status**                    | `<ongoing || completed>`   |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  [
    {
        "status": false,
        "_id": "5dbd051ec67ba1d7e09f34c9",
        "name": "Weekend Project",
        "description": "Creating Fancy Todo",
        "due_date": "2019-11-11T00:00:00.000Z",
        "UserId": "5dbce1f9aba148c346aad7be",
        "__v": 0
    }
  ]
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "messages": "You must log in first."
  }
  ```

**2. Show One**
----
Show a specific todo list of logged in user :
| Syntax                        | Description       |
| ----------------------------- | ----------------- |
| **URL**                       | `/todos/:id`      |
| **Method**                    | `GET`             |
| **Authentication Required**   | YES               |
| **Authorization Required**    | YES               |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Params :
| Field Name                    | Value                 |
| ----------------------------- | --------------------- |
| **id**                        | `<Todo ID>`           |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  [
    {
        "status": false,
        "_id": "5dbd051ec67ba1d7e09f34c9",
        "name": "Weekend Project",
        "description": "Creating Fancy Todo",
        "due_date": "2019-11-11T00:00:00.000Z",
        "UserId": "5dbce1f9aba148c346aad7be",
        "__v": 0
    }
  ]
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "messages": "You must log in first."
  }
  ```

**3. Create**
----
Create a new todo activity :
| Syntax                        | Description   |
| ----------------------------- | ------------- |
| **URL**                       | `/todos`      |
| **Method**                    | `POST`        |
| **Authentication Required**   | YES           |
| **Authorization Required**    | YES           |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Body :
| Field Name                    | Value                  |
| ----------------------------- | ---------------------- |
| **name**                      | `<Todo Name>`          |
| **description**               | `<Todo Description>`   |
| **due_date**                  | `<Todo Due Date>`      |

Success Response :
  * **HTTP Code :** 201 (Created)
  * **JSON Response :**
  ```html
  [
    {
        "status": false,
        "_id": "5dbd051ec67ba1d7e09f34c9",
        "name": "Weekend Project",
        "description": "Creating Fancy Todo",
        "due_date": "2019-11-11T00:00:00.000Z",
        "UserId": "5dbce1f9aba148c346aad7be",
        "__v": 0
    }
  ]
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "messages": "You must log in first."
  }
  ```

**4. Update**
----
Update a specific todo activity :
| Syntax                        | Description       |
| ----------------------------- | ----------------- |
| **URL**                       | `/todos/:id`      |
| **Method**                    | `PUT`             |
| **Authentication Required**   | YES               |
| **Authorization Required**    | YES               |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Body :
| Field Name                    | Value                  |
| ----------------------------- | ---------------------- |
| **name**                      | `<Todo Name>`          |
| **description**               | `<Todo Description>`   |
| **due_date**                  | `<Todo Due Date>`      |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "n": 1,
    "nModified": 1,
    "ok": 1
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "messages": "You are not authorized."
  }
  ```

**5. Patch Status To Completed**
----
Update a specific todo activity status into completed status :
| Syntax                        | Description           |
| ----------------------------- | --------------------- |
| **URL**                       | `/todos/done/:id`     |
| **Method**                    | `PATCH`               |
| **Authentication Required**   | YES                   |
| **Authorization Required**    | YES                   |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "n": 1,
    "nModified": 1,
    "ok": 1
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "messages": "You are not authorized."
  }
  ```

**6. Patch Status To Ongoing**
----
Update a specific todo activity status into ongoing status :
| Syntax                        | Description           |
| ----------------------------- | --------------------- |
| **URL**                       | `/todos/undo/:id`     |
| **Method**                    | `PATCH`               |
| **Authentication Required**   | YES                   |
| **Authorization Required**    | YES                   |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "n": 1,
    "nModified": 1,
    "ok": 1
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "messages": "You are not authorized."
  }
  ```

**7. Delete**
----
Delete a specific todo activity from list :
| Syntax                        | Description       |
| ----------------------------- | ----------------- |
| **URL**                       | `/todos/:id`      |
| **Method**                    | `DELETE`          |
| **Authentication Required**   | YES               |
| **Authorization Required**    | YES               |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "n": 1,
    "ok": 1,
    "deletedCount": 1
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "messages": "You are not authorized."
  }
  ```
