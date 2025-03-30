import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChannelCard from "../components/ChannelCard.jsx";

const Channels = () => {
  const navigate = useNavigate();

  // Define an array of event objects
  const channels = [
    {
      channel_id: "1",
      icon: "",
      name: 'Channel 1', // Title of the event
      description: 'this description is looooooooooooooooooooooooooooooooooooooooooooooooooooooong', // Short description
    },
    {
      channel_id: "2",
      icon: "",
      name: 'Channels 2',
      description: 'Short description',
    },
    {
      channel_id: "3",
      icon: "",
      name: 'Channel 3',
      description: 'short description example',
    },
  ];

  return (
    <div
      className="p-8 min-h-screen bg-cover bg-center"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {channels.map((channel, index) => (
            <ChannelCard
                key={channel.channel_id} name={channel.name} description={channel.description} channel_id={channel.channel_id}
            />
        ))}
      </div>
    </div>
  );
};

export default Channels;
