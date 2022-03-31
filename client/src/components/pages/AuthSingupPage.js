import React, {useState} from 'react';
import '../styles/auth.css'
import {useCookies} from "react-cookie";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AuthSingupPage = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [username, setUsername] = useState('')
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    const nextButton = () => {
        const payload = {
            email,
            password: pass,
            username
        }

        if ((2 > email.length > 32) || (!email.includes('@'))) return navigate('/alert/Ошибка/Проверьте введенный email')
        if (pass.length < 2) return navigate('/alert/Ошибка/Проверьте введенный пароль')
        if (username.length < 2) return navigate('/alert/Ошибка/Проверьте введенный username')

        axios({
            method: 'POST',
            data: payload,
            url: 'users/registration'
        })
            .then((response) => {
                let data = response.data;
                if (data.includes('повторяющееся значение')) return navigate('/alert/Ошибка/Аккаунт с таким email уже существует')
                setCookie('jsonwebtoken', data, {
                    path: '/',
                    maxAge: 36000,
                    secure: false
                })
                return navigate('/alert/Успех/Вы зарегистрировались')
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