import React, {useEffect, useState} from 'react';
import './styles/pages.css'
import {useCookies} from "react-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AuthInfo = (props) => {
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    const [cookies] = useCookies();
    let jwt = cookies['jsonwebtoken'];
    const navigate = useNavigate();

    useEffect(() => {
        if (!jwt) return navigate('/alert/Ошибка авторизации/Авторизируйтесь или зарегистрируйтесь')

        axios({
            headers: {
                'Authorization': 'Bearer ' + jwt
            },
            url: 'users/jwttest'
        })
            .then((response) => {
                if (response.data == '123') {
                    const decoded = jwt_decode(jwt);
                    setUsername(decoded.username)
                    setEmail(decoded.email)
                } else return navigate('/alert/Ошибка авторизации/Авторизируйтесь или зарегистрируйтесь')
            })
    }, [])

    return (
        <div className="authinfo">
            <h4>Вы авторизированы как {username} ({email})</h4>
        </div>
    );
};

export default AuthInfo;