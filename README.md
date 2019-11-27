# fancy-todo
------

  

## **1. `POST` User / Register**

  

Register new user and will returns data user and password that has been hashed.

  

-  **URL**

  

/user/register

  

-  **Method:**

  

`POST`

  

-  **URL params**

  

none

  

-  **Data Body**

  

```json

username=[string]

email=[string]

password=[string]

```

  

-  **Success Response:**

  

-  **Code:** 201

**Content:**

  

```json

{  username  :  "username",

email  :  "email",

password  :  "$2a$10$ASA5ZM/cnNoBcR/OIl1iZOczgacDPUamq3Kwrmn1C01Pw0u4.4Iqi"  }

```

  

**Error Response:**

  

-  **Code:** 400 BAD REQUEST

**Content:**  `{ error : "username / password required" }/{ error : "username / password has been taken" }`

  

-  **Sample Input:**

  

```JSON

{

"username":  "username",

"email":  "email",

"password":  "123456"

}

```

  
  
  

## **2. `POST` User / Login**

  

Login user and will returns username, email and data Token.

  

-  **URL**

  

/user/login

  

-  **Method:**

  

`POST`

  

-  **URL params**

  

none

  

-  **Data Body**

  

```

email=[string]

password=[string]

```

  

-  **Success Response:**

  

-  **Code:** 200

**Content:**

  

```json

{

"token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTY5OTgwMDE0fQ.UOxbgr1EY5sXCM1csgZIjba2vbbML-Tc-LtqDTKs5NY",

"username":  "username"

}

```

  

-  **Error Response:**

  

-  **Code:** 400 BAD REQUEST

**Content:**  `{ error : "username / password wrong" }`

-  **Code:** 500

**Content:**  `{ error : "Internal server error" }`

  

-  **Sample Input:**

  

```JSON

{

"email":  "email"

"password":  "123456"

}

```

  

## **3. `POST` / Todo/ Find**


will Return get all Todos

-  **URL**

  
/todo/find

  -  **Method:**

  

`POST`

  

-  **URL params**

  

none

  -  **Data Body**

  

```

username=[string]

```

-  **Success Response:**

  

-  **Code:** 200

**Content:**

  

```json
[{

"_id":  "5dbe925832e04d54610991d6",

"title":  "playing basketball",

"description":  "playing basketball with friends",

"status":  "false",

"dueDate":  "2019-11-10T00:00:00.000Z",

"username":  "faisal",

"__v":  0

},


{

"_id":  "5dbeab8559c978612c2a0e12",

"title":  "Dating with Girl Friends",

"description":  "but no have GF :(",

"status":  "false",

"dueDate":  "2019-11-20T00:00:00.000Z",

"username":  "faisal",

"__v":  0

}]

```


-  **Error Response:**

  

-  **Code:** 400 BAD REQUEST

**Content:**  `{ error : "username  invalid" }`

-  **Code:** 500

**Content:**  `{ error : "Internal server error" }`

  

-  **Sample Input:**

  

```JSON

{

"username":  "username"

}

```

  
  ## **4. `POST` / Todo/ Create**


will returns to create a user todo

-  **URL**

  
/todo/create

  -  **Method:**

  

`POST`

  

-  **URL params**

  

none

  -  **Data Body**

  

```

title=[string]
description=[string]
status=[string]
dueDate=[date]
username=[date]

```

-  **Success Response:  Create A Todo Successfully**

  

-  **Code:** 201

**Content:**
```json
{

"_id":  "5dbecead6569f802282d3444",

"title":  "Playing games",

"description":  "Ranked Dota 2 with Friends",

"status":  "false",

"dueDate":  "2019-11-10T00:00:00.000Z",

"username":  "faisal",

"__v":  0

}

```

  -  **Error Response:**

  

-  **Code:** 400 BAD REQUEST

**Content:**  

-  **Code:** 500

**Content:**  `{ error : "Internal server error" }`

  

  ## **5. `PUT` / Todo/ Update**


will returns update some user todo

-  **URL**

  
/todo/update

  -  **Method:**


`PUT`
  

-  **URL params**

  

none

  -  **Data Body**
 ```
title=[string]
description=[string]
dueDate=[date]
id=[string]
```

-  **Success Response:  Update Todo Successfully**

  

-  **Code:** 200

**Content:**
```json
{
"n":  1,

"nModified":  1,

"ok":  1
}

```

  -  **Error Response:**

  

-  **Code:** 400 BAD REQUEST

**Content:**  

-  **Code:** 500

**Content:**  `{ error : "Internal server error" }`

-  **Sample Input:**

  

```JSON
{
"title":  "title",
"description":  "description",
"dueDate":  "dueDate",
"id":  "id",
}
```


  ## **6. `POST` / Todo/ Delete**

will returns Delete Some Todo

-  **URL**

  
/todo/delte

  -  **Method:**


`DELETE`
  

-  **URL params**

  

none

  -  **Data Body**
 ```
id=[string]
```

-  **Success Response:  Delete Todo Successfully**

  

-  **Code:** 200

**Content:**
```json
{
"n":  1,

"nModified":  1,

"ok":  1
}

```

  -  **Error Response:**

  

-  **Code:** 400 BAD REQUEST

**Content:**  

-  **Code:** 500

**Content:**  `{ error : "Internal server error" }`

-  **Sample Input:**

  

```JSON
{
"id":  "id",
}
```



  ## **ENV**
  
```
PORT = 3000

GOOGLE_CLIENT_ID = "your google client id"

MONGO_CONNECT = "mongodb://localhost:27017/yourDatabase"

JWT_SECRET = "RedEyesDragon"

PASSWORD_USER = "DarkMagician"
```