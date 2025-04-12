import React from "react";
import ReactMarkdown from 'react-markdown';
import { usePopup } from '../Context/PopupContext';

const MarkdownPopup = () => {

    const { popupContent } = usePopup();

    return (
        <div className="prose break-words w-full max-w-sm mx-auto flex flex-col justify-center items-center px-6 py-8 bg-gray-800">
            <ReactMarkdown components={{
            h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-semibold">{children}</h2>,
            h3: ({ children }) => <h3 className="text-1xl font-semibold">{children}</h3>,
            h4: ({ children }) => <h4 className="text-2xm font-semibold">{children}</h4>,
            h5: ({ children }) => <h5 className="text-1xm font-semibold">{children}</h5>,
            hr: () => <hr className="my-4 border-t border-gray-500 w-full" />,
          }}>
                {popupContent}
            </ReactMarkdown>
        </div>
    )
}

export default MarkdownPopup