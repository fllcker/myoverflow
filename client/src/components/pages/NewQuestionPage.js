import React, {useState} from 'react';
import '../styles/questionpage.css'
import AuthInfo from "../AuthInfo";
import {useCookies} from "react-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const NewQuestionPage = () => {
    let [qTitle, setQTitle] = useState('')
    let [qTags, setQTags] = useState('')
    let [qDesc, setQDesc] = useState('')
    const [cookies] = useCookies();
    const navigate = useNavigate();

    const newQButton = () => {
        let jwt = cookies['jsonwebtoken'];
        if (!jwt) return navigate('/alert/Ошибка авторизации/Авторизируйтесь или зарегистрируйтесь')
        const decoded = jwt_decode(jwt);

        let tags = []
        if (qTags.includes(' ')) {
            tags = qTags.split(' ')
        } else tags[0] = qTags

        const payload = {
            title: qTitle,
            description: qDesc,
            tags: tags,
            creatorId: decoded.id,
            creatorUserName: decoded.username,
        }

        axios({
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + jwt
            },
            data: payload,
            url: 'questions/new'
        })
            .then(response => navigate('/questions/id/' + response.data.id))

        setQTitle('')
        setQTags('')
        setQDesc('')
    }

    return (
        <div className="qpage newquestionpage">
            <h1>Задать вопрос</h1>

            <h4>Вопрос: </h4>
            <input type="text" value={qTitle} onChange={event => setQTitle(event.target.value)}/>

            <h4>Теги (через пробел): </h4>
            <input type="text" value={qTags} onChange={event => setQTags(event.target.value)}/>

            <h4>Описание / Код: </h4>
            <textarea name="" id="" cols="30" rows="10" value={qDesc} onChange={event => setQDesc(event.target.value)}></textarea><br/><br/>

            <button className='button' onClick={newQButton}>Новый вопрос</button>

            <br/><br/>
            <AuthInfo/>
        </div>
    );
};

export default NewQuestionPage;