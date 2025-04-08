import React from 'react';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import LoginForm from './Popups/LoginForm';
import SignUpForm from './Popups/SignUpForm';
import ProfilePopup from './Popups/ProfilePopup';
import { usePopup } from './Context/PopupContext';

const PopupManager = () => {

  const { activePopup, closePopup, popupContent } = usePopup();

  if (!activePopup) return null;

  {/*TODO: stop passing closePopup and use the new context in the components themselves*/}
  const popupComponents = {
    signup: <SignUpForm closePopup={closePopup} />,
    signin: <LoginForm closePopup={closePopup} />,
    profile: <ProfilePopup closePopup={closePopup} />,
    markdown: (
      <div className="bg-gray-800 rounded-lg p-6">
        <ReactMarkdown>TODO: create a proper component to render the markdown pop-up</ReactMarkdown>
      </div>
    ),
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-20">
      <div className="bg-gray-800 rounded-lg p-6 w-96 relative">
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 rounded-lg text-white text-xl font-bold hover:bg-red-700"
        >
          <X />
        </button>
        {popupComponents[activePopup] || <div>Invalid pop-up type</div>}
      </div>
    </div>
  );
};

export default PopupManager;
