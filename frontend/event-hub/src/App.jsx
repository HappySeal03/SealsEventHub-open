import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Channels from './pages/Channels';
import ChannelPage from './pages/ChannelPage';
import Teams from './pages/Teams';
import Inbox from './pages/Inbox';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import PopupManager from './components/PopupManager';
import LandingPage from './pages/LandingPage';
import EventPage from './pages/EventPage';
import { AuthProvider } from './components/Context/AuthContext';

const App = () => {
  const [activePopup, setActivePopup] = useState(null);

  const openPopup = (popupType) => {
    setActivePopup(popupType);
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar openPopup={openPopup} />
        <div>
          {activePopup && <PopupManager activePopup={activePopup} closePopup={closePopup} />}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/channels" element={<Channels />} />
            <Route path="/channels/:channel_id" element={<ChannelPage />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/event/:eventId" element={<EventPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
