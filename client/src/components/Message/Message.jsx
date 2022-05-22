import "./Message.scss"
import React, { useState, useEffect } from 'react'
import axios from "axios"
import TimeAgo from 'timeago-react'

const Message = ({message, own}) => {

    const [sender, setSender] = useState(null)
    const [avatar, setAvatar] = useState("")

    //useEffect(() => {
        //
        //const getSender = async () => {
        //    try{
        //        const res = await axios("/api/user?userId="+message.sender)
        //        setSender(res.data)
        //        localStorage.setItem(message.sender, sender.avatar)
        //    } catch (e) {
        //        console.error(e)
        //    }
        //}
        //
        //setAvatar(localStorage.getItem(message.sender))
        //console.log(sender)
    //}, [message])

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
