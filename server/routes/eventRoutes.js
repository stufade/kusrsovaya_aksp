const express = require('express');
const { Event, Performer, Place } = require('../models');
const router = express.Router();

// Создание события
router.post('/events', async (req, res) => {
  try {
    const { price, date, placeId, performers, image } = req.body;
    console.log(placeId);
    const event = await Event.create({ price, date, placeId, image });
    if (performers && performers.length) {
      const performersData = await Performer.findAll({
        where: { id: performers },
      });
      await event.setPerformers(performersData);
    }
    res.json(event);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Получение всех событий
router.get('/events', async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [Place, Performer],
    });
    res.json(events);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Обновление события
router.put('/events/:id', async (req, res) => {
  try {
    const { price, date, placeId, performers, image } = req.body;
    const event = await Event.findByPk(req.params.id);
    if (event) {
      event.price = price;
      event.date = date;
      event.placeId = placeId;
      event.image = image;
      await event.save();
      if (performers && performers.length) {
        const performersData = await Performer.findAll({
          where: { id: performers },
        });
        await event.setPerformers(performersData);
      }
      res.json(event);
    } else {
      res.status(404).send('Event not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Удаление события
router.delete('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      await event.destroy();
      res.json({ message: 'Event deleted' });
    } else {
      res.status(404).send('Event not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
