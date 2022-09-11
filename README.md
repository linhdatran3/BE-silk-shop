# BE Silkshop API
- Overview: silk shop is a website that sells furniture products.
- Service with NodeJs(express) and MongoDB as a database.
- Server: heroku [(https://silkshop.herokuapp/)](https://silkshop.herokuapp/).
- Server database: mongoBD atlas [https://cloud.mongodb.com/v2#/org/61bc0bc28143494a3810f7c2/projects](https://cloud.mongodb.com/v2#/org/61bc0bc28143494a3810f7c2/projects)).

## Resources

There are 4 main resources need in shopping prototypes:

- Products [https://silkshop.herokuapp/products](https://silkshop.herokuapp.com/)
- Carts [https://silkshop.herokuapp/carts](https://silkshop.herokuapp.com/)
- Users [https://silkshop.herokuapp/users](https://silkshop.herokuapp.com/)
- Login [https://silkshop.herokuapp/auth/login](https://silkshop.herokuapp.com/)
- Admin [https://silkshop.herokuapp/admin](https://silkshop.herokuapp.com/)

Notes: some APIs require tokens

## How to

you can fetch data with any kind of methods you know(fetch API, Axios, jquery ajax,...)

### Get all products

```js
fetch("https://silkshop.herokuapp.com/products")
  .then((res) => res.json())
  .then((json) => console.log(json));
```

### Get a single product

```js
fetch("https://silkshop.herokuapp.com/products/1")
  .then((res) => res.json())
  .then((json) => console.log(json));
```

### Add new product

```js
fetch("https://silkshop.herokuapp.com/products", {
  method: "POST",
  body: JSON.stringify({
    title: "test product",
    price: 13.5,
    description: "lorem ipsum set",
    image: "https://i.pravatar.cc",
    category: "electronic",
  }),
  header:{
    Authorization:"Bearer " + token,
  }
})
  .then((res) => res.json())
  .then((json) => console.log(json));

/* will return
{
 id:31,
 title:'...',
 price:'...',
 category:'...',
 description:'...',
 image:'...'
}
*/
```



### Updating a product

```js
fetch("https://silkshop.herokuapp.com/products/7", {
  method: "PUT",
  body: JSON.stringify({
    title: "test product",
    price: 13.5,
    description: "lorem ipsum set",
    image: "https://i.pravatar.cc",
    category: "electronic",
  }),
  header:{
    Authorization:"Bearer " + token,
  }
})
  .then((res) => res.json())
  .then((json) => console.log(json));

/* will return
{
    id:7,
    title: 'test product',
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://i.pravatar.cc',
    category: 'electronic'
}
*/
```

```js
fetch("https://silkshop.herokuapp.com/products/8", {
  method: "PATCH",
  body: JSON.stringify({
    title: "test product",
    price: 13.5,
    description: "lorem ipsum set",
    image: "https://i.pravatar.cc",
    category: "electronic",
  }),
  header:{
    Authorization:"Bearer " + token,
  }
})
  .then((res) => res.json())
  .then((json) => console.log(json));

/* will return
{
    id:8,
    title: 'test product',
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://i.pravatar.cc',
    category: 'electronic'
}
*/
```


### Deleting a product

```js
fetch("https://silkshop.herokuapp.com/products/8", {
  method: "DELETE",
  header:{
    Authorization:"Bearer " + token,
  }
});
```


## All available routes

### Products

```js
fields:
{
    id:Number,
    title:String,
    price:Number,
    category:String,
    description:String,
    image:String
}
```

GET:

- /products (get all products)
- /products/1 (get specific product based on id)
- /products/products/categories (get all categories)
- /products/category/electronuc (get all products in specific category)

POST:

- /products

-PUT,PATCH

- /products/1

-DELETE

- /products/1

### Carts

```js
fields:
{
    id:Number,
    userId:Number,
    date:Date,
    products:[{productId:Number,quantity:Number}]
}
```

GET:

- /carts (get all carts)
- /carts/1 (get specific cart based on id)
- /carts/user/1 (get a user cart)

POST:

- /carts

PUT,PATCH:

- /carts/1

DELETE:

- /carts/1

### Users

```js
fields:
{
    id:20,
    email:String,
    username:String,
    password:String,
    name:{
        firstname:String,
        lastname:String
        },
    address:String,
    phone:String
}
```

GET:

- /users (get all users)
- /users/1 (get specific user based on id)


POST:

- /users

PUT,PATCH:

- /users/1

DELETE:

- /users/1

### Auth

```js
fields:
{
    username:String,
    password:String
}
```

POST:

- /auth/login

### Admin
```js
fields:
{
    id:Number,
    username:String,
    password:String,
    role: Admin
}
```
POST:

- /login
- /add
