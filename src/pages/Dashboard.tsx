import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/icon.svg";

interface LocationState {
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const userName = state?.name || "User";
  const userEmail = state?.email || "email@example.com";

  const [notes, setNotes] = useState<string[]>([]);
  const [showNoteBox, setShowNoteBox] = useState(false); // toggle note box
  const [noteContent, setNoteContent] = useState(""); // note input

  const handleSignOut = () => {
    navigate("/"); // Navigate to login page
  };

  const handleAddNote = () => {
    if (noteContent.trim() === "") return;
    setNotes([...notes, noteContent.trim()]);
    setNoteContent("");
    setShowNoteBox(false); // close box after adding
  };

  const handleDeleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="flex flex-col items-center h-screen w-screen bg-white relative">
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
            <p className="text-black text-2xl font-bold">
              Welcome, {userName}!
            </p>
            <p className="text-black mt-2">Email: {userEmail}</p>
          </div>

          {/* Create Note Button */}
          <div>
            <button
              onClick={() => setShowNoteBox(true)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Create Note
            </button>
          </div>

          {/* Note Input Box Modal */}
          {showNoteBox && (
            <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg w-full max-w-md shadow-lg p-6 md:p-8">
                <h3 className="text-lg font-semibold mb-3">New Note</h3>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Type your note here..."
                  className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={5}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowNoteBox(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddNote}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notes List */}
          <div>
            <h2 className="text-lg font-semibold mt-4">Notes</h2>
            <div className="mt-3 space-y-3">
              {notes.length === 0 && (
                <p className="text-gray-500">No notes yet.</p>
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
