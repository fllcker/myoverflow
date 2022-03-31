import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import Answer from "./Answer";

const AllAnswers = (props) => {
    let [answers, setAnswers] = useState([])
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        let jwt = cookies['jsonwebtoken'];
        if (!jwt) return document.location.href = '/alert/Ошибка авторизации/Авторизируйтесь или зарегистрируйтесь'
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        };

        fetch(window.env.API_URL + 'answers/' + props.id, requestOptions)
            .then(response => response.json())
            .then((data) => {
                data.reverse()
                setAnswers(data)
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