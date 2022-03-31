import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import Answer from "./Answer";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const AllAnswers = (props) => {
    let [answers, setAnswers] = useState([])
    const [cookies, setCookie] = useCookies();
    const navigate = useNavigate();

    useEffect(() => {
        let jwt = cookies['jsonwebtoken'];
        if (!jwt) return navigate('/alert/Ошибка авторизации/Авторизируйтесь или зарегистрируйтесь')

        axios({
            headers: {
                'Authorization': 'Bearer ' + jwt
            },
            url: 'answers/' + props.id
        })
            .then((response) => {
                let d = response.data
                d.reverse()
                setAnswers(d)
            })
    }, [props.id])

    return (
        <div className="qpage answers">
            <h1>Ответы:</h1>
            {
                answers.map(el => <Answer authorUsername={el.creatorUserName} authorAnswer={el.text}/>)
            }
        </div>
    );
};

export default AllAnswers;