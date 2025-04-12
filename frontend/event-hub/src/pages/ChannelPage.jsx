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
      <EvenstList list_title={"Ongoing events"} channel_id={channel_id} status={"ongoing"} />
      <EvenstList list_title={"Upcoming events"} channel_id={channel_id} status={"upcoming"} />
      <EvenstList list_title={"Past events"} channel_id={channel_id} status={"completed"} />
    </>
  )
}

export default ChannelPage