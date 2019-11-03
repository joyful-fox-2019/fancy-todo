# fancy-todo

Fancy Todo is a simple web-app to manage your to do list.

Fitur:

1. Add todo list in your main page.
2. Show all of your todo list.
3. Update your todo list by mark as completed.
4. Delete your todo list.
5. Give you a random quote to motivate your day.

 Here's the documentation:

## User

- **/todos/register**

| Method | Header | Params | Data                                                      |
| ------ | ------ | ------ | --------------------------------------------------------- |
| `POST` | `none` | `none` | name: `string`<br>email: `string` <br> password: `string` |

| Success Response                                           | Error Response                                               |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| Status: `201` <br> Content: `{_id, name, email, password}` | Status: `400` <br> Content: `{"error": ["email already registered","not a valid email" ]}` |


- **/todos/login**

| Method | Header | Params | Data                                    |
| ------ | ------ | ------ | --------------------------------------- |
| `POST` | `none` | `none` | email: `string` <br> password: `string` |

| Success Response                      | Error Response                                               |
| ------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{token}` | Status: `403` <br> Content: `{"message": "Email/Password is wrong"}` |


- **/todos/googleSignIn**

| Method | Header                            | Params | Data   |
| ------ | --------------------------------- | ------ | ------ |
| `POST` | Google `id_token`,`name`, `email` | `none` | `none` |

| Success Response                      | Error Response                                               |
| ------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{token}` | Status: `400` <br> Content: `{"message": "The verifyIdToken method requires an ID Token"}` |


## Todo

This end point need authentication from verified user.

- **/todos/**
  Get all todo from authenticated user.

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `GET`  | `token` | `none` | `none` |

| Success Response                               | Error Response                                               |
| ---------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `array of objects` | Status: `403` <br> Content: `{"message": "Jwt must be provided"}` |

- **/todos/**
  Create a todo for authenticated user.

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `POST` | `token` | `none` | `none` |

| Success Response                             | Error Response                                               |
| -------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `object of todo` | Status: `403` <br> Content: `{"error": ["You should enter todo's name","You should enter todo's description","You should enter todo's due date"]}` |

- **/todos/:id**
  Get one todo from authenticated user with specific todo `id`. This end point need authorization from verified user.

| Method | Header  | Params       | Data   |
| ------ | ------- | ------------ | ------ |
| `GET`  | `token` | id: `string` | `none` |

| Success Response                             | Error Response                                              |
| -------------------------------------------- | ----------------------------------------------------------- |
| Status: `200` <br> Content: `object of todo` | Status: `404` <br> Content: `{"message": "Data not found"}` |


- **/user/todo/:id**
  Update todo's `status` to `true`.  This end point need authorization from verified user.

| Method | Header  | Params       | Data   |
| ------ | ------- | ------------ | ------ |
| `PUT`  | `token` | id: `string` | `none` |

| Success Response                                      | Error Response                                     |
| ----------------------------------------------------- | -------------------------------------------------- |
| Status: `200` <br> Content: `object of updated todo}` | Status: `404` <br> Content: `{"message": "error"}` |


- **/user/todo/:id**
  Delete `todo`.

| Method   | Header  | Params       | Data   |
| -------- | ------- | ------------ | ------ |
| `DELETE` | `token` | id: `string` | `none` |

| Success Response                                     | Error Response                                     |
| ---------------------------------------------------- | -------------------------------------------------- |
| Status: `200` <br> Content: `object of deleted todo` | Status: `404` <br> Content: `{"message": "error"}` |

## Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ npm install
$ npm run dev
```

## 