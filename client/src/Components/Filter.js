import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';

const Filter = ({ onFilterChange }) => {
  const [performers, setPerformers] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Получаем исполнителей из API
    axios.get('http://localhost:5001/api/performers')
      .then((response) => {
        setPerformers(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке исполнителей:", error);
      });

    // Получаем площадки из API
    axios.get('http://localhost:5001/api/places')
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке площадок:", error);
      });
  }, []);

  const handleDateChange = (e) => {
    onFilterChange('date', e.target.value);
  };

  const handlePerformerChange = (e) => {
    onFilterChange('performer', e.target.value);
  };

  const handlePlaceChange = (e) => {
    onFilterChange('place', e.target.value);
  };

  return (
    <Form>
      <Form.Group controlId="formDate">
        <Form.Label>Дата</Form.Label>
        <Form.Control type="date" onChange={handleDateChange} />
      </Form.Group>
      <Form.Group controlId="formPerformer">
        <Form.Label>Выступающий</Form.Label>
        <Form.Control as="select" onChange={handlePerformerChange}>
          <option value="">Выберите выступающего</option>
          {performers.map((performer) => (
            <option key={performer.id} value={performer.id}>
              {performer.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formPlace">
        <Form.Label>Площадка</Form.Label>
        <Form.Control as="select" onChange={handlePlaceChange}>
          <option value="">Выберите площадку</option>
          {places.map((place) => (
            <option key={place.id} value={place.id}>
              {place.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default Filter;
