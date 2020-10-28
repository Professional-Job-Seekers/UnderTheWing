# Login API

## User login

### Route & Request

``` POST ``` : /accounts/logins/

### JSON Request Parameters

**Param**|**-**
**Param**|**-** |**Description**
:-----:|:-----: |:-----:
username|required| Either email or username.
password |required| User's password.

### Sample Request JSON

``` JSON
{
   "username": "thecadence",
   "password": "some_strong_password"
}
```

### Sample JSON Response

``` JSON
{
    "status": 200,
    "msg": "User authenticated!"
}
```

``` Reponse Code ```: 200
