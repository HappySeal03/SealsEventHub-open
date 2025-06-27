import React, { useState, useEffect } from 'react';
import '../index.css';
import EventCard from './EventCard';

async function getEvents(channel_id, status) {

  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/events/get-events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channel_id: channel_id,
        status: status
      })
    });

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

const EvenstList = ({list_title, channel_id, status}) => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getEvents(channel_id, status);
        setEvents(events || []);
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

  if (events.length == 0) {
    return <div>No events found</div>;
  }

  return (
    <div className=" text-white p-4">
        <h1 className='text-2xl font-semibold'>{list_title}</h1>
        <hr className="my-4 border-t-2 border-gray-500" />
        <div className="flex overflow-x-auto space-x-4 pb-4">
        {events.map((event, index) => (
            <EventCard
                key={event.id} event={event} status={status}
            />
        ))}
        </div>
    </div>
  )
}

export default EvenstList