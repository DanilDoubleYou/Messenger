import "./Message.scss"
import React from 'react';
import {format} from "timeago.js"

const Message = ({message, own}) => {
    return (
            <div className={own ? "message own" : "message"}>
                <div className="messageTop">
                    <img 
                    className="message-avatar"
                    src="https://sun3-17.userapi.com/s/v1/ig2/2hkp8CYy6PGKKYLQNz5OxWucPBEHS2U7eAlK2H9fMjPgf1dd6Ml1ayGrvUYN1UOYdFUDggyaemYjFJ7l-hp8K91H.jpg?size=200x200&quality=95&crop=1,0,734,734&ava=1"
                    alt=""
                    />
                    <p className="message-content"> {message.text} </p>
                    
                </div>
                <div className="messageBottom"> {format(message.createdAt)} </div>
            </div>
            );
}

export default Message;
