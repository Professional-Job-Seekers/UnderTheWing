# Mentees API <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [Set User as a Mentee](#set-user-as-a-mentee)
  - [Route & Request](#route--request)
  - [JSON Request Parameters](#json-request-parameters)
  - [Sample Request Body JSON](#sample-request-body-json)
  - [Sample JSON Response](#sample-json-response)
- [Check if User Is a Mentee](#check-if-user-is-a-mentee)
  - [Query Parameters](#query-parameters)
  - [Sample JSON Response](#sample-json-response-1)

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
