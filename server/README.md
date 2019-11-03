- # **Fancy - TODO**'s


------

## 1.  HOST

```json
http://localhost:3000/
```

## 2. ROUTES

- ### User

  | Method | Routes             | Description                 |
  | :----- | :----------------- | --------------------------- |
  | POST   | /users/register    | - Register new User         |
  | POST   | /users/login       | - Login user                |
  | POST   | /users/gsignin     | - Login with google account |
  | PATCH  | /users/update/name | - Change username           |
  
- ### Todo's

  | Method | Routes            | Authentication | Authorization | Descripton                |
  | ------ | ----------------- | -------------- | ------------- | ------------------------- |
  | POST   | /todos            | Yes            | -             | - Create new Todo         |
  | GET    | /todos            | Yes            | -             | - Get All user Todos      |
  | GET    | /todos/today      | Yes            | -             | - Get today's user todo's |
  | GET    | /todos/:title     | Yes            | -             | - Search Todo's by Title  |
  | GET    | /todos/:id        | Yes            | Yes           | - Get data Todo by id     |
  | DELETE | /todos/:id/delete | Yes            | Yes           | - Delete user Todo        |
  | PATCH  | /todos/:id/update | Yes            | Yes           | - Update user Todo        |

- ### Project

  - BaseURL : {{ HOST }} / project

  | Method | Routes                     | Authentication | AuthOwner | AuthMember | Description              |
  | ------ | -------------------------- | :------------- | :-------- | :--------- | ------------------------ |
  | GET    | /                          | Yes            | -         | -          | - Get  user project's    |
  | POST   | /create                    | Yes            | -         | -          | - Create new project     |
  | DELETE | /:projectId/delete         | Yes            | Yes       | -          | - Delete project         |
  | POST   | /:projectId/addMember      | Yes            | Yes       | -          | - Add member             |
  | DELETE | /:projectId/:userId/delete | Yes            | Yes       | -          | - Delete Member          |
  | DELETE | /:projectId/leaveProject   | Yes            | -         | Yes        | - Leave project          |
  | POST   | /:projectId/addTodo        | Yes            | -         | Yes        | - Add project todo       |
  | GET    | /:projectId/todos          | Yes            | -         | Yes        | - Get all project todo's |
  | PATCH  | /:projectId/:todoId/update | Yes            | -         | Yes        | - Update project todo    |
  | DELETE | /:projectId/:todoId        | Yes            | -         | Yes        | - Delete project todo    |

## 3. Code's Status

- ### Success Code's

  | Code Status | Description |
  | ----------- | ----------- |
  | 200         | - Success   |
  | 201         | - Created   |

- ### Error Code's

  | Code Status | Description                          |
  | ----------- | ------------------------------------ |
  | 400         | - Bad Request / ValidationError      |
  | 401         | - Unauthorization / Unauthentication |
  | 404         | - Not Found                          |
  | 500         | - Internal server error              |

  

## 4. DETAIL REQUEST

- ## Register User

  Create / regisrer new User and wil returns username and token.

  - **URL**

    /users/register

  - **Method:**

    `POST`

  - **URL Params**

    none

  - **Data Body**

    ```json
    username=[string] requited
    email=[string] required
    password=[string] required
    ```

  - **Success Response:**

    - **Code:** 201 <br />
      **Content:** 

      ```json
      {
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjZDFkNDczZTg0NTFlYM0NTNhY2YiLCJpYXQiOjE1NzI2NTU1NzJ9.GngLxAU58OB-xYojmtawCLfhf5F-LbS6hWfJOXYMoLM",
        "username": "Bagus"
      }
      ```

      **Error Response:**

    - **Code:** 400 BAD REQUEST <br />
      **Content:** `{ error : "username / email / password required" }`

  - **Sample Input:**

    ```JSON
    {
        "username": "sigit",
        "email": "sigitari111@gmail.com"
        "password": "123456"
    }
    ```

