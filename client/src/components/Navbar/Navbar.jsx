import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { authContext } from '../../context/AuthContext'
import "./Navbar.scss"

const Navbar = () => {
    const {logout, isLogin, userId} = useContext(authContext)
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {

        const getUser = async () => {
            try{
                const res = await axios("/api/user?userId="+userId)
                setUserInfo(res.data)

                if(!localStorage.getItem(userId)) localStorage.setItem(userId, res.data?.avatar)
            } catch (e) {
                console.error(e)
            }

        }
        getUser()
    }, [userId])

    return (
        <nav>
            <div className="nav-wrapper navbar blue">
                <a href="/chat" className="brand-logo">Чат</a>
                {
                    isLogin 
                    ?
                    <>   
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li> <a href="/" onClick={logout}>Выйти</a> </li>
                        </ul>
                        <placeholder className="right hide-on-med-and-down nav-bar-name"> {userInfo?.lastName + ' ' + userInfo?.firstName} </placeholder>
                        <img className="right hide-on-med-and-down nav-bar-avatar" src={localStorage.getItem(userId)}/>
                    </>
                    :
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/">Войти</a></li>
                        </ul>
                }
            </div>
        </nav>   
    )
}

export default Navbar
