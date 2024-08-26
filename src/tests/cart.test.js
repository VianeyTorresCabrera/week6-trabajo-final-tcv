require('../models')
const request = require('supertest');
const app = require('../app');
const supertest = require('supertest');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');

const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/cart'
let TOKEN
let cartId
let userCart
let productId
let userId
let productCart

const cart = {
    quantity: 2        
}

const user = {
    firstName: "Mary",
    lastName: "Juarez",
    email: "mary@gmail.com",
    password:"mary123",
    phone: "+57232145678"
}

const category = {name: 'Kitchen'}

const product = {
    title: "Estufa 15'",
    description: "Estufa roja, 8 quemadores, horno",
    price: 125.32,
    categoryId: category.id   
}


//!login
beforeAll(async()=>{
    //hits
    const hits = {
        email: "jose12@gmail.com",
        password:"jose123",
    }
    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(hits)
    
    TOKEN = res.body.token
    //console.log(TOKEN);
    userId = res.body.user.id    
});

// afterAll(async()=>{
//     //await category.destroy()   
//     await product.destroy()   
// })

//!create
test("POST -> BASE_URL, should return statusCode 201, and res.body.userId === cart.userId", async() =>{

    productCart = await Product.create(product);
    cart.userId = userId;
    cart.productId = productCart.id; 


    const res = await request(app)
        .post(BASE_URL)
        .send(cart)
        .set(`Authorization`, `Bearer ${TOKEN}`)

    cartId= res.body.id;
    //console.log(res.body);


    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()       
    expect(res.body.userId).toBe(cart.userId)  
});


//!GetAll
test("GET -> BASE_URL, should return statusCode 200, and res.body.length===1", async()=>{
    const res = await supertest(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});


//!GetOne
test("GET -> BASE_URL/:id, should return statusCode 200, and res.body.userId === userId", async()=>{
    const res = await supertest(app)
        .get(`${BASE_URL}/${cartId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()   
    
    expect(res.body.userId).toBe(userId)
    expect(res.body.product.title).toBe(product.title)
});

//!Update
test("PUT -> BASE_URL/:id, should return statusCode 200, and res.body.title === updateProduct.title", async()=>{

    const updateCart = {
        quantity: 5
    }
    const res = await supertest(app)
        .put(`${BASE_URL}/${cartId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(updateCart)

    //console.log(res.body.quantity);

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(updateCart.quantity)

    //1:n 
    expect(res.body.userId).toBeDefined()   
    expect(res.body.userId).toBe(userId)
});


//!Delete
test("DELETE -> BASE_URL/productId, should return statusCode 204", async()=>{
    const res = await request(app)
    .delete(`${BASE_URL}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}`)      
    
    expect(res.statusCode).toBe(204)
});



