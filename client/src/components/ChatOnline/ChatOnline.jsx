import React, {useEffect, useState} from 'react'
import axios from 'axios'
import '../../components/ChatOnline/ChatOnline.scss'

const ChatOnline = ({onlineUsers, currentUserId, setCurrentChat}) => {
    
    const [allUsers, setAllUsers] = useState([])
    useEffect(() =>{
        const getAllUsers = async () => {
          const res = await axios.get("/api/user/all")
          setAllUsers(res.data.filter((user) => user._id !== currentUserId))
        }
        getAllUsers()
    }, [currentUserId, onlineUsers])

    const handleClick = async (userId) => {
         try {
            const res = await axios.get(`/api/conversation/find/${currentUserId}/${userId}`)
            setCurrentChat(res.data)
         } catch (e) {
             console.error(e)
         }
    }

    return (
        <div className='chatOnlineContainer'>
            {allUsers.map((user) => (
                <div className="chatOnlineFriend"
                onClick={() => handleClick(user._id)}
                >
                    <div className="chatOnlineAvatarContainer">
                        <img 
                        className='chatOnlineAvatar'
                        src={user.avatar}
                        alt=""
                        />
                        {user.isOnline ? <div className="chatOnlineBadge"/>: <></>}
                    </div>    
                    <span className="chatOnlineName">{user.lastName + ' ' + user.firstName}</span>
                </div>    
            ))}        
        </div>
    );
}

export default ChatOnline;
