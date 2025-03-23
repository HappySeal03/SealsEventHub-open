import { useState } from "react";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "System Update", content: "The system will be down for maintenance at midnight." },
    { id: 2, title: "Event Reminder", content: "Don't forget about the upcoming event this Friday!" },
  ]);
  
  const [newAnnouncement, setNewAnnouncement] = useState("");

  const postAnnouncement = () => {
    if (newAnnouncement.trim() !== "") {
      setAnnouncements([
        ...announcements,
        { id: announcements.length + 1, title: "New Announcement", content: newAnnouncement },
      ]);
      setNewAnnouncement("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Announcements</h1>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="p-4 bg-gray-900 text-white rounded-md shadow-md"
          >
            <p className="font-semibold">{announcement.title}:</p>
            <p>{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
