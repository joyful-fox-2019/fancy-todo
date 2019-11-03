# rest-api


## API-DOCUMENTATION (use apiary)
https://imdone.docs.apiary.io


---------------------------------------------------------

# I'm Done Api Documentation

FORMAT: 1A
HOST: http://localhost:3000/

# i'm Done

A fancy todo app. Help you to manage your todos in a fun way, there's a feature for making a project todo also

## User Register [/users/register]

### register [POST]
+ Request (application/json)

        {
            "name": "gajah lucu",
            "email": "gajah@mail.com",
            "password": "Gajah123"
        }
+ Response 200 (application/json)

        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FqYWggbHVjdSIsImVtYWlsIjoiZ2FqYWhAbWFpbC5jb20iLCJfaWQiOiI1ZGJmNGVhZTFlOGNjZTJiNTkxMmQwNzEiLCJpYXQiOjE1NzI4MTg2MDd9.zE-Eif8lae9_k109u3HLPydLg-ODbl9Apg2rczFz-8E",
            "name": "gajah lucu",
            "_id": "5dbf4eae1e8cce2b5912d071"
        }
        

+ Request (application/json)

        {
            "name": "gajah lucu",
            "email": "gajah@mail.com",
            "password": "Gajah123"
        }
+ Response 400

        {
            "message": "email is already been used"
        }

+ Request (application/json)

        {
            "name": "",
            "email": "",
            "password": ""
        }
+ Response 400

        {
            "message": [
                "name is required",
                "email is required",
                "password is required"
            ]
        }
        
+ Request (application/json)

        {
            "name": "gajah lucu",
            "email": "gajah@x",
            "password": "Gajah123"
        }
+ Response 400

        {
            "message": [
                "invalid email format"
            ]
        }

+ Request (application/json)

        {
            "name": "gajah lucu",
            "email": "gajah@mail.com",
            "password": "gajah"
        }
+ Response 400

        {
            "message": [
                 "password shold contain at least one digit, one lower case , one upper case , minumum 6 char"
            ]
        }

## User Login [/users/login]

### login [POST]
+ Request (application/json)

        {
            "email": "gajah@mail.com",
            "password": "Gajah123"
        }
+ Response 200 (application/json)

        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FqYWggbHVjdSIsImVtYWlsIjoiZ2FqYWhAbWFpbC5jb20iLCJfaWQiOiI1ZGJmNGVhZTFlOGNjZTJiNTkxMmQwNzEiLCJpYXQiOjE1NzI4MTg2MDd9.zE-Eif8lae9_k109u3HLPydLg-ODbl9Apg2rczFz-8E",
            "name": "gajah lucu",
            "_id": "5dbf4eae1e8cce2b5912d071"
        }
        

+ Request (application/json)

        {
            "name": "",
            "email": "",
            "password": ""
        }
+ Response 400

        {
            "message": [
                "invalid email/password"
            ]
        }
    
## Todos [/todos/]

### Get all todos [GET]
+ Request (application/json)

        {
            "email": "gajah@mail.com",
            "password": "Gajah123"
        }

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
          "data": [
            {
              "status": false,
              "_id": "5dbd6b62d862143c8f4063b1",
              "title": "hang out",
              "description": "meet my hacktiv friends",
              "dueDate": "2019-10-30T00:00:00.000Z",
              "userId": "5dbd670722ec063c4dbb9d91",
              "createdAt": "2019-11-02T11:41:22.437Z",
              "updatedAt": "2019-11-02T11:41:22.437Z"
            },
            {
              "status": false,
              "_id": "5dbd6ae3d862143c8f4063ae",
              "title": "cooking time",
              "description": "practice my cooking skill, cook some noodle",
              "dueDate": "2019-10-31T00:00:00.000Z",
              "userId": "5dbd670722ec063c4dbb9d91",
              "createdAt": "2019-11-02T11:39:15.572Z",
              "updatedAt": "2019-11-02T11:39:15.572Z"
            },
            {
              "status": true,
              "_id": "5dbd6a18d862143c8f4063ab",
              "title": "shoping",
              "description": "buy a new clothes",
              "dueDate": "2019-11-03T00:00:00.000Z",
              "userId": "5dbd670722ec063c4dbb9d91",
              "createdAt": "2019-11-02T11:35:52.743Z",
              "updatedAt": "2019-11-02T11:42:26.110Z"
            },
            {
              "status": false,
              "_id": "5dbd6b7dd862143c8f4063b2",
              "title": "date",
              "description": "date with my self 😭",
              "dueDate": "2019-11-04T00:00:00.000Z",
              "userId": "5dbd670722ec063c4dbb9d91",
              "createdAt": "2019-11-02T11:41:49.274Z",
              "updatedAt": "2019-11-02T11:41:49.274Z"
            }
          ]
        }
        
