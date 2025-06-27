import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';
import EventHeader from '../components/EventHeader';

async function getEvent(event_id) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/events/get-event-info/${event_id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
  } catch (error) {
    console.error('There was an error with the fetch operation:', error);
    return null;
  }
}

const EventPage = () => {

  const {id} = useParams();
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const res = await getEvent(id);
          setEvent(res || []);
        } catch (err) {
          setError('Failed to load events');
        } finally {
          setLoading(false);
        }
      };
  
      fetchEvents();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }

  return (
    <div>
      <EventHeader name={event.name} description={event.description}></EventHeader>

    </div>
  )
 
};

export default EventPage;
