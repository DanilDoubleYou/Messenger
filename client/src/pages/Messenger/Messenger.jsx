import React, {useContext, useEffect, useRef, useState} from 'react';
import Conversations from '../../components/Conversations/Conversations';
import "./Messenger.scss"
import Message from '../../components/Message/Message'
import sendButton from '../../assets/images/sendButton.png'
import ChatOnline from '../../components/ChatOnline/ChatOnline';
import { authContext } from '../../context/AuthContext';
import axios from 'axios';
import {io, Socket} from "socket.io-client"


const Messenger = () => {
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [conversations, setConversations] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [currentChatUser, setCurrentChatUser] = useState(null)
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setonlineUsers] = useState([])
    const {userId} = useContext(authContext)
    
    const scrollRef = useRef()

    const socket = useRef()

    useEffect(() => {

        const setUserAvatar = async () => {
            if (!localStorage.getItem(userId)){
                try{
                    const res = await axios("/api/user?userId="+userId)
                    console.log(res)
                    localStorage.setItem(userId, res.data.avatar)
                } catch(e){
                    console.error(e)
                }
            }
        }

        setUserAvatar();
    }, [])

    useEffect(() => {
        socket.current = io("ws://localhost:8000")
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
        
    }, [])

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socket.current.emit("addUser", userId)
        socket.current.on("getUsers", users => {
            setonlineUsers(users)
        })
    }, [userId])

    

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
                    const res2 = await axios.get("/api/user?userId="+(currentChat.members.find((m) => m !== userId)))
                    setCurrentChatUser(res2.data)
                }
            } catch (e) {
                console.error(e)
            }
        }

        getMessages()
      }, [currentChat])

      const handleSubmit = async (e) => {
          
            const message = {
                sender: userId,
                text: newMessage,
                conversationId: currentChat._id
            }

            const receiverId = currentChat.members.find(member => member !== userId)

            socket.current.emit("sendMessage", {
                senderId: userId,
                receiverId,
                text: newMessage
            })

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
    //
    return (
        <div className="messenger">
            <div className="blank" />
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    {/*
                     <input placeholder='Поиск' className="chatMenuInput" type="text"></input>
                    */}
                    {conversations.map(c=>(
                        <div onClick={() =>setCurrentChat(c)}>
                            <Conversations conversation={c} currentUserId={userId}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {currentChat 
                    ? 
                    <>
                        <div className="chatBoxInfoWrapper">
                            <div className="chatBoxInfoAvatar">
                                <img className="currentChatUserAvatar" src={currentChatUser?.avatar} />
                            </div>
                            <div className="chatBoxInfoName">
                                {currentChatUser?.lastName + " " + currentChatUser?.firstName}
                            </div>
                        </div>
                        <div className="chatBoxTop">
                            {messages.map(m=>(
                                <div ref={scrollRef}>
                                    <Message 
                                    message={m} 
                                    own={m.sender === userId}
                                    />
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
                        </div>
                    </> 
                    : 
                    <span className="noConversation"> Open a conversation to start a chat</span> }
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline onlineUsers={onlineUsers} currentUserId={userId} setCurrentChat={setCurrentChat}/>
                </div>
            </div>
            <div className="blank" />
        </div>

    );
}

export default Messenger;