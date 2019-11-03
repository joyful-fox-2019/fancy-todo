**Todo Fancy**
----
  Simple Todo App with authentication and authorization API build using Express JS, Mongoose, and JSON Web Token in the server side. As for the client side, it was built using jQuery and Bootstrap 4. 

## List of API Routers

Route | HTTP | Description
----- | ---- | -----------
/register | POST | Route used to register a new account
/login | POST | Route used to let user login to app
/gsignin | POST | Route used to let user register or login to app via Google account join their group
/invite/:id | PATCH | Route used to let user invite another user to project
/notifications | GET | Route used to display User's project's invitations
/accept | PATCH | Route used to let user accept project's invitation
/decline | PATCH | Route used to let user decline project's invitation
/ | GET | Route used to display all users to follow
/following | GET | Route used to display all following users
/followers | GET | Route used to display all followers users
/follow/:id | PATCH | Route used to let user follow another user
/unfollow/:id | PATCH | Route used to let user unfollow another user
/inbox | GET | Route used to display user's inbox
/todos | POST | Route used to create a todo
/todos | GET | Route used to retrieve all todos belongs to a user
/todos | POST | Route used to create a todo
/todos/:id | POST | Route used to create a todo in project
/todos/:id | PATCH | Route used to edit and update a todo
/todos/:id | DELETE | Route used to delete a todo
/projects | GET | Route used to retrieve all projects belongs to a user
/projects | POST | Route used to create a project
/projects/todos/:id | GET | Route used to retrieve all todos in project
/projects/members/:id | GET | Route used to retrieve all members in project
/projects/members/invite/:id | GET | Route used to retrieve all users that can be invited in project
/projects/members/:id | PATCH | Route used to remove user from project
/projects/:id | DELETE | Route used to delete a project
/messages/:id | POST | Route used to send a message
/messages/:id | DELETE | Route used to delete a message


## Usage

With only npm: 

```javascript
npm install
npm run dev in server folder
run index.html using live-server --host=localhost in client folder
```

**Register**
----
  Register new account to the database and returns a json response if succeeded.

* **URL**

  /register

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  Name<br />
  Email<br />
  Password

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ success: true, message: Successfully registered }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`


**Log In**
----
  Verify user's authentication and returns token if data is valid.

* **URL**

  /login

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  Username<br />
  Password

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ token: token retrieved from server generated using json web token }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Wrong username or password" }`


**Google Log In**
----
  Let user skip registration phase by registering into the app using information from their Google account. Returns token if succeeded.

* **URL**

  /gsignin

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  None required

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ token: token retrieved from server generated using json web token }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Invite to Project**
----
  Let user invite another user to project

* **URL**

  /invite/:id

* **Method:**
  
  `PATCH`

* **URL Params**

  id (User's id)

* **Data Params**

  None required

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg:  Invitation is sent}`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Get User's Notifications**
----
  Request to retrieve user's project's invitations

* **URL**

  /notifications

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all notifications data as an array }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Accept Project's Invitations**
----
  Accepting project's invitations

* **URL**

  /accept

* **Method:**
  
  `PATCH`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg: User is successfully joined the project }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Decline Project's Invitations**
----
  Declining project's invitations

* **URL**

  /decline

* **Method:**
  
  `PATCH`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg: Invitation declined }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Display User's to Follow**
----
  Request to retrieve all users that can be followed

* **URL**

  /

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all users data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Display User's Following User**
----
  Request to retrieve all following user that belong to logged in user

* **URL**

  /following

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all users data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Display User's Followers User**
----
  Request to retrieve all followers user that belong to logged in user

* **URL**

  /followers

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ users }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Follow a User**
----
  Let user to follow another user

* **URL**

  /follow/:id

* **Method:**
  
  `PATCH`

* **URL Params**

  id (User's id)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg: 'Successfully following }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Unollow a User**
----
  Let user to follow another user

* **URL**

  /unfollow/:id

* **Method:**
  
  `PATCH`

* **URL Params**

  id (User's id)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg: 'Successfully unfollowing }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Get User's Inbox**
----
  Request to retrieve user's personal inbox.

* **URL**

  /inbox

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ inbox }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`



**Get User's Todos**
----
  Request to retrieve user's personal todos.

* **URL**

  /todos

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all todos data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`


**Create a Todo**
----
  Post request to server to create a todo.

* **URL**

  /todos

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  Title<br />
  Description

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ todos_data : todo data}`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`

**Create a Todo in Project**
----
  Post request to server to create a todo in project

* **URL**

  /todos/:id

* **Method:**
  
  `POST`

* **URL Params**

  id (Project's id)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ todo }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`


**Edit Todo**
----
  Edit todo and update the existing data in the database.

* **URL**

  /todos/:id

* **Method:**
  
  `PUT`

* **URL Params**

  id (Todo's id)

* **Data Params**

  Title<br />
  Description<br />

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: Successfully updated todo }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`


**Delete Todo**
----
  Delete todo from the database and remove todo data from user's.

* **URL**

  /todos/:id

* **Method:**
  
  `DELETE`

* **URL Params**

  id (Todo's id)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: Successfully deleted todo }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`

**Get User's Projects**
----
  Request to retrieve user's personal projects.

* **URL**

  /todos

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all projects data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`

**Get Project's Todos**
----
  Request to retrieve all todos in project.

* **URL**

  /projects/todos/:id

* **Method:**
  
  `GET`

* **URL Params**

  id (Project's id)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all todos in project data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`

**Get Project's Members**
----
  Request to retrieve all members in project.

* **URL**

  /projects/members/:id

* **Method:**
  
  `GET`

* **URL Params**

  id (Project's id)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all members in project data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`


**Get Project's Members to Invite**
----
  Request to retrieve all members that can be invited to project.

* **URL**

  /projects/members/invite/:id

* **Method:**
  
  `GET`

* **URL Params**

  id (Project's id)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all members that can be invited in project data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`

**Remove Project's Members**
----
  Request to retrieve all members in project.

* **URL**

  /projects/members/:id

* **Method:**
  
  `PATCH`

* **URL Params**

  id (User's id)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg: 'Member is successfully removed' }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`


**Delete a Project**
----
  Delete a Project

* **URL**

  /projects/:id

* **Method:**
  
  `DELETE`

* **URL Params**

  id (Project's id)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg: 'Project is successfully deleted' }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`

**Send a Message**
----
  Send a message to another user

* **URL**

  /messages/:id

* **Method:**
  
  `POST`

* **URL Params**

  id (User's id)

* **Data Params**

  Content

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ msg: 'Message is sent' }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`

**Delete a Message**
----
  Delete user's messages in inbox

* **URL**

  /messages/:id

* **Method:**
  
  `DELETE`

* **URL Params**

  id (Message's id)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg: 'Message is successfully deleted' }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`
