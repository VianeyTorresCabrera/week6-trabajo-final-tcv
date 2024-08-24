require('../models')
const request = require('supertest');
const app = require('../app');
const User = require('../models/Category');
const supertest = require('supertest');

const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/categories'
let TOKEN
let categoryId



//!login
beforeAll(async()=>{
    //hits
    const user = {
        email: "jose12@gmail.com",
        password:"jose123",
    }

    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(user)
    
    TOKEN = res.body.token
    //console.log(TOKEN);
})


const category = {
        name: "Computers"        
}

//!create
test("POST -> BASE_URL, should return statusCode 201, and res.body.name === category.name", async() =>{

    const res = await request(app)
        .post(BASE_URL)
        .send(category)
        .set(`Authorization`, `Bearer ${TOKEN}`)

    categoryId= res.body.id;
    //console.log(categoryId);


    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()   
    expect(res.body.name).toBeDefined()  
    expect(res.body.name).toBe(category.name)  
});

// //!getAll
test("GET -> BASE_URL, should return statusCode 200, and res.body.length===1", async()=>{
    const res = await supertest(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});



// //!Delete
test("DELETE -> BASE_URL/categoryId, should return statusCode 204", async()=>{
    const res = await request(app)
    .delete(`${BASE_URL}/${categoryId}`)
    .set('Authorization', `Bearer ${TOKEN}`)        
    
    expect(res.statusCode).toBe(204)
});







