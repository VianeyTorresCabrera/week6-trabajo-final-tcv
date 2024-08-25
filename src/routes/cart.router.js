const { getAll, create, getOne, remove, update } = require('../controllers/cart.controllers');
const express = require('express');
const {verifyJwt} = require('../utils/verifyJWT')

const routerCart = express.Router();

routerCart.route('/')
    .get(getAll)
    .post(create);

routerCart.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerCart;