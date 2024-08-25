const User = require('./User')
const Category = require('./Category')
const Product = require('./Product')


//!Product==>Category
Product.belongsTo(Category)
Category.hasMany(Product)