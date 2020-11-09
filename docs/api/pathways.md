# Pathways

## Create Pathway

### Route & Request

``` POST ``` : pathways/create

### JSON Request Parameters

**Param**|**-** |**Description**
:-----:|:-----: |:-----:
title|required| The name of the pathway to create.
categories|optional| Array of string categories to assign to pathway. Categories must be from a list of available categories, not new.
tasks|optional| Array of json tasks to assign to pathway.

**Task Param**|**-** |**Description**
:-----:|:-----: |:-----:
title|required| name of the task.
sequence|required| integer representing sequence of task in pathway.
requires_review|optional| Default value is false.

### Sample Request JSON

``` JSON
{
    "title": "Ninja Cats",
    "categories": ["Default","Foo"],
    "tasks": [
        {
            "title": "sneaking",
            "sequence": 1,
            "requires_review": false
        },
        {
            "title": "eating",
            "sequence": 2,
            "requires_review": false
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
        "categories": [
            "Default",
            "Foo"
        ],
        "tasks": [
            {
                "id": 1,
                "title": "sneaking",
                "sequence": 1,
                "requires_review": false,
                "PathwayId": 1,
                "createdAt": "2020-11-09T03:07:16.099Z",
                "updatedAt": "2020-11-09T03:07:16.099Z"
            },
            {
                "id": 2,
                "title": "eating",
                "sequence": 2,
                "requires_review": false,
                "PathwayId": 1,
                "createdAt": "2020-11-09T03:07:16.099Z",
                "updatedAt": "2020-11-09T03:07:16.099Z"
            }
        ]
    }
}
```

## Update Pathway Progress

### Route & Request

```POST``` : pathways/update/

### JSON Request Parameters

**Param**|**-** |**Description**
:-----:|:-----: |:-----:
pathway|required| The name of the pathway.
tasks|required| Array of json tasks to assign to pathway.

### JSON Request Parameters

### Sample JSON Response

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
                "sequence": 1,
                "requires_review": false,
                "createdAt": "2020-11-09T00:25:01.130Z",
                "updatedAt": "2020-11-09T00:25:01.130Z",
                "PathwayId": 1
            },
            {
                "id": 2,
                "title": "eating",
                "sequence": 2,
                "requires_review": false,
                "createdAt": "2020-11-09T00:25:01.130Z",
                "updatedAt": "2020-11-09T00:25:01.130Z",
                "PathwayId": 1
            }
        ]
    }
}
```
