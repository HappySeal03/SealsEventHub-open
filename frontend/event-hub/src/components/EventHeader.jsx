import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';

const EventHeader = ({ name, description}) => {

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <h1 className="text-2xl font-semibold">{name || "Event Title"}</h1>
        <div className={`mt-2 transition-all ${isCollapsed ? 'line-clamp-1' : 'line-clamp-none'} text-gray-400`}>
            <ReactMarkdown components={{
                        h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-2xl font-semibold">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-1xl font-semibold">{children}</h3>,
                        h4: ({ children }) => <h4 className="text-2xm font-semibold">{children}</h4>,
                        h5: ({ children }) => <h5 className="text-1xm font-semibold">{children}</h5>,
                        hr: () => <hr className="my-4 border-t border-gray-500 w-full" />,
                      }}>
                  {description || "event description"}
              </ReactMarkdown>
        </div>
        <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="text-blue-400 mt-2 text-sm"
            >
            {isCollapsed ? 'Show more' : 'Show less'}
        </button>
    </>
  )
}

export default EventHeader