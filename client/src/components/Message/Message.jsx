import "./Message.scss"
import React from 'react';

const Message = ({own}) => {
    return (
            <div className={own ? "message own" : "message"}>
                <div className="messageTop">
                    <img 
                    className="message-avatar"
                    src="https://sun3-17.userapi.com/s/v1/ig2/2hkp8CYy6PGKKYLQNz5OxWucPBEHS2U7eAlK2H9fMjPgf1dd6Ml1ayGrvUYN1UOYdFUDggyaemYjFJ7l-hp8K91H.jpg?size=200x200&quality=95&crop=1,0,734,734&ava=1"
                    alt=""
                    />
                    <p className="message-content"> lor Loressm ipsum dolor sit amet consectetur adipisicing elit. Cum, doloremque nostrum eligendi perferendis natus aperiam iste possimus corporis eos dicta aut illo veniam totam ipsa delectus ab debitis voluptatibus aliquid. </p>
                    
                </div>
                <div className="messageBottom"> 45 minutes ago </div>
            </div>
            );
}

export default Message;
