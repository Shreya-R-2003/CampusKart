import "./Chat.css";
import io from "socket.io-client";
import { useState,useEffect } from "react";
import ChatForm from "./ChatForm";

const socket = io.connect("http://localhost:8080");

function Chat() {
  const storedUsername = localStorage.getItem('username');
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [storedUsername]);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="Chat">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="User"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <ChatForm socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Chat;
