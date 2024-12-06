const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const performerRoutes = require('./routes/performerRoutes');
const placeRoutes = require('./routes/placeRoutes');
const eventRoutes = require('./routes/eventRoutes');
const tickerOrderRoutes = require('./routes/ticketOrderRoutes');

const app = express();

// Настройки
app.use(cors());
app.use(express.json());

// Маршруты
app.use('/api', performerRoutes);
app.use('/api', placeRoutes);
app.use('/api', eventRoutes);
app.use('/api', tickerOrderRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.sync();
    console.log('Database synced successfully');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
});
