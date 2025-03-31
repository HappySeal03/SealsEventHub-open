import React from 'react';
import { useLocation } from 'react-router-dom';
import '../index.css';

const ChannelPage = () => {

    const {state} = useLocation();
    const { name, description, channel_id } = state;

  return (
    <>
        <h1>This will become the Channel page for event with id ${channel_id}</h1>
        <h2>The Channel name is: {name}</h2>
        <h2>The Channel description is: {description}</h2>
    </>
  )
}

export default ChannelPage