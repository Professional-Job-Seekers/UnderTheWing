# AUTH

## Signup

### Route & Request

``` POST ``` : /auth/signup/

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
    "first_name": "the",
    "last_name": "dude",
    "username": "thedude",
    "email": "the@dude.com",
}
```

## Login

### Route & Request

``` POST ``` : /auth/login/

### JSON Request Parameters

**Param**|**-** |**Description**
:-----:|:-----: |:-----:
username|required| Either email or username.
password |required| User's password.

### Sample Request JSON

``` JSON
{
   "username": "thedude",
   "password": "reallydude"
}
```

### Sample JSON Response

``` JSON
{
    "first_name": "the",
    "last_name": "dude",
    "username": "thedude",
    "email": "the@dude.com",
}
```

## Logout

### Route & Request

``` POST ``` : /auth/logout/

### JSON Request Parameters

**Param**|**-**
:-----:|:-----:

### Sample Request JSON

``` JSON
{}
```

### Sample JSON Response

``` JSON
{
    "message": "Logout successful"
}
```
