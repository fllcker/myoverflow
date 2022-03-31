import React, {useState} from 'react';
import {useCookies} from "react-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const NewAnswer = (props) => {
    const [cookies] = useCookies();
    const [ta, setTa] = useState('')
    const navigate = useNavigate();

    const SendBtn = () => {
        let jwt = cookies['jsonwebtoken'];
        if (!jwt) return navigate('/alert/Ошибка авторизации/Авторизируйтесь или зарегистрируйтесь')
        if (ta.length == 0) return 1;

        const decoded = jwt_decode(jwt);

        const payload = {
            text: ta,
            questionId: props.id,
            creatorId: decoded.id,
            creatorUserName: decoded.username
        }

        axios({
            method: 'POST',
            url: 'answers',
            headers: {
                'Authorization': 'Bearer ' + jwt
            },
            data: payload
        })
            .then((response) => {
                navigate('/questions/id/0')
                navigate('/questions/id/' + props.id)
            })

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