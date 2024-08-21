require('../models')
const sequelize = require('../utils/connection');
const userCreate = require('./createdata/userCreate');


const testMigrate = async () => {

    try {
        await sequelize.sync({ force: true })
        console.log('DB reset ✅');
        await userCreate()//usuario nuevo
        process.exit()
    } catch (error) {
        console.error(error);
    }
}

testMigrate();