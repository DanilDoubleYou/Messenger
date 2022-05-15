import React, {useContext} from 'react'
import { authContext } from '../../context/AuthContext'
import "./Navbar.scss"

const Navbar = () => {
    const {logout, isLogin} = useContext(authContext)

    return (
        <nav>
            <div className="nav-wrapper navbar blue">
                <a href="/chat" className="brand-logo">Чат</a>
                {
                    isLogin 
                    ?   <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/" onClick={logout}>Выйти</a></li>
                        </ul>
                    :   <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/">Войти</a></li>
                        </ul>
                }
            </div>
        </nav>   
    )
}

export default Navbar
