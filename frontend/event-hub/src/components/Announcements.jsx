import React from 'react';
import '../index.css';
import AnnouncementCard from './AnnouncementCard';

//Test Data, swap with function to fetch the real data later
const announcements = [
  { id: 1, body: '# Announcement 1\nThis is the body of the first announcement in **markdown** format.' },
  { id: 2, body: '## Announcement 2\nThis is the body of the second announcement in **markdown** format.' },
  { id: 3, body: '### Announcement 3\nThis is the body of the third announcement in **markdown** format.' },
  { id: 4, body: '#### Announcement 4\nThis is the body of the fourth announcement in **markdown** format.' },
  { id: 5, body: '##### Announcement 5\nThis is the body of the fifth announcement in **markdown** format.' },
];

const Announcements = () => {
  return (
    <div className="bg-gray-900 text-white p-4">
        <h1 className='text-2xl font-semibold'>Announcements</h1>
        <hr className="my-4 border-t-2 border-gray-500" />
        <div className="flex overflow-x-auto space-x-4 pb-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="flex-shrink-0 w-full sm:w-80 md:w-96 lg:w-1/3 xl:w-1/4">
            <AnnouncementCard body={announcement.body} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
