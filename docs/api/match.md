# Match <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [Match Two Users](#match-two-users)
  - [Route & Request](#route--request)
  - [JSON Request Parameters](#json-request-parameters)
  - [Sample Request JSON](#sample-request-json)
  - [Sample JSON Response](#sample-json-response)

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
