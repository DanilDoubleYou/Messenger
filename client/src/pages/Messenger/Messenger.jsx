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
                if(currentChat) {
                    const res3 = await axios.get("/api/user?userId="+(currentChat.members.find((m) => m !== userId)))
                    setCurrentChatUser(res3.data)
                }
                const res = await axios.get("/api/conversation/"+userId)
                setConversations(res.data)
                const res2 = await axios.get("/api/message/"+currentChat?._id)
                setMessages(res2.data)
            } catch(e){
                console.error(e)
            }
        }
        getData();
      }, [userId, currentChat])

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
                    <div className="chatBoxInfoWrapper"> ???????????????? ?????????????? </div>
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
                                <img className="currentChatUserAvatar" src={localStorage.getItem(currentChatUser?._id)} />
                            </div>
                            <div className="chatBoxInfoName">
                                {currentChatUser ? currentChatUser?.lastName + " " + currentChatUser?.firstName : ""}
                            </div>
                        </div>
                        <div className="chatBoxTop">
                            {messages.length !== 0 ? messages.map(m=>(
                                <div ref={scrollRef}>
                                    <Message 
                                    message={m} 
                                    own={m.sender === userId}
                                    />
                                </div>
                            ))
                        :
                        <> <span className="noConversation"> ?????? ?????????????????? </span> </>
                        }
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className="chatBoxMessageInput" 
                            placeholder='???????????????? ??????????????????...' 
                            onChange={(e)=>setNewMessage(e.target.value)}
                            value={newMessage}
                            />
                            <button className="chatBoxSubmitButton" onClick={handleSubmit}><img className='chatBoxSubmitButton' src={sendButton} /></button>
                        </div>
                    </> 
                    : 
                    <span className="noConversation"> ???????????????? ?????? ?????????? ???????????? ?????????????? </span>}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <div className="chatBoxInfoWrapper">?????? ????????????????????????</div> 
                    <ChatOnline onlineUsers={onlineUsers} currentUserId={userId} setCurrentChat={setCurrentChat}/>
                </div>
            </div>
            <div className="blank" />
        </div>

    );
}

export default Messenger;