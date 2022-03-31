import React, {useEffect, useState} from 'react';
import '../styles/questionpage.css'
import {Link, useParams} from "react-router-dom";
import AllAnswers from "../AllAnswers";
import {useCookies} from "react-cookie";
import NewAnswer from "../NewAnswer";

const QuestionView = () => {
    let {id} = useParams()
    const [cookies] = useCookies();

    // states
    let [postAuthor, setPostAuthor] = useState('')
    let [postTitle, setPostTitle] = useState('')
    let [postQue, setPostQue] = useState('')
    let [postTags, setPostTags] = useState([])
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

        fetch(window.env.API_URL + 'questions/id/' + id, requestOptions)
            .then(response => response.json())
            .then((data) => {
                setPostAuthor(data.creatorUserName)
                setPostTitle(data.title)
                setPostQue(data.description)
                setPostTags(data.tags)
            })
    }, [id])

    return (
        <div>
            <div className="questionview qpage">
                <h1>Вопрос от {postAuthor}: </h1>
                <h2>{postTitle}</h2>
                {postQue}

                <div className="tags">
                    {
                        postTags.map(el => <Link to={'/search/tag/' + el} className='tag'>{el}</Link>)
                    }
                </div>
            </div>

            <NewAnswer id={id}/>

            <AllAnswers id={id}/>
        </div>
    );
};

export default QuestionView;