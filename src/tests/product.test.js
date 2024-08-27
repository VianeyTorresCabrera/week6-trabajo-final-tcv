require('../models')
const request = require('supertest');
const app = require('../app');
const Category = require("../models/Category");
const supertest = require('supertest');

let TOKEN
let category
let productId
let product
const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/products'


beforeAll(async () => {

    const hits = {
        email: "jose12@gmail.com",
        password:"jose123"
    }    

    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(hits)

    TOKEN = res.body.token

    category = await Category.create({name: 'Kitchen'})
    

    product = {
        title: "Estufa 15'",
        description: "Estufa roja, 8 quemadores, horno",
        price: 125.32,
        categoryId: category.id    
    }
});

afterAll((async() =>{
    await category.destroy()
}))

//!create
test("POST -> BASE_URL, should return statusCode 201, and res.body.title === product.title", async() =>{

    const res = await request(app)
        .post(BASE_URL)
        .send(product)
        .set(`Authorization`, `Bearer ${TOKEN}`)

    productId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)   

})

//!GetAll
test("GET -> BASE_URL, should return statusCode 200, and res.body.length===1", async()=>{
    const res = await supertest(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

        //console.log(res.body)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    //1:n
    expect(res.body[0].category.id).toBeDefined()
    expect(res.body[0].category.id).toBe(category.id)
});


//!GetOne
test("GET -> BASE_URL/:id, should return statusCode 200, and res.body.title === product.title", async()=>{
    const res = await supertest(app)
        .get(`${BASE_URL}/${productId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()

    //1:n
    expect(res.body.category.id).toBeDefined()
    expect(res.body.category.id).toBe(category.id)
});

//!Update
test("PUT -> BASE_URL/:id, should return statusCode 200, and res.body.title === updateProduct.title", async()=>{

    const updateProduct = {
        title: "Refrigerador"
    }
    const res = await supertest(app)
        .put(`${BASE_URL}/${productId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(updateProduct)

    //console.log(res.body);

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(updateProduct.title)

    //1:n
    expect(res.body.categoryId).toBeDefined()
    expect(res.body.categoryId).toBe(category.id)
});

//!Delete
test("DELETE -> BASE_URL/productId, should return statusCode 204", async()=>{
    const res = await request(app)
    .delete(`${BASE_URL}/${productId}`)
    .set('Authorization', `Bearer ${TOKEN}`)
        
    
    expect(res.statusCode).toBe(204)
});

