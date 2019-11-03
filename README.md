# Fancy Todo by_DreamCar

<hr>


API Documentation build with Express, Mongoose, JQuery, Ajax..
Base Url 'http://todoserver.dreamcarofficial.com'

```javascript
1. List of User Routes:
```



| Route             | HTTP  | Headers | Body                                                      | Description                 |
| ----------------- | ----- | ------- | --------------------------------------------------------- | --------------------------- |
| /users/           | GET   | token   | None                                                      | List Of Users               |
| /users/getlogin   | GET   | token   | None                                                      | Get Data for Authenticate   |
| /users/signin     | POST  | none    | Email: String<br />password: String                       | SignIn with email&password  |
| /users/signinG    | POST  | none    | None                                                      | SignIn with OAuth Google    |
| /users/signup     | POST  | none    | Email: String<br />password: String<br />username: String | SignUp new Account          |
| /users/acc/:id    | PATCH | token   | none                                                      | Accept the Invitation       |
| /users/dec/:id    | PATCH | token   | none                                                      | Decline the Invitation      |
| /users/coming/:id | PATCH | token   | none                                                      | Get Invitation from Project |



```javascript
2. List of Todo Routes:
```





| Route                | HTTP   | Headers | Body                                   | Description                                  |
| -------------------- | ------ | ------- | -------------------------------------- | -------------------------------------------- |
| /todos               | GET    | token   | none                                   | Get Todos of Users Login                     |
| /todos/project       | GET    | token   | none                                   | Get Todo in Project                          |
| /todos               | POST   | token   | Title:String<br />description: String  | Post new TodoList                            |
| /todo/project/:id    | POST   | token   | title: String<br />description: String | Create Todo in Project with params ProjectId |
| /todos/:id           | PUT    | token   | title:String<br />description: String  | Update Todo with new Info                    |
| /todos/:id           | DELETE | token   | none                                   | Delete Todos                                 |
| /todos/project/:id   | DELETE | token   | none                                   | Delete Todo in Project                       |
| /todos/checklist/:id | PATCH  | token   | none                                   | Update status Todos                          |



```javascript
3. List of Project Routes:
```



| Route              | HTTP   | Headers | Body                             | Description                                   |
| ------------------ | ------ | ------- | -------------------------------- | --------------------------------------------- |
| /projects          | GET    | token   | none                             | Get All Project                               |
| /projects/         | POST   | token   | name:String<br />owner: ObjectId | Create New Project                            |
| /projects/find/:id | GET    | token   | none                             | Find One Project Populate All member and Todo |
| /projects/:id      | PATCH  | token   | name: String                     | Update Project Name                           |
| /projects/:id      | DELETE | token   | none                             | Delete a Project                              |



```java
4. List of Quote Routes :
```

| Route  | HTTP | Headers | Body | Description      |
| ------ | ---- | ------- | ---- | ---------------- |
| /quote | GET  | token   | none | Get random quote |



## <span style='color: red'>Error Response</span> : 

```java
status: 403,
msg: 'Authentication Error' => Login
msg: 'Email/password Wrong' => Invalid email/password
msg: '... is required' => validation error from your input
msg: 'Invalid ProjectId' => projectId is not found
msg: 'Duplicate Detected' => your input allready used
msg: 'your are not a Member for this Project' => need request invite from the project
msg: 'Cannot invite yourself' => cannot invite your self
msg: 'Invalid Token' => your token is not valid
status: 401,
msg: 'Authorization Error' => Only owner can access
msg: 'Invalid Token / Exp Token' => Problem with Token, login again
status: 404,
msg: 'Not Found!' => the data is not Found!
status: 400,
msg: 'Todo allready Done' => Todo status is allready checklist
status: 500,
msg: 'Internal Server Error' => Problem with server
```





# 1. List of User Routes:

Base Url : "http://todoserver.dreamcarofficial.com"

<span style='color:green'>GET</span> /users
	Get all User for Invite to Project

## Authentication

<span style='color: red'>Token</span> 

Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
[
  {
    "Invitation": Array,
    "_id": ObjectId,
    "username": String,
    "password": String,
    "email": String,
    "__v": 0
  },
  {...},
  {...}
]
```



<span style='color:green'>POST</span> /users/signup
	Create New User

## Body

```java
{
  "username": String,
  "password": String,
  "email": String
}
```



Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
{
  msg: String,
  data: {
    "Invitation": Array,
    "_id": ObjectId,
    "username": String,
    "password": String,
    "email": String,
    "__v": 0
  }
}
```



<span style='color:green'>POST</span> /users/signin
	SignIn with email & password

## Body

```java
{
  "email": String,
  "password": String
}
```



Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
{
  "token": String
}
```



<span style='color:green'>POST</span> /users/signinG
	SignIn with OAuth Google

Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
{
  "token": String
}
```



<span style='color:green'>PATCH</span> /users/acc/{:id}
	Accept the Invitation

## Authentication

<span style='color: red'>Token</span> 

## Params

```java
the Params is Project Id for update the user to Member project
```



Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
{
 	"msg": String
}
```



<span style='color:green'>PATCH</span> /users/dec/{:id}
	Decline the Invitation

## Authentication

<span style='color: red'>Token</span> 

## Params

```java
the Params is Project Id for remove ProjectId from Invitation
```



Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
{
 	"msg": String
}
```



