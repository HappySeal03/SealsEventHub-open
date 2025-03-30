import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { User } from 'lucide-react';

const ChannelCard = ( {name, description, channel_id} ) => {

const navigate = useNavigate();

  const handleCardClick = () => {
       navigate(`/channels/${channel_id}`);
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      {/* Main Card */}
      <div
        className="bg-gray-900 hover:bg-gray-900 shadow-lg rounded-lg p-4 cursor-pointer transition duration-300"
        onClick={handleCardClick}
      >
        <div className="flex items-center">
          {/* Channel Icon TEMPORARY*/}
            <User className="mr-4"  />
          <div className="flex-1">
            {/* Channel Title */}
            <h3 className="text-white font-semibold text-lg">{name}</h3>
            {/* Channel Description */}
            <p className="text-gray-300 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
              {description.length > 30 ? description.slice(0, 30) + '...' : description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;
