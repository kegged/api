<h1 align="center">🍺 Kegged API 🍻</h1>
<p align="center">Backend for <a
href="https://github.com/kegged/client">kegged/client</a></p>

## Routes

### Create a user

This method creates a new user and returns their new token.

`POST /users`

#### Body Parameters

| Name | Type | Description |
| --- | --- | --- |
| `firstName` | `string` | **Required.** The new user's first name. |
| `lastName` | `string` | **Required.** The new user's last name. |
| `email` | `string` | **Required.** The new user's valid email address. |
| `userName` | `string` | **Required.** The new user's username. |
| `passWord` | `string` | **Required.** The new user's password. |

#### Response

```
Status: 200 OK

{
  "newUser": {
      "isAdmin": false,
      "id": 7,
      "userName": "dirtydan",
      "firstName": "Dirty",
      "lastName": "Dan",
      "email": "dirty_dan@redacted.com",
      "hash": "$2a$10$xwE/LKCxY6Vr7TUZsIALheU6dIWCV73NGxr.U31dIMiK6cr1r8iQy",
      "salt": "$2a$10$xwE/LKCxY6Vr7TUZsIALhe",
      "updatedAt": "2018-01-31T17:16:33.706Z",
      "createdAt": "2018-01-31T17:16:33.706Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImRpcnR5ZGFuIiwiZW1haWwiOiJkaXJ0eV9kYW5AcmVkYWN0ZWQuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlkIjo3LCJpYXQiOjE1MTc0MTg5OTN9.lfO-LSchRRgoNVc-5twLnhzKVeC6cvuhIB-39HUQThk"
}
```

<hr>

### Get all users

This method gets all users.

`GET /users`

#### Response

```
Status: 200 OK

{
  {
    "id": 1,
    "userName": "charles",
    "firstName": "Charles",
    "lastName": "Kenney",
    "email": "charlesc.kenney@gmail.com"
  },
  {
    "id": 2,
    "userName": "emanbrew",
    "firstName": "Emmanuel ",
    "lastName": "Mosqueda ",
    "email": "emmanuelmr17@gmail.com"
  },
  {
    "id": 3,
    "userName": "Paul",
    "firstName": "Paul",
    "lastName": "Zavattieri",
    "email": "paulz92@gmail.com"
  }
}
```

<hr>

### Get a user

This method gets a user, their posts, and their comments.

`GET /users/:identifier`

#### Route Parameters

| Name | Type | Description |
| --- | --- | --- |
| identifier | string | The new user's userName or email. |

#### Response

```
Status: 200 OK

{
  "user": {
    "userName": "charles",
    "firstName": "Charles",
    "lastName": "Kenney",
    "email": "charlesc.kenney@gmail.com",
    "id": 1,
    "posts": [
      {
        "id": 1,
        "title": "foobar",
        "slug": "foobar",
        "content": "# foo\n## bar\n### bazz",
        "createdAt": "2018-01-29T19:33:29.000Z",
        "updatedAt": "2018-01-29T19:33:29.000Z",
        "breweryId": null,
        "userId": 1
      }
    ]
    "comments": [
      {
        "id": 1,
        "content": "Hello, world!",
        "createdAt": "2018-01-29T19:53:23.000Z",
        "updatedAt": "2018-01-29T19:53:23.000Z",
        "postId": 1,
        "post": {
          "id": 1,
          "title": "foobar",
          "slug": "foobar",
          "content": "# foo\n## bar\n### bazz",
          "createdAt": "2018-01-29T19:33:29.000Z",
          "updatedAt": "2018-01-29T19:33:29.000Z",
          "breweryId": null,
          "userId": 1,
          "user": {
            "userName": "charles",
            "firstName": "Charles",
            "lastName": "Kenney",
            "email": "charlesc.kenney@gmail.com",
            "id": 1
          }
        }
      }
    ]
  }
}
```
