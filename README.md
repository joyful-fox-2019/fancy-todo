# fancy-todo

**Fancy-Todo API**
---
Base URL: `http://localhost:8080`

**1. Google OAuth**
----
  Sign-in via GoogleOAuth 2.0 and return json web token

* **URL**
  `http://localhost:3000/google-signin`
* **Method:**
  `POST`
* **Success Response:**
  * **Code:** 200 
  * **Content:** `{ jtw_token : String }`
* **Error Response:**
  * **Code:** 500 Internal Server Error 
  * **Content:** `{ error : "fail to generate token" }`
* **Sample Call:**
  ```javascript
    $.ajax({
      url: "http://localhost:3000/google-signin",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
  
**2. Create todo**
----
  Return object of todo model

* **URL**
  `http://localhost:3000/todo`
* **Method:**
  `POST`
* **Success Response:**
  * **Code:** 201 
  *  **Content:** `{ json }`
* **Error Response:**
  * **Code:** 500 Internal Server Error 
    **Content:** `{ "msg": "Error" }`
* **Sample Call:**
  ```javascript
    $.ajax({
      url: "http://localhost:3000/todo",
      type : "POST",
      data:{
          title, description,due_date
      },
      headers:{
          token: localStorage.getItem('token)
      },
      success : function(r) {
        console.log(r);
      }
    });
  ```
 
  
 **3. Get All User Todo**
----
  Return all todos having by user

* **URL**
  `http://localhost:3000/todo`
* **Method:**
  `GET`
*  **URL Params**
   **Required:**
   * `headers: {
        token: String
    }`
* **Success Response:**
  * **Code:** 200 
  *  **Content:** `[
      { json }
    ]`
* **Error Response:**
  * **Code:** 500 Internal Server Error 
    **Content:** `{ error : "fail to fetch data" }`
* **Sample Call:**
  ```javascript
    $.ajax({
      url: ,
      headers: {
        token: localStorage.getItem('token')
    },
    type : "GET",
    success : function(r) {
        console.log(r);
        }
    });
  ```
  
  
**4. Find One Todo**
----
  Return an object todo

* **URL**
  `htpp://localhost:3000/todo/:id`
* **Method:**
  `GET`
*  **URL Params**
   **Required:**
* `headers:{
        token: localStorage.getItem('token')
    }`
* **Success Response:**
  * **Code:** 200 
  *  **Content:** `{ json }`
* **Error Response:**
  * **Code:** 500 Internal Server Error 
    **Content:** `{ error : "Cannot find todo" }`
* **Sample Call:**
  ```javascript
    $.ajax({
      url: "htpp://localhost:3000/todo/:id",
      type : "GET",
      headers : {
          token: localStorage.getItem('token')
      }
      success : function(r) {
        console.log(r);
      }
    });
  ```
  

**5. Get Pending Todo**
----
  Return all todo data that have status : false or Pending

* **URL**
  `http://localhost:3000/todo/pending`
* **Method:**
  `GET`
* **Success Response:**
  * **Code:** 200 
  *  **Content:** `[
      { json }
  ]`
* **Error Response:**
  * **Code:** 500 Internal Server Error 
    **Content:** `{ error : "fail to fetch data" }`
* **Sample Call:**
  ```javascript
    $.ajax({
      url: "http://localhost:3000/todo/pending",
      type : "GET",
      headers:{
        token: localStorage.getItem('token')
      },
      success : function(r) {
        console.log(r);
      }
    });
  ```

**6. Get Complete Todo**
---
    Return all todo which have status Complete

* **URL**
  `http://localhost:3000/todo/complete`
* **Method:**
  `GET`
* **Success Response:**
  * **Code:** 200 
  * **Content:** `[
    { json }
    ]`
* **Error Response:**
  * **Code:** 500 Internal Server Error 
    **Content:** `{ error : "fail to fetch data" }`
* **Sample Call:**
  ```javascript
    $.ajax({
      url: "http://localhost:3000/todo/complete",
      type : "GET",
      headers:{
          token: localStorage.getItem('token)
      },
      success : function(r) {
        console.log(r);
      }
    });
  ```

 **7. Delete Todo**
 ---
    Action to delete single todo

* **URL**
  `http://localhost:3000/todo/:id`
* **Method:**
  `DELETE`
