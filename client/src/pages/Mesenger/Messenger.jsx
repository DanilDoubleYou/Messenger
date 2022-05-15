import React from 'react';
import Conversations from '../../components/Conversations/Conversations';
import "./Messenger.scss"
import Message from '../../components/Message/Message'
import sendButton from '../../assets/images/sendButton.png'
import ChatOnline from '../../components/ChatOnline/ChatOnline';
const Messenger = () => {
    return (
        <div className="messenger">
            <div className="blank" />
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder='Search for friends' className="chatMenuInput" type="text"></input>
                    <Conversations />
                    <Conversations />
                    <Conversations />
                    <Conversations />
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                    <Message />
                    <Message own={true}/>
                    <Message />
                    <Message />
                    <Message own={true}/>
                    <Message own={true}/>
                    <Message />
                    <Message />
                    <Message />
                    <Message own={true}/>
                    <Message />
                    <Message />
                    <Message own={true}/>
                    <Message own={true}/>
                    <Message />
                    <Message />
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatBoxMessageInput" placeholder='Напишите сообщение...' />
                        <button className="chatBoxSubmitButton"><img className='chatBoxSubmitButton' src={sendButton} /></button>
                    </div>
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                </div>
            </div>
            <div className="blank" />
        </div>

    );
}

export default Messenger;