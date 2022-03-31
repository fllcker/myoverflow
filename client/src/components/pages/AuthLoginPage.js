import React, {useState} from 'react';
import '../styles/auth.css'
import {useCookies} from "react-cookie";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AuthLoginPage = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    const nextButton = () => {
        const payload = {
            email: email,
            password: pass
        }

        axios({
            method: 'POST',
            data: payload,
            url: 'users/login'
        })
            .then((response) => {
                let data = response.data;

                if (data.includes('Wrong password')) return navigate('/alert/Ошибка/Проверьте данные')
                if (data.includes('Cannot read properties')) return navigate('/alert/Ошибка/Проверьте данные')
                setCookie('jsonwebtoken', data, {
                    path: '/',
                    maxAge: 36000,
                    secure: false
                })

                return navigate('/alert/Успех/Вы авторизовались')
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