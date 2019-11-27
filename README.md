# fancy-todo 
### ESY

Routes
---
server: http://localhost:3000/<br>
client: http://localhost:8080/<br>
Access : http://localhost:3000/

Bellows are routes that used in the sever fancy-todo.js

- base routes TODOS url : http://localhost:3000/todos

    - POST : /
        - description : create new todo
        - body :
            ```
            {
                name : String
                description : String
                due : date
            }
            ```
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 201
                ``` 
                {
                    "_id": "5dbef87fe3da1d19f4a5334e",
                    "name": "maen yugi",
                    "description": "maen kartu teruss",
                    "due": "2019-03-11T00:00:00.000Z",
                    "user": "5dbe73ee9cf1542872c68cec",
                    "status": false,
                    "quote": {
                            "content": "Be as you wish to seem.",
                            "author": "Socrates"
                    },
                    "__v": 0
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
    - GET : /:id
        - description : Get one of todo
        - body : none
        - params : ToDo _id
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "_id": "5dbec97c7f8ea54b2c8d39a6",
                    "name": "maen dota",
                    "description": "maen dota teruss",
                    "due": "2019-04-20T00:00:00.000Z",
                    "user": "5dbe73ee9cf1542872c68cec",
                    "status": false,
                    "quote": "Smile, breathe and go slowly.",
                    "__v": 0
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
    - PUT : /:id
        - description : update data of a todo
        - body : data that may want to be updated
            ```
            {
                name : String,
                status : boolean,
                description : String,
                due : date
            }
            ```
        - params : Todo _id
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "message" : "succses update all data"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
    - PATCH : /:id
        - description : update status of a todo
        - body : update data todo (status)
            ```
            {
                status : boolean
            }
            ```
        - params : Todo _id
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "message" : "succses update status"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
    - GET : /
        - description : get all data todos of a user
        - body : none
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                [
                    {
                            "_id": "5dbec97c7f8ea54b2c8d39a6",
                            "name": "maen dota",
                            "description": "maen dota teruss",
                            "due": "2019-04-20T00:00:00.000Z",
                            "user": "5dbe73ee9cf1542872c68cec",
                            "status": false,
                            "quote": "Smile, breathe and go slowly.",
                            "__v": 0
                    },
                    {
                            "_id": "5dbeccbcb7c8094ee1388ebf",
                            "name": "maen kartu",
                            "description": "maen kartu teruss",
                            "due": "2019-03-11T00:00:00.000Z",
                            "user": "5dbe73ee9cf1542872c68cec",
                            "status": false,
                            "quote": "Never apologize for showing feelings. When you do so, you apologize for the truth.",
                            "__v": 0
                    }
                ]
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```

    - DELETE /:id
        - description : delete a todo
        - body : none
        - params : ToDo _id
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "message" : "Todo is deleted"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
        
    - Fect 3rd APIs Quote baseURL : 'https://api.quotable.io/random'

        - Hook : pre create for quote
            - todoSchema.pre('save', function (next) {
                 axiosInstance.get('')
                    .then(respone => {
                        // console.log(respone.data);
                        this.status = false;
                        this.quote = {
                            content: respone.data.content,
                            author: respone.data.author
                        }
                        next()
                    })
                    .catch(err => {
                        next(err);
                    })
                }) 


- base routes USERS url : http://localhost:3000/users

    - POST : /register
        - description : create a new user
        - body : 
            ```
                { 
                    name : String,
                    email : String,
                    password : String
                }
            ```
        - Headers : none
        - Response :
            - Success :
                Status Code : 201
                ``` 
                {   
                    "_id": "5dbf3cff9fde4d02bad97caf",
                    "name": "karina",
                    "email": "karina@gmail.com",
                    "password": "$2a$10$rrpFvMcOj.nYGPA3EnV.puWXwa5DatjVwajcuRbpu.HPKE0NoTW/K",
                    "__v": 0
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

    - POST : /login
        - description : login to the system
        - body : 
            ```
                { 
                    email : String,
                    password : String
                }
            ```
        - Headers : none
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {   
                    "token" : "hcsuacnsdhidzuSDHBGASVGAwdudasdsadas"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```
                Status Code : 404
                ```
                {"message" : "Username/Password is wrong!"}
                ```

    - POST : /googleLogin
        - description : login to the system using google
        - body : Google OAuth Token
        - Headers : none
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {   
                    "token" : "hcsuacnsdhidzuSDHBGASVGAwdudsadSDSD"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```


Usage
----

Make sure you have node js has been installed in your computer, then run the folder <b>server</b> the commands bellow in your terminal.

```
    $ npm init -y
    $ npm install
    $ npm run dev
```
Make sure you have node js has been installed in your computer, then run the folder <b>client</b> the commands bellow in your terminal.

```
    $ live-server --host=localhost
```
## By : Edwin Satya Yudistira