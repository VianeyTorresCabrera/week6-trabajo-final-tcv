require('../models')
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const supertest = require('supertest');

const BASE_URL = '/api/v1/users'
let TOKEN
//let TOKEN2
let userId



//!login
beforeAll(async()=>{
    //hits
    const user = {
        email: "jose12@gmail.com",
        password:"jose123",
    }

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(user)
    
    TOKEN = res.body.token
    //console.log(TOKEN);
})


const user = {
        firstName: "Mary",
        lastName: "Juarez",
        email: "mary@gmail.com",
        password:"mary123",
        phone: "+57232145678"
}

//!create
test("POST -> BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName", async() =>{

    
    const res = await request(app)
        .post(BASE_URL)
        .send(user)

    userId= res.body.id;
   // console.log(res.body.id)


    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    //aplicar foreach
    //columns.forEach((column) =>{})
    expect(res.body.firstName).toBeDefined()  
    expect(res.body.firstName).toBe(user.firstName)  
});

//!getAll
test("GET -> BASE_URL, should return statusCode 200, and res.body.length===2", async()=>{
    const res = await supertest(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(2)
});

//!login
test("POST-> BASE_URL/login shoul return statusCode200, and res.body.user.email === hits.email", async()=>{
    const hits ={
        email: "jose12@gmail.com",
        password:"jose123"
    }

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(hits)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user).toBeDefined()
    expect(res.body.token).toBeDefined()
    expect(res.body.user.email).toBe(hits.email)

});


//!testError

test("POST-> BASE_URL/login shoul return statusCode401", async()=>{
    const hits ={
        email: "jose12@gmail.com",
        password:"invalid credentials"
    }

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(hits)

        expect(res.statusCode).toBe(401)
    
})



//!Update
test("PUT -> BASE_URL/userId/, should return statusCode 200, and res.body.firstName== student.firstName", async()=>{

    const userUpdate ={
        firstName: "Monica"       
    }    
    //userId= res.body.id;
    const res= await request(app)       
        .put(`${BASE_URL}/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(userUpdate)

        //console.log(userUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(userUpdate.firstName)    
});


//!Delete
test("DELETE -> BASE_URL/userId, should return statusCode 204", async()=>{
    const res = await request(app)
    .delete(`${BASE_URL}/${userId}`)
    .set('Authorization', `Bearer ${TOKEN}`)
        
    
    expect(res.statusCode).toBe(204)
});







