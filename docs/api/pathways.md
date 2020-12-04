# Pathways <!-- omit in toc -->

## Table Of Contents <!-- omit in toc -->

- [Get Pathway](#get-pathway)
  - [Route & Request](#route--request)
  - [Query Request Parameters](#query-request-parameters)
  - [Sample Request](#sample-request)
  - [Sample Response JSON](#sample-response-json)
- [Create Pathway](#create-pathway)
  - [Route & Request](#route--request-1)
  - [JSON Request Parameters](#json-request-parameters)
  - [Sample Request JSON](#sample-request-json)
  - [Sample Response JSON](#sample-response-json-1)
- [Commit User to Pathway](#commit-user-to-pathway)
  - [Route & Reqeust](#route--reqeust)
  - [JSON Request Parameters](#json-request-parameters-1)
  - [Sample JSON Request](#sample-json-request)
  - [Sample JSON Response](#sample-json-response)
- [Get Active Pathway for a User](#get-active-pathway-for-a-user)
  - [Route & Request](#route--request-2)
  - [Query Request Parameters](#query-request-parameters-1)
  - [Sample GET Request Without Scope](#sample-get-request-without-scope)
  - [Sample Response Without Scope](#sample-response-without-scope)
  - [Sample GET Request With Scope](#sample-get-request-with-scope)
  - [Sample Response With Scope](#sample-response-with-scope)
- [Update Pathway Task Progress](#update-pathway-task-progress)
  - [Route & Request](#route--request-3)
  - [JSON Request Parameters](#json-request-parameters-2)
  - [Sample JSON Request](#sample-json-request-1)
  - [Sample JSON Request ads](#sample-json-request-ads)
- [Tasks](#tasks)
  - [Create Task Category](#create-task-category)
  - [Sample Response](#sample-response)
  - [Get All Task Categories](#get-all-task-categories)
  - [Sample Response](#sample-response-1)
  - [Get Active Pathway Task](#get-active-pathway-task)
  - [Query Request Parameters for Get Active Pathway Task](#query-request-parameters-for-get-active-pathway-task)
  - [Sample Response for task_id = 4](#sample-response-for-task_id--4)

## Get Pathway

### Route & Request

```GET``` : pathways/

### Query Request Parameters

**Param**|**-** |**Description**
:-----:|:-----: |:-----:
pathway|optional| The name of the pathway. If this parameter is not defined, an array of existing pathways without tasks is returned.

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

## Create Pathway

### Route & Request

``` POST ``` : pathways/create

### JSON Request Parameters

**Param**|**-** |**Description**
:-----:|:-----: |:-----:
title|required| The name of the pathway to create.
description|optional| A description of the pathway.
categories|optional| Array of string categories to assign to pathway. Categories must be from a list of available categories, not new.
tasks|optional| Array of json tasks to assign to pathway.

**Task Param**|**-** |**Description**
:-----:|:-----: |:-----:
title|required| name of the task.
sequence|required| integer representing sequence of task in pathway.
description|optional| name of the task.
requires_review|optional| Default value is false.

### Sample Request JSON

``` JSON
{
    "title": "Ninja Cats",
    "description": "Learn how to be an amazing ninja cat",
    "categories": ["Default"],
    "tasks": [
        {
            "title": "sneaking",
            "sequence": 1,
            "requires_review": false,
            "description": "Learn how to sneak like a ninja"
        },
        {
            "title": "eating",
            "sequence": 2,
            "requires_review": false,
            "description": "Learn how to eat like a ninja"
        }
    ]
}
```

### Sample Response JSON

```JSON
{
    "pathway": {
        "id": 6,
        "description": "Learn how to be an amazing ninja cat",
        "title": "Ninja Cats",
        "tasks": [
            {
                "id": 16,
                "title": "sneaking",
                "sequence": 1,
                "requires_review": false,
                "description": "Learn how to sneak like a ninja",
                "PathwayId": 6,
                "createdAt": "2020-11-28T23:48:52.424Z",
                "updatedAt": "2020-11-28T23:48:52.424Z",
                "TaskCategoryId": null
            },
            {
                "id": 17,
                "title": "eating",
                "sequence": 2,
                "requires_review": false,
                "description": "Learn how to eat like a ninja",
                "PathwayId": 6,
                "createdAt": "2020-11-28T23:48:52.424Z",
                "updatedAt": "2020-11-28T23:48:52.424Z",
                "TaskCategoryId": null
            }
        ]
    }
}
```

## Commit User to Pathway

### Route & Reqeust

```POST``` : pathways/commit/

### JSON Request Parameters

**Param**|**-** |**Description**
:-----:|:-----: |:-----:
username|optional| If the user is logged in, then this parameter doesn't need to be passed. It is required if the user is not logged in.
pathway|optional| Name of the pathway.

### Sample JSON Request

```JSON
{
    "username": "thedude",
    "pathway" : "Ninja Cats"
}
```

### Sample JSON Response

```JSON
{
    "active_pathway": {
        "status": "pending_start",
        "id": 1,
        "account_id": 1,
        "pathway_id": 1,
        "updatedAt": "2020-11-09T05:47:40.181Z",
        "createdAt": "2020-11-09T05:47:40.181Z"
    }
}
```

## Get Active Pathway for a User

### Route & Request

```GET``` : pathways/progress/

### Query Request Parameters

**Param**|**-** |**Description**
:-----:|:-----: |:-----:
pathway|required| The name of the pathway.
username|optional| If the user is logged in, then this parameter doesn't need to be passed. It is required if the user is not logged in.
scope|optional| Set scope to 'all' to get all active user pathways.

### Sample GET Request Without Scope

```pathways/progress/?username=thedude&pathway=Ninja Cats```

### Sample Response Without Scope

```JSON
{
    "pathway_id": 1,
    "pathway": "Ninja Cats",
    "tasks": [
        {
            "id": 1,
            "title": "sneaking",
            "sequence": 1,
            "requires_review": false,
            "createdAt": "2020-11-10T03:48:59.831Z",
            "updatedAt": "2020-11-10T03:48:59.831Z",
            "PathwayId": 1,
            "status": "pending_start"
        },
        {
            "id": 2,
            "title": "eating",
            "sequence": 2,
            "requires_review": false,
            "createdAt": "2020-11-10T03:48:59.831Z",
            "updatedAt": "2020-11-10T03:48:59.831Z",
            "PathwayId": 1,
            "status": "pending_start"
        }
    ]
}
```

### Sample GET Request With Scope

```pathways/progress/?username=thedude&pathway=Ninja Cats&scope=all```

### Sample Response With Scope

```JSON
[
    {
        "pathway": "Ninja Cats",
        "tasks": [
            {
                "id": 1,
                "title": "sneaking",
                "sequence": 1,
                "requires_review": false,
                "createdAt": "2020-11-10T03:48:59.831Z",
                "updatedAt": "2020-11-10T03:48:59.831Z",
                "PathwayId": 1,
                "status": "pending_start"
            },
            {
                "id": 2,
                "title": "eating",
                "sequence": 2,
                "requires_review": false,
                "createdAt": "2020-11-10T03:48:59.831Z",
                "updatedAt": "2020-11-10T03:48:59.831Z",
                "PathwayId": 1,
                "status": "pending_start"
            }
        ]
    }
]
```

## Update Pathway Task Progress

### Route & Request

```POST``` : pathways/progress/update

### JSON Request Parameters

**Param**|**-** |**Description**
:-----:|:-----: |:-----:
task_id|required| ID of the task to update.
new_status|required| Any value from: ['completed','skipped','under_review', 'pending_start', 'pending_review', 'in_progress']

### Sample JSON Request

```JSON
{
    "task_id": 1,
    "new_status": "completed"
}
```

### Sample JSON Request ads

```JSON
{
    "task_id": 1,
    "status": "completed"
}
```

## Tasks

### Create Task Category

```POST```: pathways/tasks/category/create

### Sample Response

```JSON
{
    "id": 1,
    "category": "foooooo",
    "updatedAt": "2020-11-28T23:05:21.850Z",
    "createdAt": "2020-11-28T23:05:21.850Z"
}
```

### Get All Task Categories

```GET```: pathways/tasks/category/all

### Sample Response

```JSON
[
    {
        "id": 1,
        "category": "foooooo",
        "createdAt": "2020-11-28T23:09:09.439Z",
        "updatedAt": "2020-11-28T23:09:09.439Z"
    },
    {
        "id": 2,
        "category": "baaaar",
        "createdAt": "2020-11-28T23:09:20.866Z",
        "updatedAt": "2020-11-28T23:09:20.866Z"
    }
]
```

### Get Active Pathway Task

```GET```: pathways/progress/active-task/

### Query Request Parameters for Get Active Pathway Task

**Param**|**-** |**Description**
:-----:|:-----: |:-----:
task_id|required| Id of active pathway task.

### Sample Response for task_id = 4

```JSON
{
    "task": {
        "active_task": {
            "id": 4,
            "status": "pending_start",
            "submission": "",
            "createdAt": "2020-12-03T21:31:18.196Z",
            "updatedAt": "2020-12-03T21:31:18.196Z",
            "pathway_task_id": 7,
            "active_pathway_id": 2,
            "account_id": 2
        },
        "task": {
            "id": 7,
            "title": "72278d2e9727",
            "sequence": 0,
            "requires_review": true,
            "description": "b04bfe60bcc4cb8195cb6de1093ee72c1f9741a04202c130cc24f651d76b9ea297fcb96cf907ac44813f32e313bcbb36d54b",
            "createdAt": "2020-12-03T20:47:12.696Z",
            "updatedAt": "2020-12-03T20:47:12.696Z",
            "PathwayId": 4,
            "TaskCategoryId": null
        }
    }
}
```