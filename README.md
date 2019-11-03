# TODOISM

### Utilizing the single page application architecture and a minimalist design, Todoism helps you manage your tasks in a seamless manner.
#### Features:
- Create, delete, show todo items; 
- Mark an item as completed; and
- Set its importance to help you manage your daily priorities.

- - -

## A. User routes

- - -

| Routes         | HTTP | Headers | Body                                          | Description                                                        |
|----------------|------|---------|-----------------------------------------------|--------------------------------------------------------------------|
| /user/register | POST | none    | name: string, email: string, password: string | Set up a new account or sign in using your existing Google Account |
| /user/login    | POST | none    | email: string, password: string               | Sign in with an existing regular/Google account                    |

## 1. Register

### POST /user/register

> ### Body
 - name: string
 - email: string
 - password: string

```js

Successfully registered (201):

{
    "user": {
        "_id": "5dbeff1ef1cb6367533adad7",
        "name": "olson",
        "email": "olson@mail.com",
        "password": "$2a$10$lAl5DYcoKjgqzmb3T./GGuaS9XpImull14S3vWGZmOJ.oPTVXBj8y",
        "createdAt": "2019-11-03T16:23:58.276Z",
        "updatedAt": "2019-11-03T16:23:58.276Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoib2xzb25AbWFpbC5jb20iLCJpYXQiOjE1NzI3OTgyMzh9.Pfowi2EIi_9mJ-cOaGMrBmyJYSvVKgEXL-36OUefWZ0"
}

Bad request (400):

{
    "messages": [
        "risan is not a valid email address!"
    ]
}

```

## 2. Log in

### POST /user/login

> ### Body

- name: string
- password: string

```js

Successful log in (200):

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoib2xzb25AbWFpbC5jb20iLCJpYXQiOjE1NzI3OTg4NjN9.ACaLmTV9z_Z4MKsMTs8IFsuZzls7oQpcjAius8gXNqI"
}

Bad request (400):

{
    "messages": [
        "Wrong email/password!"
    ]
}

```

- - -
## B. Todo Routes
- - -

| Routes         | HTTP | Headers | Body                                          | Description                                                        |
|----------------|------|---------|-----------------------------------------------|--------------------------------------------------------------------|
| /todo | GET | access_token    | none | Get all the user's todo items |
| /todo | POST | access_token    | title: string, description: string, dueDate: date, completed: boolean, important: boolean | Add a new todo item |
| /todo/:id | GET | access_token    | none | Get a todo item by id |
| /todo/:id | DELETE | access_token    | none | Delete a todo item by id |
| /todo/:id | PUT | access_token    | [title: string, [description: string, [dueDate: date, [completed: boolean, [important: boolean] | Update a todo item's properties |
| /todo/:id | PATCH | access_token    | completed: boolean | Change a todo item's completed status |
| /todo/:id/important | PATCH | access_token    | important: boolean | Change a todo item's important status |      

- - -
## 1. Show all todo items

### GET /todo

> ### Headers

- access_token: string

> ### Body

- name: string
- password: string

```js

Success (200):

{
    "_id": "5dbf044d3a90a37243ac8389",
    "title": "Finish assignment",
    "description": "Fancy Todo",
    "dueDate": "2019-11-04T00:00:00.000Z",
    "completed": false,
    "userId": "5dbeff1ef1cb6367533adad7",
    "important": false,
    "createdAt": "2019-11-03T16:46:05.321Z",
    "updatedAt": "2019-11-03T16:46:05.321Z",
    "__v": 0
}

{...}

{...}

Unauthorized (401):

{
    "messages": [
        "Unauthorized access!"
    ]
}

```

## 2. Add a todo item

### POST /todo

> ### Headers

- access_token: string

> ### Body

- title: string
- description: string
- dueDate: string

```js
Successfully added a todo item (200):

{
    "_id": "5dbf055c3a90a37243ac838a",
    "title": "Finish assignment",
    "description": "Fancy Todo",
    "dueDate": "2019-11-04T00:00:00.000Z",
    "completed": false,
    "userId": "5dbeff1ef1cb6367533adad7",
    "important": false,
    "createdAt": "2019-11-03T16:50:36.602Z",
    "updatedAt": "2019-11-03T16:50:36.602Z",
    "__v": 0
}
```

## 3. Find a todo item by id

### GET /todo/:id

> ### Headers

- access_token: string

```js

Success (200):

{
    "_id": "5dbf055c3a90a37243ac838a",
    "title": "Finish assignment",
    "description": "Fancy Todo",
    "dueDate": "2019-11-04T00:00:00.000Z",
    "completed": false,
    "userId": "5dbeff1ef1cb6367533adad7",
    "important": false,
    "createdAt": "2019-11-03T16:50:36.602Z",
    "updatedAt": "2019-11-03T16:50:36.602Z",
    "__v": 0
}
```

## 4. Delete a todo item by id

### DELETE /todo/:id

> ### Headers

- access_token: string

```js

Success (200): //Note: the response is the item being found before deleted

{
    "_id": "5dbf055c3a90a37243ac838a",
    "title": "Finish assignment",
    "description": "Fancy Todo",
    "dueDate": "2019-11-04T00:00:00.000Z",
    "completed": false,
    "userId": "5dbeff1ef1cb6367533adad7",
    "important": false,
    "createdAt": "2019-11-03T16:50:36.602Z",
    "updatedAt": "2019-11-03T16:50:36.602Z",
    "__v": 0
}
```

## 5. Update a todo item by id

### PUT /todo/:id

> ### Headers

- access_token: string

> ### Body

- [title: string]
- [description: string]
- [dueDate: date]
- [completed: boolean]
- [important: boolean]

```js

Success (200): //Note: the response is the item being found before updated

{
    "_id": "5dbf055c3a90a37243ac838a",
    "title": "Finish assignment",
    "description": "Fancy Todo",
    "dueDate": "2019-11-04T00:00:00.000Z",
    "completed": false,
    "userId": "5dbeff1ef1cb6367533adad7",
    "important": false,
    "createdAt": "2019-11-03T16:50:36.602Z",
    "updatedAt": "2019-11-03T16:50:36.602Z",
    "__v": 0
}
```

## 6. Update a todo item's completed status by id

### PATCH /todo/:id

> ### Headers

- access_token: string

```js

Success (200): //Note: the response is the item being found before updated

{
    "_id": "5dbf055c3a90a37243ac838a",
    "title": "Finish assignment",
    "description": "Fancy Todo",
    "dueDate": "2019-11-04T00:00:00.000Z",
    "completed": false,
    "userId": "5dbeff1ef1cb6367533adad7",
    "important": false,
    "createdAt": "2019-11-03T16:50:36.602Z",
    "updatedAt": "2019-11-03T16:50:36.602Z",
    "__v": 0
}
```

## 7. Update a todo item's important status by id

### PATCH /todo/:id/important

> ### Headers

- access_token: string

```js

Success (200): //Note: the response is the item being found before updated

  {
    "_id": "5dbf05db3a90a37243ac838b",
    "title": "Finish assignment",
    "dueDate": "2019-11-04T00:00:00.000Z",
    "completed": false,
    "userId": "5dbeff1ef1cb6367533adad7",
    "important": false,
    "createdAt": "2019-11-03T16:52:43.842Z",
    "updatedAt": "2019-11-03T17:07:12.784Z",
    "__v": 0,
    "description": "Todoism"
  }

Bad Request (400):

{
    "messages": [
        "Cannot read property 'important' of null"
    ]
}

```
