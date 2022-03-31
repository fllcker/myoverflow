import React, {useEffect, useState} from 'react';
import '../styles/questionpage.css'
import {Link, useNavigate, useParams} from "react-router-dom";
import AllAnswers from "../AllAnswers";
import {useCookies} from "react-cookie";
import NewAnswer from "../NewAnswer";
import axios from "axios";

const QuestionView = () => {
    let {id} = useParams()
    const [cookies] = useCookies();
    const navigate = useNavigate();
    let jwt = cookies['jsonwebtoken'];

    // states
    let [postAuthor, setPostAuthor] = useState('')
    let [postTitle, setPostTitle] = useState('')
    let [postQue, setPostQue] = useState('')
    let [postTags, setPostTags] = useState([])


    useEffect(() => {
        if (!jwt) return navigate('/alert/Ошибка авторизации/Авторизируйтесь или зарегистрируйтесь')

        axios({
            headers: {
                'Authorization': 'Bearer ' + jwt
            },
            url: 'questions/id/' + id
        })
            .then((response) => {
                setPostAuthor(response.data.creatorUserName)
                setPostTitle(response.data.title)
                setPostQue(response.data.description)
                setPostTags(response.data.tags)
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