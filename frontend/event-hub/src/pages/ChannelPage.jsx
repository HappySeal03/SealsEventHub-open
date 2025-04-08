import React from 'react';
import { useLocation } from 'react-router-dom';
import '../index.css';
import InfoHeader from '../components/InfoHeader';
import Announcements from '../components/Announcements';
import EvenstList from '../components/EventsList';

const ChannelPage = () => {

    const {state} = useLocation();
    const { name, description, channel_id } = state;

  return (
    <>
      <InfoHeader title={name} description={description} />
      <Announcements channel_id={channel_id}/>
      <EvenstList list_title={"Active events"} />
      <EvenstList list_title={"Upcoming events"} />
      <EvenstList list_title={"Past events"} />
    </>
  )
}

export default ChannelPage