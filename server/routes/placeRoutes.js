const express = require('express');
const { Place } = require('../models');
const router = express.Router();

// Создание площадки
router.post('/places', async (req, res) => {
  try {
    const { name, capacity } = req.body;
    const place = await Place.create({ name, capacity });
    res.json(place);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Получение всех площадок
router.get('/places', async (req, res) => {
  try {
    const places = await Place.findAll();
    res.json(places);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Обновление площадки
router.put('/places/:id', async (req, res) => {
  try {
    const { name, capacity } = req.body;
    const place = await Place.findByPk(req.params.id);
    if (place) {
      place.name = name;
      place.capacity = capacity;
      await place.save();
      res.json(place);
    } else {
      res.status(404).send('Place not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Удаление площадки
router.delete('/places/:id', async (req, res) => {
  try {
    const place = await Place.findByPk(req.params.id);
    if (place) {
      await place.destroy();
      res.json({ message: 'Place deleted' });
    } else {
      res.status(404).send('Place not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
