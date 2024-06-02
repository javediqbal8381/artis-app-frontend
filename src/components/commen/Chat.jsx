import React, { useEffect, useRef, useState } from "react";
import { usersApi } from "../../redux/api/userApi";
import { AudioRecorder } from "react-audio-voice-recorder";
import { BsRecordCircle } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { Button } from "@mui/material";
import { FiX } from "react-icons/fi";



const Chat = ({ isOpen, setIsOpen, shopId }) => {
  const [messages, setMessages] = useState([]);

  const [value, setValue] = useState('');
  const [arivalMessage, setArivalMessage] = React.useState(null);
  const [receiverId, setReciverId] = useState(null)
  const [conversationId, setConversationId] = useState(null);
  const [messageType, setMessageType] = React.useState('text')

  const userId = localStorage.getItem('userId');


  const { isError, isLoading, data } = usersApi.useGetUserConversationQuery(userId);
  const [createCoversation,] = usersApi.useCreateUserConversationMutation();
  const [createMessage,] = usersApi.useCreateConversationMessageMutation();
  const [getConversationMessages, { data: conversationMessages, isLoading: isLoadingMessages, isError: isMessagesError }] = usersApi.useLazyGetConversationMessagesQuery()


  useEffect(() => {
    if (conversationMessages) {
      setMessages(conversationMessages)
    }
  }, [conversationMessages])


  useEffect(() => {
    if (data) {
      const intervalId = setInterval(() => {
        const conversation = data.filter(d => {
          if (d.members.includes(userId) && d.members.includes(shopId)) {
            return d
          }
        });
        if (conversation.length > 0) {
          // user has already conversation with the shop
          getConversationMessages(conversation[0]._id)
          setConversationId(conversation[0]._id)
          const id = conversation[0].members.find(m => m !== userId)
          id && setReciverId(id);
        }
        else {
          // create conversation
          createCoversation({
            receiverId: shopId,
            senderId: userId,
          })
        }
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [data, isLoading, isError])


  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async (message) => {
    if(value === "") {
      return
    }
    if (messageType == "audio") {
      const audioLink = await uploadAudio(value);
      setValue("")
      const msgData = {
        sender: userId,
        text: audioLink,
        conversationId: conversationId,
        type: messageType,
      }
      if (conversationId) {
        createMessage(msgData);
        const date = new Date
        setMessages((prev) => [...prev, {
          ...msgData,
          createdAt: date.toLocaleString(),
        }])
      }
    } else {
      const msgData = {
        sender: userId,
        text: value,
        conversationId: conversationId,
        type: messageType,
      }
      if (conversationId) {
        createMessage(msgData);
        const date = new Date
        setMessages((prev) => [...prev, {
          ...msgData,
          createdAt: date.toLocaleString(),
        }])
      }
    }
    setValue("")
    setMessageType("text");
  };

  React.useEffect(() => {
    if (arivalMessage && data && data.length > 0 && data[0]?.members.includes(arivalMessage.sender)) {
      setMessages((prev) => [...prev, arivalMessage])
    }
  }, [arivalMessage, data])

  const addAudioElement = (blob) => {
    setValue(blob)
  };

  const uploadAudio = async (audio) => {
    const data = new FormData();
    data.append("file", audio);
    data.append(
      "upload_preset",
      import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("cloud_name", import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "ArtisanMarketPlace");

    try {
      setValue("")
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME}/video/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      // Assuming you want to set the URL of the uploaded audio file
      return res.secure_url;
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  console.log(isLoadingMessages, messages.length);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 chat_component">
      <div className="bg-lb rounded-3xl min-w-96 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Chat</h2>
          <FiX
            onClick={toggleChat}
            style={{ color: "white", cursor: "pointer" }}
          />

        </div>
        <div className="overflow-y-scroll max-h-72 min-h-[200px]">
          { isLoadingMessages && !isMessagesError && (
            <div className="flex justify-center items-center h-full">
                  <div className="rounded-full h-12 w-fit">
                Loading Messages
              </div>
            </div>
          )

          }
          {
            !isLoadingMessages && messages.length === 0 && (
              <div className="flex justify-center items-center h-full">
                  <div className="rounded-full h-12 w-fit">
                  No Messages Found
                </div>
              </div>
            )
          }
          {messages.length > 0 && messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender !== userId ? 'justify-normal' : 'justify-end'}`}
            >
              <div
                className={`p-2 rounded-lg w-72 mb-2 
                 ${message.sender !== shopId ? "bg-white text-db self-end" : "bg-db text-white"}`}
              >
                {
                  message.type == "audio" ?
                    <audio className="w-64" src={message.text} controls={true}>

                    </audio>
                    :
                    <p className="text-lg">{message.text}</p>
                }

                <p className="text-xs text-gray-500">{new Date(message.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center p-2">
          {messageType === 'text' ?
            <>
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full border rounded-md p-2"
                onChange={e => { setValue(e.target.value); setMessageType('text') }}
                value={value}
              />
              <FaMicrophone onClick={() => setMessageType('audio')} />
            </>
            :
            <div className="flex items-center gap-2">
              <AudioRecorder
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true,
                }}
                // downloadOnSavePress={true}
                downloadFileExtension="webm"
              />
              <button className="normal_btn" onClick={() => { setMessageType('text'); setValue("") }} >cancel</button>

            </div>
          }
          <button onClick={sendMessage} className=" normal_btn ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
