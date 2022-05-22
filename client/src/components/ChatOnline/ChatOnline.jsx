import React from 'react'
import '../../components/ChatOnline/ChatOnline.scss'

const ChatOnline = ({onlineUsers, currentUserId, setCurrentChat}) => {
    
    
    return (
        <div className='chatOnlineContainer'>
            <div className="chatOnlineFriend">
                <div className="chatOnlineAvatarContainer">
                    <img 
                    className='chatOnlineAvatar'
                    src="https://sun3-17.userapi.com/s/v1/ig2/2hkp8CYy6PGKKYLQNz5OxWucPBEHS2U7eAlK2H9fMjPgf1dd6Ml1ayGrvUYN1UOYdFUDggyaemYjFJ7l-hp8K91H.jpg?size=200x200&quality=95&crop=1,0,734,734&ava=1"
                    alt=""
                    />
                    <div className="chatOnlineBadge" />
                </div>    
                <span className="chatOnlineName">Danil Safronov</span>
            </div>            
        </div>
    );
}

export default ChatOnline;
