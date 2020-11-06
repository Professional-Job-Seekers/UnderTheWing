# Pathways

## Create Pathway

### Route & Request

``` POST ``` : pathways/create

### JSON Request Parameters

**Param**|**-** |**Description**
:-----:|:-----: |:-----:
title|required| The name of the pathway to create.
tasks|optional| Array of json tasks to assign to pathway.

### Sample Request JSON

``` JSON
{
    "title": "Ninja Cats",
    "tasks": [
        {
            "title": "sneaking"
        },
        {
            "title": "eating"
        }
    ]
}
```

### Sample Response JSON

```JSON
{
    "pathway": {
        "id": 1,
        "title": "Ninja Cats",
        "tasks": [
            {
                "id": 1,
                "title": "sneaking",
                "PathwayId": 1,
                "createdAt": "2020-11-04T05:20:16.568Z",
                "updatedAt": "2020-11-04T05:20:16.568Z"
            },
            {
                "id": 2,
                "title": "eating",
                "PathwayId": 1,
                "createdAt": "2020-11-04T05:20:16.568Z",
                "updatedAt": "2020-11-04T05:20:16.568Z"
            }
        ]
    }
}
```

## Get Pathway

### Route & Request

```GET``` : pathways/

### Query Request Parameters

**Param**|**-** |**Description**
:-----:|:-----: |:-----:
pathway|required| The name of the pathway.

### Sample Request

```GET:``` pathways/?pathway=Ninja%20Cats

### Sample Response JSON

``` JSON
{
    "pathway": {
        "id": 1,
        "title": "Ninja Cats",
        "tasks": [
            {
                "id": 1,
                "title": "sneaking",
                "createdAt": "2020-11-04T05:20:16.568Z",
                "updatedAt": "2020-11-04T05:20:16.568Z",
                "PathwayId": 1
            },
            {
                "id": 2,
                "title": "eating",
                "createdAt": "2020-11-04T05:20:16.568Z",
                "updatedAt": "2020-11-04T05:20:16.568Z",
                "PathwayId": 1
            }
        ]
    }
}
```