- ## Login User

  Login uers and will returns data Token and Username.

  - **URL**

    /users/login

  - **Method:**

    `POST`

  - **URL Params**

    none

  - **Data Body**

    ```
    email=[string] required
    password=[string] required
    ```

  - **Success Response:**

    - **Code:** 200 <br />
      **Content:** 

      ```json
      {
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjZDFkNDczZTg0NTFlYM0NTNhY2YiLCJpYXQiOjE1NzI2NTU1NzJ9.GngLxAU58OB-xYojmtawCLfhf5FLbS6hWfJOXYMoLM",
         "username": "Bagus"
      }
      ```

      **Error Response:**

    - **Code:** 400 BAD REQUEST <br />
      **Content:** `{ error : "email / password wrong" }`

  - **Sample Input:**

    ```JSON
    {
        "email": "sigitari111@gmail.com",
        "password": "123456"
    }
    ```

- ## Change Username

  Change Full name User.

  - **URL**

    /users/update/name

  - **Method:**

    `PATCH`

  - **Headers**

    ```json
    {
    	"toke": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjZDFkNDczZTg0NTFlYM"
    }
    ```

  - **Data Body**

    ```
    username=[string] required
    newUsername=[string] required
    ```

  - **Success Response:**

    - **Code:** 200 <br />
      **Content:** 

      ```json
      {
          _id: "5d9807ca0be6d70172fac1ac",
          username: "Sigit Ari Prasetyo",
          email: "sigitari111@gmail.com",
          password: "$2a$10$5owtqIYbwQkfo4oeOmifg.JuoR133yI9yuqh/kwbrjndwCBmZcZmy",
          createdAt: 2019-10-05T03:02:34.900+00:00,
          updatedAt: 2019-10-06T13:48:31.143+00:00,
          __v: 0
      }
      ```

      **Error Response:**

    - **Code:** 400 BAD REQUEST <br/>
      **Content:** `{ error : "new username is required" }`

  - **Sample Input:**

    ```JSON
    {
        "username": "sigit",
        "newUsername": "Sigit Ari Prasetyo"
    }
    ```

- ## Create Todo

  Create New User Todo

  - **URL**

    /todos

  - **Method:**

    `POST`

  - **URL Params**

    none

  - **Data Body**

    ```
    title= [string] required
    description= [string] required
    dueDate= [Date] required
    ```

  - **Data Header** <required>

    ```json
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTY5OTgwMDE0fQ.UOxbgr1EY5sXCM1csgZIjba2vbbML-Tc-LtqDTKs5NY"
    }
    ```

  - **Success Response:**

    - **Code:** 201 CREADTED <br />
      **Content:** 

      ```json
      {
          "id": 8,
          "title": "makan",
          "description": "makan sinag di kantin",
          "userId": 4,
          "dueDate":2019-10-07T00:00:00.000+00:00,
          "updatedAt": "2019-10-02T02:02:13.449Z",
          "createdAt": "2019-10-02T02:02:13.449Z"
      }
      ```

    **Error Response:**

    - **Code:** 400 BAD REQUEST <br />
      **Content:** `{ error : "You are not Authentication!" }`

      OR

    - **Code:** 401 NOT AUTHORIZED <br />
      **Content:** `{ error : "You are not Authorized!" }`

      OR

    - **Code:** 400 BAD REQUEST <br />
      **Content:** `{ error : "title / description required!!" }`

  - **Sample Input:**

    ```json
    {
        "title": "makan siang",
        "description": "makan siang di kantin",
        "dueDate":2019-10-07T00:00:00.000+00:00,
    }
    ```

  

  - ## Get User Todo's

    Get All user Todo's and will returns all TODO.

    - **URL**

      /todos

    - **Method:**

      `GET`

    - **URL Params**

      none

    - **Data Body**

      none

    - **Data Header**  <required>

      ```json
      {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTY5OTgwMDE0fQ.UOxbgr1EY5sXCM1csgZIjba2vbbML-Tc-LtqDTKs5NY"
      }
      ```

    - **Success Response:**

      - **Code:** 200 <br />
        **Content:** 

        ```json
        [
            {
                "id": 5,
                "title": "instal bcrypt",
                "description": "mengnstal MD",
                "status": true,
                "dueDate":2019-10-07T00:00:00.000+00:00,
                "userId": "hsgt5dnndh2ds2d5235ssd4",
                "createdAt": "2019-09-30T12:24:34.161Z",
                "updatedAt": "2019-09-30T12:24:34.161Z"
            }
        ]
        ```

        **Error Response:**

      - **Code:** 400 BAD REQUEST <br />
        **Content:** `{ error : "You are not Authentication!" }`

        OR

      - **Code:** 401 NOT AUTHORIZED <br />
        **Content:** `{ error : "You are not Authorized!" }`