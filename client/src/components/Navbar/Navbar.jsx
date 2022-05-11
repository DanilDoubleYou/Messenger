import React from 'react'
import "./Navbar.scss"

const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper navbar blue">
                <a href="/" className="brand-logo">MERN Чат</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="/login">Войти</a></li>
                </ul>
            </div>
        </nav>   
    )
}

export default Navbar
