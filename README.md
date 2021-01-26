# Node.js Express API with Typescript

Overview

- The API should be able to connect to a Mongo database and the database should have a table for users and another one for posts.
- The users table should have email, password, name, and an array of post ids created by the user.
- The posts table should have a title, imageUrl, content, and creator which should refer to the user id that created the post.
- The API should have an auth middleware to check endpoints protected by auth.
- JWT tokens should be used to implement Auth.
- You can optionally use an ODM library like mongoose.
- The endpoints for the API should be:
- - Signup
- - Login
- - Get posts (protected by auth)
- - Create a new post (protected by auth)
- - Get a specific post by Id (protected by auth)
- - Edit a post (protected by auth)
- - Delete a post (protected by auth)

### Features

---

- Object oriented approach.
- JWT Middleware for auth.
- Argon 2 for password encryption.
- Class validator for input validation.
- dependency injection with type-di.

### How to run

---

clone repo
`https://github.com/GustavoGomez092/API-assessment.git`

Install dependencies
`npm install`

Install dependencies
`npm run dev`

### Available endpoints

---

##### Signup

`POST` `http://localhost:3000/auth/signup`

##### Login

`POST` `http://localhost:3000/auth/login`

##### Create user posts (Auth route)

`POST` `http://localhost:3000/auth/post`

##### Get all user posts

`GET` `http://localhost:3000/post`

##### Update post by ID

`PUT` `http://localhost:3000/post/$postId`

##### Delete post by ID

`DEL` `http://localhost:3000/post/$postId`

### Auth type

---

The API uses Bearer token auth method.

```html
  "headers": {
    "Authorization": "Bearer $tokenGoesHere"
  }
```

### Example ENV

---


| Key | Value |
| - | - |
| MONGO_CONNECTION_STRING | @clusterx.xxx.mongodb.net/dbname?retryWrites=true&w=majority |
| JWT_SECRET | String |
| MONGO_USER | String |
| MONGO_PASS | String |
| PORT | Int |
| NODE_ENV | 'develop' or 'production' |
| TOKEN_EXP | value in minutes (15m) or seconds (60s) |
