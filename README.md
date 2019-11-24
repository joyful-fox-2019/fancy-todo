# Fancy to-do


End Route Documentation : 

| Routes           | HTTP   | Header(s) | Body                                                         | Response                                                     | Description                                                 |
| ---------------- | ------ | --------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------------------------- |
| `/users/signin   `        | `POST`   | `none`      | **email**(required) : String, **password**(required) : String | **Success** : (200) show task of authenticated user, **Error** : (500) : Internal Server Error | User can login                                              |
| `users/googlesignin   `       | `POST`   | `none`      | **email**(required) of Gmail, **password**(required) of Gmail | **Success** : (200) show task of authenticated user, **Error** : (500) : Internal Server Error | User can login with Google email                            |
| `users/register`        | `POST`   | `none`      | **firstName**(required) : String, **lastName**(required) : String ,**email**(required) : String, **password**(required) : String | **Success** : (200) show login form**Error** : (500) : Internal Server Error | User signing up as a new user                               |
| `/todos/:id `       | `GET`    | `token`     | none                                                         | **Success** : (200) Fetch Data **Error** : (500) : Internal Server Error | Get a list of tasks of authenticated User                   |
| `/todos/:id` | `PUT`    | `token`     | none                                                         | **Success** : (200) Updated status and completedAt **Error** : (500) : Internal Server Error | Updating a status and mark when the task marked as complete |
| `/todos/:id` | `DELETE` | `token`     | none                                                         | **Success** : (200) The task has been removed, **Error** : (500) : Internal Server Error | Remove the task                                             |
| `/todos `    | `POST`   | `token`     | **title**(required) : String, **dueDate** : Date, **dueTime **: Date, **description **: String | **Success** : (200) Created a new task **Error** : (500) : Internal Server Error | Create a new task                                           |


Access client via `http://localhost:8080`<br>
Access server via `http://localhost:3000`