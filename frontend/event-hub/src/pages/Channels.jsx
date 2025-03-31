import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChannelCard from "../components/ChannelCard.jsx";

async function getMyChannels() {

  let token = localStorage.getItem("authToken");

  if (!token) {
    console.error('JWT token not found in localStorage');
    throw new Error('You need to be logged in to see your channels!');
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/channels/get-my-channels`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
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

const Channels = () => {
  const navigate = useNavigate();

  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const fetchedChannels = await getMyChannels();
        setChannels(fetchedChannels || []);
      } catch (err) {
        setError('Failed to load channels');
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (channels.length == 0) {
    return <div>No channels found</div>;
  }

  return (
    <div
      className="p-8 min-h-screen bg-cover bg-center"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {channels.map((channel, index) => (
            <ChannelCard
                key={channel.channel_id} name={channel.channel_name} description={channel.channel_description} channel_id={channel.channel_id}
            />
        ))}
      </div>
    </div>
  );
};

export default Channels;
