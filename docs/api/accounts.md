# User Accounts API

## Account Creation

### Route & Request

``` POST ``` : /accounts/user-account/

### JSON Request Parameters

**Param**|**-**
:-----:|:-----:
first\_name|required
last\_name|required
username|required
email|required
password|required

### Sample Request JSON

``` JSON
{
   "first_name": "the",
   "last_name": "dude",
   "username": "thedude",
   "email": "the@dude.com",
   "password": "reallydude"
}
```

### Sample JSON Response

``` JSON
{
    "id": 3,
    "first_name": "the",
    "last_name": "dude",
    "username": "thedude",
    "email": "the@dude.com",
    "updatedAt": "2020-10-28T03:18:39.784Z",
    "true": "2020-10-28T03:18:39.784Z"
}
```

## Find Account

``` GET ``` : /accounts/user/?username

### Request Parameters

**Param**|**-** |**Description**
:-----:|:-----: |:-----:
username|required| Search for user by either email or username.

### Sample JSON Response

``` JSON
{
    "id": 3,
    "first_name": "the",
    "last_name": "dude",
    "username": "thedude",
    "email": "the@dude.com",
    "updatedAt": "2020-10-28T03:18:39.784Z",
    "true": "2020-10-28T03:18:39.784Z"
}
```
