import React, {useContext, useEffect, useRef, useState} from 'react';
import Conversations from '../../components/Conversations/Conversations';
import "./Messenger.scss"
import Message from '../../components/Message/Message'
import sendButton from '../../assets/images/sendButton.png'
import ChatOnline from '../../components/ChatOnline/ChatOnline';
import { authContext } from '../../context/AuthContext';
import axios from 'axios';

const Messenger = () => {
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [conversations, setConversations] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const {userId} = useContext(authContext)
    const scrollRef = useRef()
    
    useEffect(() => {
        const getData = async () => {
            try{
                const res = await axios.get("/api/conversation/"+userId)
                setConversations(res.data)
            } catch(e){
                console.error(e)
            }
        }
        getData();
      }, [userId])

      useEffect(() => {
        const getMessages = async () => {
            try{
                if(currentChat){
                    const res = await axios.get("/api/message/"+currentChat?._id)
                    setMessages(res.data)
                }
            } catch (e) {
                console.error(e)
            }
        }
        getMessages()
      }, [currentChat])

      const handleSubmit = async (e) => {
          //e.preventDefault()
            const message = {
                sender: userId,
                text: newMessage,
                conversationId: currentChat._id
            }

            try{
                const res = await axios.post("/api/message", message)
                setMessages([...messages, res.data])
                setNewMessage("")
            } catch(e) {
                console.error(e)
            }
        }

    useEffect(() => {
      scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    return (
        <div className="messenger">
            <div className="blank" />
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder='Search for friends' className="chatMenuInput" type="text"></input>
                    {conversations.map(c=>(
                        <div onClick={() =>setCurrentChat(c)}>
                            <Conversations conversation={c} currentUserId={userId}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {currentChat ? <>
                    <div className="chatBoxTop">
                        {messages.map(m=>(
                            <div ref={scrollRef}>
                                <Message message={m} own={m.sender === userId} pictureUrl={m.sender}/>
                            </div>
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatBoxMessageInput" 
                        placeholder='Напишите сообщение...' 
                        onChange={(e)=>setNewMessage(e.target.value)}
                        value={newMessage}
                        />
                        <button className="chatBoxSubmitButton" onClick={handleSubmit}><img className='chatBoxSubmitButton' src={sendButton} /></button>
                    </div></> : <span className="noConversation"> Open a conversation to start a chat</span> }
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                </div>
            </div>
            <div className="blank" />
        </div>

    );
}

export default Messenger;