### Create todo [POST]
+ Request (application/json)

        {
            "title": "play",
            "description": "Don't forget to refreshing",
            "dueDate": "2019-11-05"
        }

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FqYWggbHVjdSIsImVtYWlsIjoiZ2FqYWhAbWFpbC5jb20iLCJfaWQiOiI1ZGJmNGVhZTFlOGNjZTJiNTkxMmQwNzEiLCJpYXQiOjE1NzI4MTk0Nzh9.W9PVZKczyCNmDVWMeUbmwlrtM45BF6teWZNM8kOCSmE"

+ Response 200 (application/json)

        {
          "message": "Todo created",
          "data": {
            "status": false,
            "_id": "5dbf52361e8cce2b5912d077",
            "title": "play",
            "description": "dont forget to refreshing",
            "dueDate": "2019-11-05T00:00:00.000Z",
            "userId": "5dbf4eae1e8cce2b5912d071",
            "createdAt": "2019-11-03T22:18:30.937Z",
            "updatedAt": "2019-11-03T22:18:30.937Z"
          }
        }
        
+ Request (application/json)

        {
            "title": "play",
            "description": "Don't forget to refreshing",
            "dueDate": "2019-11-05"
        }
    
+ Response 400 (application/json)

        {
          "message": [
            "out dated"
          ]
        }
        
## Todos/:id [/todos/{id}]

### Find One todo [GET]

+ Parameters
    + id (number) - ID of the Todo in the form of an integer


+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FqYWggbHVjdSIsImVtYWlsIjoiZ2FqYWhAbWFpbC5jb20iLCJfaWQiOiI1ZGJmNGVhZTFlOGNjZTJiNTkxMmQwNzEiLCJpYXQiOjE1NzI4MTk0Nzh9.W9PVZKczyCNmDVWMeUbmwlrtM45BF6teWZNM8kOCSmE"

+ Response 200 (application/json)

        {
          "data": {
            "status": false,
            "_id": "5dbf52361e8cce2b5912d077",
            "title": "Refreshing",
            "description": "Don't forget to refreshing",
            "dueDate": "2019-11-05T00:00:00.000Z",
            "userId": "5dbf4eae1e8cce2b5912d071",
            "createdAt": "2019-11-03T22:18:30.937Z",
            "updatedAt": "2019-11-03T22:32:25.844Z"
          }
        }
    
### Update todo [PUT]
+ Parameters
    + id (number) - ID of the Todo in the form of an integer

+ Request (application/json)

        {
            "title": "Refreshing",
            "description": "Don't forget to refreshing",
            "dueDate": "2019-11-05"
        }

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FqYWggbHVjdSIsImVtYWlsIjoiZ2FqYWhAbWFpbC5jb20iLCJfaWQiOiI1ZGJmNGVhZTFlOGNjZTJiNTkxMmQwNzEiLCJpYXQiOjE1NzI4MTk0Nzh9.W9PVZKczyCNmDVWMeUbmwlrtM45BF6teWZNM8kOCSmE"

