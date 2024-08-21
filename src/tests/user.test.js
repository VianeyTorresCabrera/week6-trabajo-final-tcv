require('../models')
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const supertest = require('supertest');

const BASE_URL = '/api/v1/users'
let TOKEN
let TOKEN2
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


test("POST -> BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName", async() =>{

    //console.log(first)
    //const user = await User.findAll()
    //console.log(user);
    //const columns = [firstName, lastName, email, password, phone]
    const res = await request(app)
        .post(BASE_URL)
        .send(user)

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    //aplicar foreach
    //columns.forEach((column) =>{})
    expect(res.body.firstName).toBeDefined()  
    expect(res.body.firstName).toBe(user.firstName)  
});


test("GET -> BASE_URL, should return statusCode 200, and res.body.length===2", async()=>{
    const res = await supertest(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(2)
});

// test("POST -> BASE_URL/login should return statusCode 200, and res.body.user.email ==== user.email", async()=>{
//     const user = {
//         email: "mary@gmail.com", //email = user.email
//         password:"mary123",
//     }

//     const res = await request(app)
//         .post(`${BASE_URL}/login`)
//         .send(user)

    
// });

// test("PUT -> BASE_URL/userId/, should return statusCode 200, and res.body.firstName== student.firstName", async()=>{

//     const userUpdate ={
//         firstName: "Lalo"
//     }

//     const res= await request(app)
//         .put(`${BASE_URL}/${userId}`)
//         .send(userUpdate)

//     expect(res.statusCode).toBe(200)
//     expect(res.body).toBeDefined()
//     expect(res.body.firstName).toBe(stuUpdate.firstName)    
// });

// test("DELETE -> BASE_URL/studentId, should return statusCode 204", async()=>{
//     const res = await request(app)
//         .delete(`${BASE_URL}/${studentId}`)
    
//     expect(res.statusCode).toBe(204)
// });





