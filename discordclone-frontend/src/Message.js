import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";

const Message = ({ timestamp, user, message }) => {
  return (
    <div className="message">
      <Avatar src={user.photo} />
      <div className="message__info">
        <h4>
          {user.displayName}
          <span className="message__timestamp">
            {/* for adding date when chat put... */}
            {/* firebase */}
            {/* {new Date(timestamp?.toDate()).toUTCString()} */}

            {/* Mongo */}
            {new Date(parseInt(timestamp)).toDateString()}
          </span>
        </h4>

        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
