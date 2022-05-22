import "./Message.scss"
import React from 'react'
import TimeAgo from 'timeago-react'

const Message = ({message, own}) => {

    return (
            <div className={own ? "message own" : "message"}>
                <div className="messageTop">
                    <img 
                    className="message-avatar"
                    src={localStorage.getItem(message.sender)}
                    alt=""
                    />
                    <p className="message-content"> {message.text} </p>
                    
                </div>
                <TimeAgo 
                className="messageBottom"
                datetime={message.createdAt}
                />
            </div>
            );
}

export default Message;
