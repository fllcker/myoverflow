import React, {useEffect, useState} from 'react';
import './styles/pages.css'
import {useCookies} from "react-cookie";
import jwt_decode from "jwt-decode";

const AuthInfo = (props) => {
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    const [cookies, setCookie] = useCookies();
    let jwt = cookies['jsonwebtoken'];

    useEffect(() => {
        if (!jwt) return document.location.href = '/alert/Ошибка авторизации/Авторизируйтесь или зарегистрируйтесь'
        const decoded = jwt_decode(jwt);
        //console.log(decoded)
        setUsername(decoded.username)
        setEmail(decoded.email)
    }, [])

    return (
        <div className="authinfo">
            <h4>Вы авторизированы как {username} ({email})</h4>
        </div>
    );
};

export default AuthInfo;