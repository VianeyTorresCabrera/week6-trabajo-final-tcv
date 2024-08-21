const User = require("../../models/User")

const userCreate =async() =>{

    const user = {
        firstName: "Jose",
        lastName: "Torres",
        email: "jose12@gmail.com",
        password:"jose123",
        phone: "+5723245678"
    }

    await User.create(user)
}

module.exports = userCreate