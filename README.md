# Secret Family Recipes

Deployed at: https://daisy-bw-backend.herokuapp.com/

### api/auth/register POST

Expects an object with this format as the request body.  Username and Email must be unique.

```
  {
   "first_name": "Jane",
   "last_name": "Doe",
   "username": "janedoe",
   "password": "password",
   "email": "jane@doe.com"
  }
```

### api/auth/login POST

Expects an object with this format as the request body:

```
{
   "username": "janedoe",
   "password": "password"
}
```



### api/recipes GET

Requires an `authorization` header with a JWT, and will return an array of objects in this format:

```
[
  {
    "id": 1,
    "user_id": 1,
    "recipe_name": "recipe1",
    "source": "source1",
    "recipe_instructions": "instructions1"
  },
  {
    "id": 2,
    "user_id": 1,
    "recipe_name": "recipe2",
    "source": "source2",
    "recipe_instructions": "instructions2"
  }
]
```


### api/recipes/:recipe_id/ingredients GET

Requires an `authorization` header with a JWT, and will return an array of objects in this format:

```
[
  {
    "recipe_name": "recipe1",
    "ingredient_name": "chicken"
  },
  {
    "recipe_name": "recipe1",
    "ingredient_name": "rice"
  }
]
```

### api/recipes POST

Requires an `authorization` header with a JWT. Expects an object with this format as the request body:

```
  {
     "user_id": 1,
	"recipe_name": "recipe1",
     "source": "source1",
     "recipe_instructions": "instructions1"
  }
```

### api/ingredients POST

Requires an `authorization` header with a JWT. Expects an object with this format as the request body:

```
  {
    "recipe_id": 1,
    "quantity": "2",
    "unit_type": "cup",
    "ingredient_name": "rice"
  }
```

### /recipes/:id PUT

Requires an `authorization` header with a JWT. Expects an object with this format as the request body:

```
  {
     "user_id": 1,
	"recipe_name": "recipe1",
     "source": "source1",
     "recipe_instructions": "instructions1"
  }
```

### /recipes/:id DELETE

Requires an `authorization` header with a JWT. Deletes the selected recipe if it exists.
