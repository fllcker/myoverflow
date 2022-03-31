import React, {useState} from 'react';
import {useCookies} from "react-cookie";
import jwt_decode from "jwt-decode";
import env from "react-dotenv";

const NewAnswer = (props) => {
    const [cookies, setCookie] = useCookies();
    const [ta, setTa] = useState('')

    const SendBtn = () => {
        let jwt = cookies['jsonwebtoken'];
        if (!jwt) return document.location.href = '/alert/Ошибка авторизации/Авторизируйтесь или зарегистрируйтесь'
        if (ta.length == 0) return 1;

        const decoded = jwt_decode(jwt);

        const payload = {
            text: ta,
            questionId: props.id,
            creatorId: decoded.id,
            creatorUserName: decoded.username
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify(payload)
        };

        fetch('http://localhost:7000/' + 'answers', requestOptions)
            .then(response => response.json())
            .then(data => document.location.reload())

        setTa('')
    }

    return (
        <div className="qpage answers">
            <h1>Ответить:</h1>
            <textarea name="" id="" rows="5" className='tta' value={ta} onChange={event => setTa(event.target.value)}></textarea>
            <button className="button nm" onClick={SendBtn}>Ответить</button>
        </div>
    );
};

export default NewAnswer;