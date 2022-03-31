import React, {useState} from 'react';
import '../styles/auth.css'
import {useCookies} from "react-cookie";

const AuthLoginPage = (props) => {
    let [email, setEmail] = useState('')
    let [pass, setPass] = useState('')
    const [cookies, setCookie] = useCookies();

    // getting user jwt
    let jwt = cookies['jsonwebtoken'];


    const nextButton = () => {
        const payload = {
            email: email,
            password: pass
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };

        fetch('http://localhost:7000/' + 'users/login', requestOptions)
            .then(response => response.text())
            .then((data) => {
                // data -> jwt token
                if (data.includes('Wrong password')) return document.location.href = '/alert/Ошибка/Проверьте данные'
                if (data.includes('Cannot read properties')) return document.location.href = '/alert/Ошибка/Проверьте данные'
                setCookie('jsonwebtoken', data, {
                    path: '/',
                    maxAge: 36000,
                    secure: false
                })

                return document.location.href = '/alert/Успех/Вы авторизовались'
            })

        setEmail('')
        setPass('')
    }

    return (
        <div className="authloginpage">
            <h1>Авторизация</h1>

            <h4>Email</h4>
            <input type="email" className='forminput' value={email} onChange={event => setEmail(event.target.value)}/>

            <h4>Password</h4>
            <input type="password" className='forminput' value={pass} onChange={event => setPass(event.target.value)}/>

            <br/>

            <button className="button gg" onClick={nextButton}>Next</button>
        </div>
    );
};

export default AuthLoginPage;