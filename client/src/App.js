// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import EventCard from './Components/EventCard';
import OrderModal from './Components/OrderModal';
import Filter from './Components/Filter';

function App() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get('http://localhost:5001/api/events');
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEvents();
  }, []);

  const handleOrderClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleFilterChange = (filterType, value) => {
    let filtered = [...events];

    if (filterType === 'date' && value) {
      filtered = filtered.filter((event) => event.date.includes(value));
    }
    if (filterType === 'performer' && value) {
      filtered = filtered.filter((event) => event.Performers.some((p) => p.id === +value));
    }
    if (filterType === 'place' && value) {
      filtered = filtered.filter((event) => event.placeId === parseInt(value));
    }

    setFilteredEvents(filtered);
  };

  return (
    <Container>
      <h1>Афиша</h1>
      <Filter onFilterChange={handleFilterChange} />
      <Row>
        {filteredEvents.map((event) => (
          <Col key={event.id} sm={4}>
            <EventCard event={event} onOrderClick={handleOrderClick} />
          </Col>
        ))}
      </Row>
      <OrderModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        event={selectedEvent}
      />
    </Container>
  );
}

export default App;
