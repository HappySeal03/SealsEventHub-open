import React, { useState } from 'react';
import '../index.css';


const InfoHeader = ({ title, description }) => {

    const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">

        <h1 className="text-2xl font-semibold">{title}</h1>

        <div className="mt-2">

            <p className={`transition-all ${isCollapsed ? 'line-clamp-1' : 'line-clamp-none'} text-gray-400`}>
            {description}
            </p>

            <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="text-blue-400 mt-2 text-sm"
            >
            {isCollapsed ? 'Show more' : 'Show less'}
            </button>
            
      </div>
    </div>
  )
}

export default InfoHeader