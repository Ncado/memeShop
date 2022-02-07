import React, { useEffect, useContext, useRef, useState } from 'react';
import axios from "axios";
import { AuthContext } from '../../context/AuthContext'
import {useDispatch, useSelector} from "react-redux"


import io from 'socket.io-client'



 let socket = io('http://localhost:5000/');


export const ChatPageIo = ({roomId}) => {

	const dispatch = useDispatch()
	const test = useSelector(state => state.messageCount)
	console.log(test)

	const addRoomCount = () =>{
		dispatch({type: "INCREMENT_ROOM_COUNT", payload: 1})

	}

	const addComentCount = () =>{
		dispatch({type: "INCREMENT_MESSAGE_COUNT", payload: 1})
	}

	const [username, setUsername] = useState(JSON.parse(localStorage.getItem('userData')).userName);
	const [room, setRoom] = useState(roomId);
	const [showChat, setShowChat] = useState(false);
	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);

	

	const joinRoom = () => {
	  if (username !== "" && room !== "") {
		socket.emit("join_room", room);
		setShowChat(true);
		addRoomCount();
	  }
	  
	};
	const sendMessage = async () => {
		if (currentMessage !== "") {
		  const messageData = {
			room: room,
			author: username,
			message: currentMessage,
			time:
			  new Date(Date.now()).getHours() +
			  ":" +
			  new Date(Date.now()).getMinutes(),
		  };
	
		  await socket.emit("send_message", messageData);
		  setMessageList((list) => [...list, messageData]);
		  setCurrentMessage("");
		  addComentCount();
		}
		
	  };
	
	  useEffect(() => {
		socket.on("receive_message", (data) => {
		  setMessageList((list) => [...list, data]);
		});
	  }, [socket]);

	return (
	  <div className="App">
		{!showChat ? (
		  <div className="joinChatContainer">
			<h3>Join A Chat</h3>
			{/* <input
			  type="text"
			  placeholder="Room ID..."
			  onChange={(event) => {
				setRoom(event.target.value);
			  }}
			/> */}
			<button onClick={joinRoom}>Join A Room</button>
		  </div>
		) : (
			<div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <div className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                  
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}||{messageContent.author}: {messageContent.message}</p>
                  
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
			
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
		)}
	  </div>
	);
}