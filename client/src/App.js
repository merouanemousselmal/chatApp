import React, { useState } from "react";
import Chat from "./Chat";
import io from "socket.io-client";
const socket = io.connect("https://chat-app-back-five.vercel.app");

const App = () => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <>
      {!showChat ? (
        <div className="bg-[#1d614a] rounded-2xl p-8 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center gap-4 mt-6 text-center">
          <h2 className="text-white font-semibold text-3xl">Join the chat</h2>
          <div className="flex flex-col gap-4">
            <input
              className="p-1 rounded-lg outline-none"
              type="text"
              placeholder="mousselmal merouane"
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
            <input
              className="p-1 rounded-lg outline-none"
              type="text"
              placeholder="room"
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button
              className="bg-[#34c676] text-white p-1 rounded-full"
              onClick={joinRoom}
            >
              JOIN THE ROOM
            </button>
          </div>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room} />
      )}
    </>
  );
};

export default App;
