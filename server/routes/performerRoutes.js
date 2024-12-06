const express = require('express');
const { Performer } = require('../models');
const router = express.Router();

// Создание исполнителя
router.post('/performers', async (req, res) => {
  try {
    const { name } = req.body;
    const performer = await Performer.create({ name });
    res.json(performer);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Получение всех исполнителей
router.get('/performers', async (req, res) => {
  try {
    const performers = await Performer.findAll();
    res.json(performers);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Обновление исполнителя
router.put('/performers/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const performer = await Performer.findByPk(req.params.id);
    if (performer) {
      performer.name = name;
      await performer.save();
      res.json(performer);
    } else {
      res.status(404).send('Performer not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Удаление исполнителя
router.delete('/performers/:id', async (req, res) => {
  try {
    const performer = await Performer.findByPk(req.params.id);
    if (performer) {
      await performer.destroy();
      res.json({ message: 'Performer deleted' });
    } else {
      res.status(404).send('Performer not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
