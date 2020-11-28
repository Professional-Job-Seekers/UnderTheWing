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
- [Get All Mentors](#get-all-mentors)
  - [Sample JSON Response](#sample-json-response-2)

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

## Get All Mentors

``` GET ``` : /accounts/mentor/all

### Sample JSON Response

``` JSON 
[
    {
        "id": 1,
        "true": "2020-11-24T05:31:52.758Z",
        "updatedAt": "2020-11-24T05:31:52.758Z",
        "mentor_account_id": 6,
        "Account": {
            "id": 6,
            "first_name": "lad",
            "last_name": "mad",
            "username": "madlad",
            "email": "mad@lad.com",
            "true": "2020-11-24T05:31:52.556Z",
            "updatedAt": "2020-11-24T05:31:52.556Z"
        }
    },
    {
        "id": 2,
        "true": "2020-11-24T05:35:34.327Z",
        "updatedAt": "2020-11-24T05:35:34.327Z",
        "mentor_account_id": 8,
        "Account": {
            "id": 8,
            "first_name": "dsad",
            "last_name": "asd",
            "username": "dsad",
            "email": "sda@asd.com",
            "true": "2020-11-24T05:35:34.175Z",
            "updatedAt": "2020-11-24T05:35:34.175Z"
        }
    },
    {
        "id": 3,
        "true": "2020-11-24T20:49:54.780Z",
        "updatedAt": "2020-11-24T20:49:54.780Z",
        "mentor_account_id": 14,
        "Account": {
            "id": 14,
            "first_name": "thegreatfoobar",
            "last_name": "thegreatfoobar",
            "username": "thegreatfoobar",
            "email": "thegreatfoobar@thegreatfoobar.com",
            "true": "2020-11-24T20:49:54.616Z",
            "updatedAt": "2020-11-24T20:49:54.616Z"
        }
    }
]
```
