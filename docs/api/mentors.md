# Mentors API

## Set User as a Mentor

### Route & Request

``` POST ``` : /accounts/mentor/

### JSON Request Parameters

**Param**|**-** |**Description**
:-----:|:-----: |:-----:
username|required| Search for user by either email or username.

### Sample Request JSON

``` JSON
{
   "username": "thedude",
}
```

### Sample JSON Response

``` JSON
{
    "is_mentor": true
}
```

## Check if User Is a Mentor

``` GET ``` : /accounts/mentor/

### Query Parameters

**Param**|**-** |**Description**
:-----:|:-----: |:-----:
username|required| Search for user by either email or username.

### Sample JSON Response

``` JSON
{
    "is_mentor": true
}
```
