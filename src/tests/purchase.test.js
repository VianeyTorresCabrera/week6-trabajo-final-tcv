require('../models')
const request = require('supertest');
const app = require('../app');
const supertest = require('supertest');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Purchase = require('../models/Purchase');

const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/purchase'
let TOKEN
let cartId
let userCart
let productId
let userIdpur
let purchaseId




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

const cart = {
    userId: 1,
    productId: 1,
    quantity: 2
}

const purchase = {
    userId: cart.userId,
    productId: cart.productId,
    quantity: cart.quantity
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
//      await cart.destroy()
// })

//!create
test("POST -> BASE_URL, should return statusCode 201, and res.body. === cart.userId", async() =>{

    purchaseCreate = await Purchase.bulkCreate(cart);


    const res = await request(app)
        .post(BASE_URL)
        .send(purchaseCreate)
        .set(`Authorization`, `Bearer ${TOKEN}`)

    purchaseId= res.body.id;
    //console.log(res.body);


    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.userId).toBe(purchaseCreate.userId)
});


// //!GetAll
test("GET -> BASE_URL, should return statusCode 200, and res.body.length===1", async()=>{
    const res = await supertest(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    //expect(res.body.userId).toBe(userId)
});
