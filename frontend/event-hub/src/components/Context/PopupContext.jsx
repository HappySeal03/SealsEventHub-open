import React, { createContext, useState, useContext } from 'react';

const PopupContext = createContext();

export const usePopup = () => {
  return useContext(PopupContext);
};

export const PopupProvider = ({ children }) => {
  const [activePopup, setActivePopup] = useState(null);
  const [popupContent, setPopupContent] = useState('');

  const openPopup = (popupType, content) => {
    setActivePopup(popupType);
    setPopupContent(content);
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  return (
    <PopupContext.Provider value={{ activePopup, openPopup, closePopup, popupContent }}>
      {children}
    </PopupContext.Provider>
  );
};
