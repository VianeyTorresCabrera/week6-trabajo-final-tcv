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

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Purchase.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Purchase.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Purchase.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}