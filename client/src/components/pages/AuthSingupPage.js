import React, {useState} from 'react';
import '../styles/auth.css'
import {useCookies} from "react-cookie";

const AuthSingupPage = (props) => {
    let [email, setEmail] = useState('')
    let [pass, setPass] = useState('')
    let [username, setUsername] = useState('')
    const [cookies, setCookie] = useCookies();

    // getting user jwt
    let jwt = cookies['jsonwebtoken'];

    const nextButton = () => {
        const payload = {
            email,
            password: pass,
            username
        }

        if ((2 > email.length > 32) || (!email.includes('@'))) return document.location.href = '/alert/Ошибка/Проверьте введенный email'
        if (pass.length < 2) return document.location.href = '/alert/Ошибка/Проверьте введенный пароль'
        if (username.length < 2) return document.location.href = '/alert/Ошибка/Проверьте введенный username'

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };

        fetch(window.env.API_URL + 'users/registration', requestOptions)
            .then(response => response.text())
            .then((data) => {
                // data -> jwt token
                if (data.includes('повторяющееся значение')) return document.location.href = '/alert/Ошибка/Аккаунт с таким email уже существует'
                setCookie('jsonwebtoken', data, {
                    path: '/',
                    maxAge: 36000,
                    secure: false
                })
                return document.location.href = '/alert/Успех/Вы зарегистрировались'
            })

        setEmail('')
        setPass('')
        setUsername('')
    }

    return (
        <div className="authloginpage">
            <h1>Регистрация</h1>

            <h4>Username</h4>
            <input type="text" className='forminput' value={username} onChange={event => setUsername(event.target.value)}/>

            <h4>Email</h4>
            <input type="email" className='forminput' value={email} onChange={event => setEmail(event.target.value)}/>

            <h4>Password</h4>
            <input type="password" className='forminput' value={pass} onChange={event => setPass(event.target.value)}/>

            <br/>


            <button className="button gg" onClick={nextButton}>Next</button>
        </div>
    );
};

export default AuthSingupPage;