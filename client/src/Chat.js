import React, { useEffect, useState } from "react";

const Chat = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    const receiveMessage = (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    };

    socket.on("reseive_message", receiveMessage);

    return () => {
      socket.off("reseive_message", receiveMessage);
    };
  }, [socket]);

  return (
    <div className="bg-[#1d614a] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-between gap-4 mt-6 text-center w-[350px] h-[500px]">
      <div className="text-white text-2xl font-semibold p-1">
        <p>Live Chat</p>
      </div>
      <div className="bg-[#acefd9] mx-auto w-full h-full overflow-y-scroll ">
        {messageList.map((messageContent) => {
          return (
            <div className="flex flex-col" key={Math.random()}>
              <div className="bg-[#34c676] ">
                <p className="text-lg"> {messageContent.message}</p>
              </div>
              <div className="h-full text-gray-400 flex gap-2">
                <p>{messageContent.author}</p>
                <p>{messageContent.time}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="">
        <input
          className="p-2 border-1-[#000] outline-none"
          type="text"
          value={currentMessage}
          placeholder="hey..."
          required
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button
          className="bg-[#acefd9] p-2 font-semibold"
          onClick={sendMessage}
        >
          send
        </button>
      </div>
    </div>
  );
};

export default Chat;
