const express = require('express');
const router = express.Router();
const orderController = require('../controller/my-order.controller');

router.post('/my-order', orderController.createOrder)
router.get('/my-order', orderController.getOrders)
router.get('/my-order/:id', orderController.getOneOrder)
router.put('/my-order', orderController.updateOrder)
router.delete('/my-order/:id', orderController.deleteOrder)

module.exports = router;