+ Response 200 (application/json)

        {
          "message": "update success"
        }

### Update todo status [PATCH]

+ Parameters
    + id (number) - ID of the Todo in the form of an integer

+ Request (application/json)

        {
            "status": true
        }

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FqYWggbHVjdSIsImVtYWlsIjoiZ2FqYWhAbWFpbC5jb20iLCJfaWQiOiI1ZGJmNGVhZTFlOGNjZTJiNTkxMmQwNzEiLCJpYXQiOjE1NzI4MTk0Nzh9.W9PVZKczyCNmDVWMeUbmwlrtM45BF6teWZNM8kOCSmE"

+ Response 200 (application/json)

        {
          "message": "status updated"
        }

### Delete todo status [DELETE]

+ Parameters
    + id (number) - ID of the Todo in the form of an integer


+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FqYWggbHVjdSIsImVtYWlsIjoiZ2FqYWhAbWFpbC5jb20iLCJfaWQiOiI1ZGJmNGVhZTFlOGNjZTJiNTkxMmQwNzEiLCJpYXQiOjE1NzI4MTk0Nzh9.W9PVZKczyCNmDVWMeUbmwlrtM45BF6teWZNM8kOCSmE"

+ Response 200 (application/json)

        {
          "message": "delete success"
        }

## Project [/projects/]

### Get all projects [GET]

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        [
          {
            "members": [
              "5dbd7cad39249f48ee04cc98",
              "5dbd857ebf36944964306948"
            ],
            "todoId": [
              "5dbdbc6f93a626643752b2b2",
              "5dbdbe7515f60165af8ea55c",
              "5dbdbea315f60165af8ea55d",
              "5dbed0b59acd2e26e4e48922"
            ],
            "_id": "5dbdb774c9e23661b9a5883c",
            "name": "project one",
            "owner": "5dbd670722ec063c4dbb9d91",
            "createdAt": "2019-11-02T17:05:56.787Z",
            "updatedAt": "2019-11-03T14:03:05.585Z"
          },
          {
            "members": [
              "5dbd857ebf36944964306948",
              "5dbd7cad39249f48ee04cc98"
            ],
            "todoId": [
              "5dbf03174d181e33206f7dba",
              "5dbf03b24d181e33206f7dbb",
              "5dbf03c54d181e33206f7dbc",
              "5dbf21dc22177914cf62c306"
            ],
            "_id": "5dbefd324d181e33206f7db7",
            "name": "hjmk,",
            "owner": "5dbd670722ec063c4dbb9d91",
            "createdAt": "2019-11-03T16:15:46.795Z",
            "updatedAt": "2019-11-03T18:52:13.042Z"
          }
        ]
        

## Project/:id [/projects/{id}]

### Find One projects [GET]

+ Parameters

    + id (number) - ID of the Project in the form of an integer


+ Request

    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
          "members": [
            "5dbd857ebf36944964306948",
            "5dbd7cad39249f48ee04cc98"
          ],
          "todoId": [
            {
              "status": false,
              "_id": "5dbf03174d181e33206f7dba",
              "title": "fadiiiilll",
              "description": "punya bapak fadill",
              "dueDate": "2019-11-05T00:00:00.000Z",
              "createdAt": "2019-11-03T16:40:55.894Z",
              "updatedAt": "2019-11-03T16:40:55.894Z"
            },
            {
              "status": true,
              "_id": "5dbf21dc22177914cf62c306",
              "title": "tes",
              "description": "a",
              "dueDate": "2019-11-06T00:00:00.000Z",
              "createdAt": "2019-11-03T18:52:12.729Z",
              "updatedAt": "2019-11-03T18:57:36.859Z"
            }
          ],
          "_id": "5dbefd324d181e33206f7db7",
          "name": "hjmk,",
          "owner": "5dbd670722ec063c4dbb9d91",
          "createdAt": "2019-11-03T16:15:46.795Z",
          "updatedAt": "2019-11-03T18:57:37.169Z"
        }

