# Fancy Todo

## Usage
---
Edit your scripts tag in *package.json* into => "dev":" **NODE_ENV=development nodemon app.js** ", And make sure you have node.js installed on your computer and then run these commands :

$ npm install express axios bcrypt cors jsonwebtoken google-auth-library mongoose

$ npm install -D dotenv

$ sudo service mongod start

$ npm run dev

---

***Note*** : To run both server and client site make sure you run : <h3>*live-server --host=localhost*</h3>

---
## Routes
## Base URL : http://localhost:PORT

### **User**
| URL | Method | Description | Required | Optional | Success status | Error status |
| --- | ------ | ----------- | -------- | -------- | ------- | ----- |
| /   | POST   | Register new user | *Body* : email (String) , password (String) | | 201 | 500,404 , 400 |
| /login | POST | Login user | *Body* : email (String) , password (String) | | 200 | 500,404 |
| /google | POST | Login with google | Connection to client | | 200 | 500 |

#### Success Example Result
---
#### / 
##### (POST)
1. Success Status : 201
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmVlZGExZDM2OTIxMjgwYzM4NzM4MCIsImlhdCI6MTU3Mjc5Mzc2MX0.H6uVkN043Af_T2Xc9E49bYRgP8WgBF0TONsR7XzeL1s",
    "name": "ninu"
}
```
---
#### /login 
##### (POST)
1. Success Status : 200
```
{
    "message": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmQ2ZmMwOTlkZDcwMWJiMDZiMjc3MSIsImlhdCI6MTU3Mjc5NDE3OX0.Hc26l_3L4_pMx4TadG9ykEDS8hiqjcVhN8DpJCOzUZw",
        "name": "nuel"
    }
}
```
---
#### Error Example Result
---
##### / 
###### (POST)
1. Error Status : 400
* Reason : Either you entered a short password or entered email address that already been used
```
{
    "password": "Minimum password length is 7",
    "email": "Email address is already registered"
}
```
1. Error Status : 404
* Reason : You don't put a value into a required field (password and/or email)
```
{
    "message": "Please input required field"
}
```
---
##### /login 
###### (POST)
1. Error Status : 404
* Reason : You don't put a value into a required field (password and/or email)
```
{
    "message": "Please input required field"
}
```
1. Error Status : 500
* Reason : You entered a wrong password or email
```
{
    "message": "Wrong email/password"
}
```
---

### **Todo**
| URL | Method | Description | Required | Optional | Success status | Error status |
| --- | ------ | ----------- | -------- | -------- | ------- | ----- |
| /todo | POST | Create a new Todo | *Headers*: jwt token,*Body*: name(String),date(YYYY-MM-DD) | description(String) | 201 | 400,500 |
| /todo | GET | Get all user todos | *Headers*: jwt token |  | 200 | 403,500 |
| /todo/:id | DELETE | Delete user todo | *Headers* : jwt token,*Parameter* : todo id |  | 200 | 500,401,400,404,403 | 
| /todo/:id | PUT | Update todo field | *Headers*: jwt token,*Parameter* : todo id,*Body* : name,due_date,status,description | Client Side(*Body*:name,due_date,status,description) | 200 | 403,401,500 |

***Notes*** due_date have to be more than today's date

#### Success Example Result
---
##### /todo
###### (POST)
1. Success Status : 201
```
{
    "todo": {
        "status": "Unfinished",
        "_id": "5dbef002d36921280c387382",
        "name": "atta",
        "description": "apa nih?",
        "due_date": "2019-11-30T17:00:00.000Z",
        "user": "5dbd6fc099dd701bb06b2771",
        "__v": 0
    }
}
```
---
##### /todo
###### (GET)
1. Success Status : 200
```
[
    {
        "status": "Finished",
        "_id": "5dbe867249858b1b531c9d12",
        "name": "aduh",
        "description": "coba ya",
        "due_date": "2019-12-31T00:00:00.000Z",
        "user": {
            "full_name": "nuel",
            "_id": "5dbd6fc099dd701bb06b2771",
            "email": "nuel@nuel.com",
            "password": "$2b$10$LxZ5UxvptV5k69eMB7iDW.E1REl2lfBe9fKN12xFUoDhm0vo0YpHG",
            "__v": 0
        },
        "__v": 0
    }
]
```
---
##### /todo/:id
###### (DELETE)
1. Success Status : 200
```
{
    "result": {
        "status": "Finished",
        "_id": "5dbe867249858b1b531c9d12",
        "name": "aduh",
        "description": "coba ya",
        "due_date": "2019-12-31T00:00:00.000Z",
        "user": "5dbd6fc099dd701bb06b2771",
        "__v": 0
    }
}
```
---
##### /todo/:id
###### (PUT)
1. Success Status : 200
```
{
    "result": {
        "status": "Unfinished",
        "_id": "5dbe891e49858b1b531c9d13",
        "name": "test",
        "description": "apa nih?",
        "due_date": "2019-10-30T17:00:00.000Z",
        "user": "5dbd6fc099dd701bb06b2771",
        "__v": 0
    }
}
```
---

#### Error Example Result
---
##### /todo 
###### (POST)
1. Error Status : 400
* Reason : You don't entered required field
```
{
    "message": "Please enter the due date of your todo"
}
```
---
##### /todo 
###### (GET)
1. Error Status : 403
* Reason : You try to access site that you don't have permission on(failed on authentication)
```
{
    "message": "You don't have permission for this server"
}
```
---
##### /todo/:id 
###### (DELETE)
1. Error Status : 401
* Reason : You try to delete/update site that you don't have permission on(failed on authorization)
```
{
    "message": "Sorry,you don't have permission to access this site"
}
```
--- 
2. Error Status : 500
* Reason : You put a wrong todo id
```
{
    "message": {
        "message": "Cast to ObjectId failed for value \"5dbd7608de260a258b3737e\" at path \"_id\" for model \"Todo\"",
        "name": "CastError",
        "stringValue": "\"5dbd7608de260a258b3737e\"",
        "kind": "ObjectId",
        "value": "5dbd7608de260a258b3737e",
        "path": "_id"
    }
}
```
---
##### /todo/:id 
###### (PUT)
1. Error Status : 401
* Reason : Failed on authorization
```
{
    "message": "Sorry,you don't have permission to access this site"
}
```
---