<span style='color:green'>PATCH</span> /users/coming/{:id}
	Push to Invitation

## Authentication

<span style='color: red'>Token</span> 

## Params

```java
the Params is Project Id for push to Invitation
```

## Body

```java
{
	"username": String
}
```



Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
{
 	"msg": String
}
```





# 2. List of Todo Routes:

Base url 'http://todoserver.dreamcarofficial.com'

<span style='color:green'>GET</span> /todos
	Get Todo List

## Authentication

<span style='color: red'>Token</span> 

Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
[
  {
    "_id": ObjectId,
    "title": String,
    "description": String,
    "UserId": ObjectId,
    "__v": 0
  },
  {...},
  {...}
]
```



<span style='color:green'>GET</span> /todos/project
	Get Todo List where have ProjectId

## Authentication

<span style='color: red'>Token</span> 

Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
[
  {
    "_id": ObjectId,
    "title": String,
    "description": String,
    "UserId": {
      "_id": ObjectId,
      "username": String,
      "password": String,
      "email": String,
      "Invitation": Array
    },
    "__v": 0
  },
  {...},
  {...}
]
```

<span style='color:green'>POST</span> /todos/project/{:id}
	Create todo in Project

## Authentication

<span style='color: red'>Token</span> 

## Headers 

```javascript
Params is ProjectId
```

## Body

```javascript
{
  "title": String,
  "description": String
}
```



Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
{
	"msg": String
}
```



<span style='color:green'>POST</span> /todos
	Create New Todo

## Authentication

<span style='color: red'>Token</span> 

## Body

```java
{
  "title": String,
  "description": String
}
```





Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
{
 	"msg": String,
  "data": {
    "_id": ObjectId,
    "title": String,
    "description": String,
    "UserId": ObjectId,
    "__v": 0
  }
}
```



<span style='color:green'>PUT</span> /todos{:id}
	Update Todo

## Authentication & Authorization

<span style='color: red'>Token</span> 

## Body

```java
{
  "title": String,
  "description": String
}
```



Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
{
 	"msg": String,
  "data": {
    "_id": ObjectId,
    "title": String,
    "description": String,
    "UserId": ObjectId,
    "__v": 0
  }
}
```



<span style='color:green'>DELETE</span> /todos/{:id}
	Delete Todo

## Authentication & Authorization

<span style='color: red'>Token</span> 



Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
{
 	"msg": String
}
```





<span style='color:green'>DELETE</span> /todos/project/{:id}
	Delete Todo in Project

## Authentication & Authorization

<span style='color: red'>Token</span> 

## Body

```javascript
{
  "projectId": ObjectId
}
```



Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
{
 	"msg": String
}
```



<span style='color:green'>PATCH</span> /todos/checklist/{:id}
	Done checklist Todo

## Authentication & Authorization

<span style='color: red'>Token</span> 

Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
{
 	"msg": String
}
```







## 3. List of Project Routes:

Base Url 'http://todoserver.dreamcarofficial.com'

<span style='color:green'>GET</span> /projects
	Get Project List

## Authentication

<span style='color: red'>Token</span> 

Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
[
  {
    "_id": ObjectId,
    "name": String,
    "Members": Array of ObjectId,
		"Todo": Array of ObjectId,
    "owner": ObjectId,
    "createdAt": Date
    "__v": 0
  },
  {...},
  {...}
]
```



<span style='color:green'>POST</span> /projects
	Create New Project

## Authentication

<span style='color: red'>Token</span> 

Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
{
  "msg": String,
  "data": {
    "_id": ObjectId,
    "name": String,
    "Members": Array of ObjectId,
		"Todo": Array of ObjectId,
    "owner": ObjectId,
    "createdAt": Date
    "__v": 0
  },
}
```



<span style='color:green'>GET</span> /projects/find/{:id}
	Find Project by id

## Authentication

<span style='color: red'>Token</span> 

Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
{
    "_id": ObjectId,
    "name": String,
    "Members": Array of ObjectId,
		"Todo": Array of ObjectId,
    "owner": {
      "_id": ObjectId,
      "username": String,
      "password": String,
      "email": String
    },
    "createdAt": Date
    "__v": 0
}
```



<span style='color:green'>PATCH</span> /projects/{:id}
	Update name Project

## Authentication

<span style='color: red'>Token</span> 

## Body

```java
{
  "name": String
}
```



Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
{
  "msg": String
}
```



<span style='color:green'>DELETE</span> /projects/{:id}
	Delete Project

## Authentication

<span style='color: red'>Token</span> 

Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
{
  "msg": String
}
```



```javascript
4. List of Quote Routes:
```



<span style='color:green'>GET</span> /quote
	Get a random Quote

## Authentication

<span style='color: red'>Token</span> 

Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```javascript
{
  "_id": ObjectId,
  "quoteAuthor": String,
  "quoteText": String
}
```





## Usage

Make sure you have Node.js and follow the command

```javascript
$ npm install
$ npm run dev

```



## Website :

<a href="http://todo.dreamcarofficial.com">Todo by DreamCarOfficial</a>

