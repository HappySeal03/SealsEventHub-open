import React from 'react';
import ReactMarkdown from 'react-markdown';
import { usePopup } from './Context/PopupContext';

const AnnouncementCard = ({ body }) => {

    const { openPopup } = usePopup();
    
    const maxLength = 200;
    const truncatedBody = body.length > maxLength ? body.slice(0, maxLength) + '...' : body;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
        onClick={() => openPopup('markdown', body)}
    >
      <div className="prose text-gray-300 break-words">
        <ReactMarkdown components={{
            h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-semibold">{children}</h2>,
            h3: ({ children }) => <h3 className="text-1xl font-semibold">{children}</h3>,
            h4: ({ children }) => <h4 className="text-2xm font-semibold">{children}</h4>,
            h5: ({ children }) => <h5 className="text-1xm font-semibold">{children}</h5>,
          }}>
            {truncatedBody}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default AnnouncementCard;