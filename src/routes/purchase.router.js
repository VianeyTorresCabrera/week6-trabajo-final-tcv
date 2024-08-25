const { getAll, create, getOne, remove, update } = require('../controllers/purchase.controllers');
const express = require('express');

const routerPurchase = express.Router();

routerPurchase.route('/')
    .get(getAll)
    .post(create);

routerPurchase.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerPurchase;