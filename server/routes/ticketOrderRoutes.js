const express = require('express');
const { TickerOrder, Event } = require('../models');
const router = express.Router();

// Создание заказа
router.post('/orders', async (req, res) => {
  try {
    const { eventId, userName, phone } = req.body;
    const order = await TickerOrder.create({ eventId, userName, phone });
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Получение всех заказов
router.get('/orders', async (req, res) => {
  try {
    const orders = await TickerOrder.findAll({include: [Event]});
    res.json(orders);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Удаление заказа
router.delete('/orders/:id', async (req, res) => {
  try {
    const order = await TickerOrder.findByPk(req.params.id);
    if (order) {
      await order.destroy();
      res.json({ message: 'Order deleted' });
    } else {
      res.status(404).send('Order not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
