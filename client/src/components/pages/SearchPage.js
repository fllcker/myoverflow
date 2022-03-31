import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import SearchPageQuestion from "../SearchPageQuestion";

const SearchPage = (props) => {
    let {text} = useParams()
    let [quests, setQuests] = useState([])
    const [cookies] = useCookies();
    let jwt = cookies['jsonwebtoken'];

    let [tagSearch, setTagSearch] = useState('')

    useEffect(() => {
        if (!jwt) return document.location.href = '/alert/Ошибка авторизации/Авторизируйтесь или зарегистрируйтесь'

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        };

        if (!props.etag) {
            setTagSearch('')
            fetch(window.env.API_URL + 'questions/contains/title/' + text, requestOptions)
                .then(response => response.json())
                .then(data => setQuests(data))
        } else {
            setTagSearch('stag')
            fetch(window.env.API_URL + 'questions/contains/tag/' + text, requestOptions)
                .then(response => response.json())
                .then(data => setQuests(data))
        }

    }, [text])

    return (
        <div className="searchpage qpage">
            <h1><span className={tagSearch}>"{text}": </span></h1>

            {
                quests.map(el => <SearchPageQuestion id={el.id} title={el.title}/>)
            }
        </div>
    );
};

export default SearchPage;