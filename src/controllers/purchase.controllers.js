const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Cart = require('../models/Cart');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id
    const purchase = await Purchase.findAll({where: {userId}, 
        include: [{
        model: Product,
        attributes: {exclude: ['createdAt','updatedAt']},
        include: [{
            model: Category,
            attributes: ['name']
        }]
    }]});
    return res.json(purchase);
});

const create = catchError(async(req, res) => {
    const userId = req.user.id
    const cart = await Cart.findAll({where:{userId}, 
        raw:true,
        attributes:['quantity','userId','productId']
    })
    if(!cart) return res.sendStatus(404)

    const purchase = await Purchase.bulkCreate(cart);

    await Cart.destroy({ where: {userId}})
    return res.status(201).json(purchase);
});



module.exports = {
    getAll,
    create    
}