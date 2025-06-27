import React, { useState, useEffect } from 'react';
import '../index.css';
import AnnouncementCard from './AnnouncementCard';

async function getAnnouncements(channel_id) {

  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/channels/get-announcements/${channel_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

const Announcements = ({channel_id}) => {

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchAnnouncements = async () => {
        try {
          const events = await getAnnouncements(channel_id);
          setAnnouncements(events || []);
        } catch (err) {
          setError('Failed to load announcements');
        } finally {
          setLoading(false);
        }
      };
  
      fetchAnnouncements();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    if (announcements.length == 0) {
      return <div>No announcements found</div>;
    }

  return (
    <div className="text-white p-4">
        <h1 className='text-2xl font-semibold'>Announcements</h1>
        <hr className="my-4 border-t-2 border-gray-500" />
        <div className="flex overflow-x-auto space-x-4 pb-4">
        {announcements.map((announcement) => (
          <div key={announcement.channel_id} className="flex-shrink-0 w-full sm:w-80 md:w-96 lg:w-1/3 xl:w-1/4">
            <AnnouncementCard body={announcement.announcement} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
