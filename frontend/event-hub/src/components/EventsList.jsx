import React from 'react';
import '../index.css';

const EvenstList = ({list_title}) => {

  return (
    <div className="bg-gray-900 text-white p-4">
        <h1 className='text-2xl font-semibold'>{list_title}</h1>
        <hr className="my-4 border-t-2 border-gray-500" />
    </div>
  )
}

export default EvenstList