* **Success Response:**
  * **Code:** 200 
  *  **Content:** `{ json }`
* **Error Response:**
  * **Code:** 500 Internal Server Error 
    **Content:** `{ error : "fail to delete todo" }`
* **Sample Call:**
  ```javascript
    $.ajax({
      url: "http://localhost:3000/todo/:id",
      type : "DELETE",
      headers:{
        token: localStorage.getItem('token')
      },
      success : function(r) {
        console.log(r);
      }
    });
  ```

**8. Update Todo (Find One First)**
---
    Return object todo which have available value to be edit

* **URL**
  `http://localhost:3000/todo/:id`
* **Method:**
  `GET`
* **Success Response:**
  * **Code:** 200 
  *  **Content:** `{ json }`
* **Error Response:**
  * **Code:** 500 Internal Server Error 
    **Content:** `{ error : "fail to find todo to be update" }`
* **Sample Call:**
  ```javascript
    $.ajax({
      url: "http://localhost:3000/todo/:id",
      type : "GET",
      headers:{
        token: localStorage.getItem('token')
      },
      success : function(r) {
        console.log(r);
      }
    });
  ```

**9. Update Todo (Mark Complete)**
---
    Update todo for title, status, description and date

* **URL**
  `http://localhost:3000/todo/${id}`
* **Method:**
  `PUT`
*  **URL Params**
   **Required:**
   * `data:{
        title : String,
        description: String,
        dueDate: Date,
        status: Boolean(true)
      },
      headers:{
        token: String
      }`
* **Success Response:**
  * **Code:** 200 
  *  **Content:** `{ json }`
* **Error Response:**
  * **Code:** 500 Internal Server Error 
    **Content:** `{ error : "fail to update todo" }`
* **Sample Call:**
  ```javascript
    $.ajax({
      url: "/movies/detail/69",
      type : "GET",
      data:{
        title : title,
        description: description,
        dueDate: due_date,
        status: true
        },
        headers:{
            token: localStorage.getItem('token')
        },
      success : function(r) {
        console.log(r);
      }
    });
  ```

 **10 Update Todo (Still Pending)**
 ---
    Update title, description and dueDate only

* **URL**
  `http://localhost:3000/todo/${id}`
* **Method:**
  `PUT`
*  **URL Params**
   **Required:**
   * `data:{
        title : String,
        description: String,
        dueDate: Date,
        status: Boolean(false)
    },
    headers:{
        token: String
    }`
* **Success Response:**
  * **Code:** 200 
  *  **Content:** `{ json }`
* **Error Response:**
  * **Code:** 500 Internal Server Error 
    **Content:** `{ error : "fail to update todo" }`
* **Sample Call:**
  ```javascript
    $.ajax({
      url: "/movies/stats/69",
      type : "GET",
      data:{
            title : title,
            description: description,
            dueDate: due_date,
            status: false
        },
        headers:{
            token: localStorage.getItem('token')
        },
      success : function(r) {
        console.log(r);
      }
    });
  ```

 **11. Register**
 ---
    Regiter user to fancy todo

* **URL**
  `http://localhost:3000/users/register`
* **Method:**
  `POST`
*  **URL Params**
   **Required:**
   * `data:{
        name: String,
        email: String,
        password: String
    }`
* **Success Response:**
  * **Code:** 200 
  *  **Content:** `{ json }`
* **Error Response:**
  * **Code:** 500 Internal Server Error 
    **Content:** `{ error }`
* **Sample Call:**
  ```javascript
    $.ajax({
      url: "http://localhost:3000/users/register",
      type : "POST",
      data:{
            name, email, password
        },
      success : function(r) {
        console.log(r);
      }
    });
  ```
**12. Login**

* **URL**
  ``
* **Method:**
  `POST`
*  **URL Params**
   **Required:**
   * `data:{
        email: String,
        password: String
    }`
* **Success Response:**
  * **Code:** 200 
  *  **Content:** `{ json }`
* **Error Response:**
  * **Code:** 500 Internal Server Error 
    **Content:** `{ error }`
* **Sample Call:**
  ```javascript
    $.ajax({
      url: "http://localhost:3000/users/login",
      type : "POST",
      data:{
        email, password
      },
      success : function(r) {
        console.log(r);
      }
    });
  ```