### Add member [PATCH]

+ Parameters

    + id (number) - ID of the Project in the form of an integer


+ Request

    + Headers
    
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FqYWggbHVjdSIsImVtYWlsIjoiZ2FqYWhAbWFpbC5jb20iLCJfaWQiOiI1ZGJmNGVhZTFlOGNjZTJiNTkxMmQwNzEiLCJpYXQiOjE1NzI4MTk0Nzh9.W9PVZKczyCNmDVWMeUbmwlrtM45BF6teWZNM8kOCSmE"
            
+ Request (application/json)

        {
            "email": "kancil@mail.com"
        }            

+ Response 200 (application/json)

        {
            "members": [
                "5dbd857ebf36944964306948"
             ],
             "todoId": [],
             "_id": "5dbf57d31e8cce2b5912d07b",
             "name": "gajah",
             "owner": "5dbd670722ec063c4dbb9d91",
             "createdAt": "2019-11-03T22:42:27.570Z",
             "updatedAt": "2019-11-03T22:42:40.076Z"
        }

### Delete project [DELETE]

+ Parameters
    + id (number) - ID of the Todo in the form of an integer


+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FqYWggbHVjdSIsImVtYWlsIjoiZ2FqYWhAbWFpbC5jb20iLCJfaWQiOiI1ZGJmNGVhZTFlOGNjZTJiNTkxMmQwNzEiLCJpYXQiOjE1NzI4MTk0Nzh9.W9PVZKczyCNmDVWMeUbmwlrtM45BF6teWZNM8kOCSmE"

+ Response 200 (application/json)

        {
          "message": "project deleted"
        }
        
## Project/:id/todos [/projects/{id}/todos]

### add todos to project [POST]

+ Parameters

    + id (number) - ID of the Project in the form of an integer


+ Request

    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Request (application/json)

        {
            "title": gajah,
            "description": gajas todo,
            "dueDate": 2019-11-05
        }


+ Response 200 (application/json)

        {
          "members": [],
          "todoId": [
            "5dbf03174d181e33206f7dba"
          ],
          "_id": "5dbefd324d181e33206f7db7",
          "name": "hjmk,",
          "owner": "5dbd670722ec063c4dbb9d91",
          "createdAt": "2019-11-03T16:15:46.795Z",
          "updatedAt": "2019-11-03T16:40:56.203Z"
        }

## Project/:id/todos/:todoId [/projects/{id}/todos/{todoId}]

### Delete todos in project [POST]

+ Parameters

    + id (number) - ID of the Project in the form of an integer

+ Parameters

    + todoId (number) - ID of the Todo in the form of an integer


+ Request

    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
          "message": "Todo deleted"
        }
        

### update todos in project [PATCH]

+ Parameters

    + id (number) - ID of the Project in the form of an integer

+ Parameters

    + todoId (number) - ID of the Todo in the form of an integer


+ Request

    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Request (application/json)

        {
            "title": Kancil,
            "description": kancil todo,
            "dueDate": 2019-11-05
        }


+ Response 200 (application/json)

        {
          "message": "update success"
        }
        
## Project/:id/todos/:todoId/status [/projects/{id}/todos/{todoId}/status]

### Delete todos in project [POST]

+ Parameters

    + id (number) - ID of the Project in the form of an integer

+ Parameters

    + todoId (number) - ID of the Todo in the form of an integer


+ Request

    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Request (application/json)

        {
            "stauts": true
        }

+ Response 200 (application/json)

        {
          "message": "status updated"
        }
        
## Chat [/chat]

### Chat with simi [POST]

+ Request (application/json)

        {
            "text": "im arnold"
        }

+ Response 200 (application/json)

        {
          "status": 200,
          "statusMessage": "Ok",
          "request": {
            "utext": "im arnold",
            "lang": "en"
          },
          "atext": "<3 helga",
          "lang": "en"
        }