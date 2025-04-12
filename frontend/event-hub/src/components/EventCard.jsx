import React from "react";

const EventCard = ({ event, status }) => {

  return (
    <div className="min-w-sm max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-white">
      {/* Event Header */}
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold">{event.name}</h2>
        <p className="text-sm text-gray-400">{event.event_specific_category}</p>
      </div>

      {/* Event Details */}
      <div className="px-6 py-4">
        <div className="mt-4 flex justify-between">
          <div>
            <p className="text-sm font-semibold">Event Type:</p>
            <p className="text-sm text-gray-400">{event.event_type}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Location:</p>
            <p className="text-sm text-gray-400">{event.location || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Date and Status */}
      <div className="px-6 py-4 border-t border-gray-700">
        <div className="flex justify-between mb-2">
          <div>
            <p className="text-sm font-semibold">Start:</p>
            <p className="text-sm text-gray-400">{event.start_date}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">End:</p>
            <p className="text-sm text-gray-400">{event.end_date}</p>
          </div>
        </div>
        <div className={`flex justify-between items-center mt-2`}>
          <div>
            <p className="text-sm font-semibold">Capacity:</p>
            <p className="text-sm text-gray-400">{event.capacity}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Status:</p>
            <p
              className={`text-sm font-bold text-white px-2 py-1 rounded`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;