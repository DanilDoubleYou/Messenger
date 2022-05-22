import "./Conversations.scss"
import React, { useState, useEffect } from 'react'
import axios from "axios"

const Conversations = ({conversation, currentUserId}) => {

    const [friend, setFriend] = useState(null)
    
    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUserId)
        const getUser = async () => {
            try{
                const res = await axios("/api/user?userId="+friendId)
                setFriend(res.data)

                localStorage.setItem(res.data._id, res.data.avatar)
            } catch (e) {
                console.error(e)
            }
        }
        getUser()
    }, [currentUserId, conversation])

    return (
        <div className="conversation">
            <img className="conversation-avatar" 
            src={friend ? friend.avatar ? friend.avatar : "http://localhost:3000/images/user/noAvatar.png" : ""}
            alt="" />
            <span className="conversation-name"> { friend ? `${friend.firstName} ${friend.lastName}` : "" } </span>
        </div>
    );
}

export default Conversations;