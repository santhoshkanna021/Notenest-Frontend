import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/icon.svg";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // State to store notes
  const [notes, setNotes] = useState<string[]>([]);

  // Sign out handler
  const handleSignOut = () => {
    navigate("/"); // Navigate to home/login page
  };

  // Create new note
  const handleCreateNote = () => {
    const newNote = prompt("Enter your note:"); // Ask user for note content
    if (newNote && newNote.trim() !== "") {
      setNotes([...notes, newNote.trim()]); // Add note to state
    }
  };

  // Delete a note by index
  const handleDeleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="flex flex-col items-center h-screen w-screen bg-white">
      
      {/* Header */}
      <div className="flex items-center justify-between w-full px-6 py-4 bg-white shadow-md">
        <div className="flex items-center space-x-5">
          <img src={Logo} alt="logo" className="h-6" />
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>

        <button
          onClick={handleSignOut}
          className="text-lg text-blue-500 rounded hover:underline"
        >
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">

          {/* User Info */}
          <div className="p-12 shadow-2xl rounded-2xl bg-white">
            <p className="text-black text-2xl font-bold">Welcome, Jonas Kahnwald!</p>
            <p className="text-black mt-2">Email: xxxxx@xxx.com</p>
          </div>

          {/* Create Note Button */}
          <div>
            <button
              onClick={handleCreateNote}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Create Note
            </button>
          </div>

          {/* Notes List */}
          <div>
            <h2 className="text-lg font-semibold mt-10">Notes</h2>
            <div className="mt-5 space-y-5">
              {notes.length === 0 && (
                <p className="text-gray-500"></p>
              )}
              {notes.map((note, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-white rounded shadow-md"
                >
                  <span>{note}</span>
                  <button
                    onClick={() => handleDeleteNote(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    ⋮
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
