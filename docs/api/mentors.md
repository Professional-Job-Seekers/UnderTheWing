# Mentors API <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [Set User as a Mentor](#set-user-as-a-mentor)
  - [Route & Request](#route--request)
  - [JSON Request Parameters](#json-request-parameters)
  - [Sample Request JSON](#sample-request-json)
  - [Sample JSON Response](#sample-json-response)
- [Check if User Is a Mentor](#check-if-user-is-a-mentor)
  - [Query Parameters](#query-parameters)
  - [Sample JSON Response](#sample-json-response-1)

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
