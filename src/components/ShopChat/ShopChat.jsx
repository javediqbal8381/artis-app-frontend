import React, { useEffect, useRef, useState } from "react";
import { usersApi } from "../../redux/api/userApi";
import { BsRecordCircle } from "react-icons/bs";
import { AudioRecorder } from "react-audio-voice-recorder";
import { FaMicrophone } from "react-icons/fa";
import { Button } from "@mui/material";
import { FiX } from "react-icons/fi";



const ShopChat = ({ isOpen, setIsOpen, shopId }) => {
  const [messages, setMessages] = useState([]);

  const [value, setValue] = useState('');
  const [arivalMessage, setArivalMessage] = React.useState(null);
  const [receiverId, setReciverId] = useState(null);
  const [messageType, setMessageType] = React.useState('text')


  const { isError, isLoading, data } = usersApi.useGetUserConversationQuery(shopId);
  const [createMessage,] = usersApi.useCreateConversationMessageMutation();
  const [getConversationMessages, { data: conversationMessages, isLoading: isLoadingMessages, isError: isMessagesError }] = usersApi.useLazyGetConversationMessagesQuery();
  const [conversationId, setConversationId] = useState(null)


  useEffect(() => {
    if (conversationMessages) {
      setMessages(conversationMessages)
    }
  }, [conversationMessages])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (data) {
        const conversation = data.filter(d => {
          if (d.members.includes(shopId)) {
            return d;
          }
        });
        if (conversation.length > 0) {
          if (!conversationId) {
            setConversationId(conversation[0]._id);
          }
          // user has already conversation with the shop
          if (conversationId) {
            getConversationMessages(conversationId);
            const id = conversation[0].members.find(m => m !== shopId);
            id && setReciverId(id);
          }
        }
      }
    }, 3000); // 3000 milliseconds = 2 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);

  }, [data, isLoading, isError, conversationId])


  const toggleChat = () => {
    setIsOpen(!isOpen);
  };


  React.useEffect(() => {
    if (arivalMessage && data && data.length > 0 && data[0]?.members.includes(arivalMessage.sender)) {
      setMessages((prev) => [...prev, arivalMessage])
    }
  }, [arivalMessage, data])

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

  const sendMessage = async (message) => {
    if(value === "") {
      return
    }
    if (messageType === "audio") {
      const audioLink = await uploadAudio(value);

      const msgData = {
        sender: shopId,
        text: audioLink,
        conversationId: conversationId,
        type: messageType,

      }
      if (conversationId) {
        createMessage(msgData)
        const date = new Date
        setMessages((prev) => [...prev, {
          ...msgData,
          createdAt: date.toLocaleString(),
        }])
      };
    } else {
      const msgData = {
        sender: shopId,
        text: value,
        conversationId: conversationId,
        type: messageType,

      }
      if (conversationId) {
        createMessage(msgData)
        const date = new Date
        setMessages((prev) => [...prev, {
          ...msgData,
          createdAt: date.toLocaleString(),
        }])
      };
    }
    setValue("")

    setMessageType("text")
  };

  const addAudioElement = (blob) => {
    setValue(blob)
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 chat_component">
      <div className="bg-lb rounded-3xl min-w-96 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">ShopChat</h2>
          <FiX
            onClick={toggleChat}
            style={{ color: "white", cursor: "pointer" }}
          />
        </div>
        <div className="flex">
          <div className="overflow-y-scroll max-h-72 min-h-[200px] p-4 md:w-[200px] bg-white">
            {
              data?.map(d => {
                return (
                  <div onClick={() => setConversationId(d._id)} key={d._id} className="flex items-center mb-2 cursor-pointer hover:bg-db justify-start p-2 rounded-lg transition-all">
                    <img src='/images/images.jpeg' className="w-10 h-8 rounded-full" />
                    <div className="ml-2">
                      <p className="text-lg font-bold">{d.username}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="overflow-y-scroll max-h-72 min-h-[200px] md:w-[400px] p-2">
            {isLoadingMessages && !isMessagesError && (
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
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender !== shopId ? 'justify-normal' : 'justify-end'}`}
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

export default ShopChat;
