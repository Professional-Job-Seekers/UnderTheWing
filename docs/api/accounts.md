# Accounts <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [Find Account](#find-account)
  - [Request Parameters](#request-parameters)
  - [Sample JSON Response](#sample-json-response)


## Find Account

``` GET ``` : /accounts/user/

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
