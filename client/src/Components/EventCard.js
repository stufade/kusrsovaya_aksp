import React from 'react';
import { Card, Button } from 'react-bootstrap';

const EventCard = ({ event, onOrderClick }) => {
  console.log(event);
  
  return (
    <Card style={{ width: '18rem', marginTop: '2rem' }}>
      <Card.Img variant="top" src={event.image} />
      <Card.Body>
        <Card.Title>{event.Performers.map(p => p.name).join(" ")}</Card.Title>
        <Card.Title>{event.Place.name}</Card.Title>
        <Card.Text>{event.date}</Card.Text>
        <Card.Text>Цена: {event.price}₽</Card.Text>
        <Button variant="primary" onClick={() => onOrderClick(event)}>
          Оформить заказ
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
