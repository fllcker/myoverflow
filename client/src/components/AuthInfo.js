import React, {useEffect, useState} from 'react';
import './styles/pages.css'
import {useCookies} from "react-cookie";
import jwt_decode from "jwt-decode";
import env from "react-dotenv";

const AuthInfo = (props) => {
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    const [cookies, setCookie] = useCookies();
    let jwt = cookies['jsonwebtoken'];

    useEffect(() => {
        if (!jwt) return document.location.href = '/alert/Ошибка авторизации/Авторизируйтесь или зарегистрируйтесь'

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        };

        fetch('http://localhost:7000/' + 'users/jwttest', requestOptions)
            .then(response => response.text())
            .then((data) => {
                if (data == '123') {
                    const decoded = jwt_decode(jwt);
                    setUsername(decoded.username)
                    setEmail(decoded.email)
                } else return document.location.href = '/alert/Ошибка авторизации/Авторизируйтесь или зарегистрируйтесь'
            })
    }, [])

    return (
        <div className="authinfo">
            <h4>Вы авторизированы как {username} ({email})</h4>
        </div>
    );
};

export default AuthInfo;