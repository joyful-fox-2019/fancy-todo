# fancy-todo

##### List of user Routes

| Route  | HTTP   | Headers   | Body  | Description  |
|---|---|---|---|---|
|  users/ | POST  |  none | username:string(Required), email:string(Required),  password:string(Requeired)    | create new User   |
| users/login  | POST  |  none | username:string(Required),   password:string(Requeired)   | Login User  |
| users/googlelogin  | POST  |  none |  none  | Login with Google  |


##### List of Todo Routes

| Route  | HTTP   | Headers   | Body  | Description  |
|---|---|---|---|---|
| /todos  | GET  | token , payload   | none  | List Of Todos   |
|  /todos | POST  | token , payload   | name:string , description:string |  Create new Todo |
|  /todos/:id | DELETE  | token , payload   |  none   | delete a todo  |
|  /todos/:id| PATCH  |  token , payload  |  node  |  complete a todo |
|  /todos/:id | PATCH  |  token , payload  | title:string(Required) , description:string(Required)  | update a todo 