# Mentees API

## Set User as a Mentee

### Route & Request

``` POST ``` : /accounts/mentee/

### JSON Request Parameters

**Param**|**-** |**Description**
:-----:|:-----: |:-----:
username|required| Search for user by either email or username.

### Sample Request Body JSON

``` JSON
{
   "username": "thedude",
}
```

### Sample JSON Response

``` JSON
{
    "is_mentee": true
}
```

## Check if User Is a Mentee

``` GET ``` : /accounts/mentee/

### Query Parameters

**Param**|**-** |**Description**
:-----:|:-----: |:-----:
username|required| Search for user by either email or username.

### Sample JSON Response

``` JSON
{
    "is_mentee": true
}
```
