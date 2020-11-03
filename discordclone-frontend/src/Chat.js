import React from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CradGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmoticonsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { useState } from "react";
import { useEffect } from "react";
// importing the db & other components from firebase if it's hosted in firebase...
import db from "./firebase";
import firebase from "firebase";
import axios from "./axios";
import Pusher from "pusher-js";

// For Mongo
const pusher = new Pusher("9ce3e934f0eeb3e92ff8", {
  cluster: "ap2",
});

const Chat = () => {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // MONGO
  const getConversation = (channelId) => {
    if (channelId) {
      axios.get(`/get/conversation?id=${channelId}`).then((res) => {
        setMessages(res.data[0].conversation);
      });
    }
  };
  // using react-hooks...
  useEffect(() => {
    //  for storing messages...
    //
    //  FIREBASE..//
    // if (channelId) {
    //   db.collection("channels")
    //     .doc(channelId)
    //     .collection("messages")
    //     .orderBy("timestamp", "desc")
    //     .onSnapshot((snapshot) => {
    //       setMessages(snapshot.docs.map((doc) => doc.data()));
    //     });
    // }

    // MONGO....
    getConversation(channelId);

    // pusher

    const channel = pusher.subscribe("conversation");
    channel.bind("newMessage", function (data) {
      // alert(JSON.stringify(data));
      getConversation(channelId);
    });
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    // FIREBASE
    // db.collection("channels").doc(channelId).collection("messages").add({
    //   message: input,
    //   user: user,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //   // timestamp to avoid time conflicts in various zones fo world...
    // });

    // MONGO;
    axios.post(`/new/message?id = ${channelId}`, {
      message: input,
      timestamp: Date.now(),
      user: user,
    });

    // this would clean the interface everytime it's called
    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {messages.map((message) => {
          console.log(message);
        })}
        {messages.map((message) => (
          <Message
            message={message.message}
            timestamp={message.timestamp}
            user={message.user}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            type="text"
            disabled={!channelId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button
            className="chat__inputButton"
            onClick={sendMessage}
            disabled={!channelId}
            type="submit"
          >
            Send Message
          </button>
        </form>

        <div className="chat__inputIcon">
          <CradGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmoticonsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
