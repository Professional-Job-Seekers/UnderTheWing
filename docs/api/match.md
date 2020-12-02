# Match <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [Match Two Users](#match-two-users)
  - [Route & Request](#route--request)
  - [JSON Request Parameters](#json-request-parameters)
  - [Sample Request JSON](#sample-request-json)
  - [Sample JSON Response](#sample-json-response)
- [Get all  Matches for a User](#get-all--matches-for-a-user)
  - [Route & Request](#route--request-1)
  - [JSON Request Parameters](#json-request-parameters-1)
  - [Sample JSON Response](#sample-json-response-1)

## Match Two Users

### Route & Request

``` POST ``` : /matches/match

### JSON Request Parameters

**Param**|**-**
:-----:|:-----:
mentee|required
mentor|required

### Sample Request JSON

``` JSON
{
    "mentee": "e578ecd5171a",
    "mentor": "9107d426a8f5"
}
```

### Sample JSON Response

``` JSON
{
    "match": 3,
    "mentee": "e578ecd5171a",
    "mentor": "9107d426a8f5"
}
```

## Get all  Matches for a User

### Route & Request

``` GET``` : /matches/

### JSON Request Parameters

**Param**|**-**|**Description**
:-----:|:-----:|:-----:
scope|optional| Any value from ["mentors", "mentees"]. The Default scope is mentees with the response returnng all mentors matched with a signed in user.

### Sample JSON Response

``` JSON
{
    "mentee": "9107d426a8f5",
    "mentors": [
        {
            "id": 2,
            "first_name": "e578ecd5171a",
            "last_name": "e578ecd5171a",
            "username": "e578ecd5171a",
            "email": "e578ecd5171a@foo.com",
            "about": "",
            "true": "2020-12-02T07:47:40.064Z",
            "updatedAt": "2020-12-02T07:47:40.064Z"
        },
        {
            "id": 10,
            "first_name": "f7aa0facc1a0",
            "last_name": "f7aa0facc1a0",
            "username": "f7aa0facc1a0",
            "email": "f7aa0facc1a0@foo.com",
            "about": "",
            "true": "2020-12-02T07:48:11.320Z",
            "updatedAt": "2020-12-02T07:48:11.320Z"
        }
    ]
}

```