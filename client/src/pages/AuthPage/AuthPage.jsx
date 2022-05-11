import React from 'react'
import { BrowserRouter , Switch, Route, Link } from 'react-router-dom'

import "./AuthPage.scss"

const Authpage = () => {
    return (
        <BrowserRouter>
            <Switch>
                <React.Fragment>
                    <div className="container">
                        <div className="auth-page">
                            <Route path="/login/">
                            <h3>Авторизация</h3>
                            <form className='form form-login'>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input
                                            type="email"
                                            name="email"
                                            className='validate' />
                                        <label htmlFor="email">Почта</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input
                                            type="password"
                                            name="password"
                                            className='validate' />
                                        <label htmlFor="password">Пароль</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <button
                                        className='wawes-effect wawes-light btn blue'>
                                        Войти
                                    </button>

                                    <a href="/registration" className="btn-outline btn-reg">Еще нет аккаунта?</a>
                                </div>
                            </form>
                            </Route>
                            <Route path="/registration/">
                            <h3>Регистрация</h3>
                            <form className='form form-login'>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input 
                                            type="text" 
                                            name="firstName"
                                            className='validate'
                                        />
                                    <label htmlFor="name">Имя</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input 
                                            type="text" 
                                            name="lastName"
                                            className='validate'
                                        />
                                    <label htmlFor="surname">Фамилия</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input 
                                            type="email" 
                                            name="email"
                                            className='validate'
                                        />
                                    <label htmlFor="email">Почта</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input 
                                            type="password" 
                                            name="password"
                                            className='validate'
                                        />
                                    <label htmlFor="password">Пароль</label>
                                    </div>
                                </div>
                        
                                <div className="row">
                                    <button
                                    className='wawes-effect wawes-light btn blue'>
                                        Зарегистрироваться
                                    </button>
                        
                                    <a href="/login" className="btn-outline btn-reg">Уже есть аккаунт?</a>
                                </div>
                            </form>
                            </Route>
                        </div>
                    </div>
                </React.Fragment>
            </Switch>
        </BrowserRouter>
    );
}
export default Authpage;
