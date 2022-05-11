import React, {useState} from 'react'
import { BrowserRouter , Switch, Route, Link } from 'react-router-dom'
import axios from 'axios'
import "./AuthPage.scss"



const Authpage = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]:event.target.value})
        console.log(form)
    }

    const registerHandler = async () => {
        try {
            await axios.post('/api/auth/registration', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })            
            .then(response => console.log(response))
        } catch (e)
        {
            console.error(e)
        }
    }
    return (
        <BrowserRouter>
            <Switch>
                <React.Fragment>
                    <div className="container">
                        <div className="auth-page">
                            <Route path="/login">
                                <h3>Авторизация</h3>
                                    <form className='form form-login' onSubmit={e => e.preventDefault()}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input
                                                    type="email"    
                                                    name="email"
                                                    className='validate'
                                                    onChange={changeHandler} />
                                                <label htmlFor="email">Почта</label>
                                            </div>
                                            <div className="input-field col s12">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className='validate'
                                                    onChange={changeHandler} />
                                                <label htmlFor="password">Пароль</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <button
                                                className='wawes-effect wawes-light btn blue'
                                                onClick={registerHandler}>
                                                Войти
                                            </button>

                                            <Link to="/registration" className="btn-outline btn-reg"> Еще нет аккаунта? </Link>
                                        </div>
                                    </form>
                            </Route>
                            <Route path="/registration">
                                <h3>Регистрация</h3>
                                    <form className='form form-login' onSubmit={e => e.preventDefault()}>
                                        <div className="row">
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
                                            </div>
                                            
                                            <div className="input-field col s12">
                                        <input 
                                            type="email" 
                                            name="email"
                                            className='validate'
                                            onChange={changeHandler}
                                        />
                                    <label htmlFor="email">Почта</label>
                                            </div>
                                            <div className="input-field col s12">
                                        <input 
                                            type="password" 
                                            name="password"
                                            className='validate'
                                            onChange={changeHandler}
                                        />
                                    <label htmlFor="password">Пароль</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <button
                                            className='wawes-effect wawes-light btn blue'
                                            onClick={registerHandler}>
                                                Зарегистрироваться
                                            </button>

                                            <Link className="btn-outline btn-reg" to="/login">Уже есть аккаунт?</Link>
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
