import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import SearchPageQuestion from "../SearchPageQuestion";
import axios from "axios";

const SearchPage = (props) => {
    let {text} = useParams()
    let [quests, setQuests] = useState([])
    const [cookies] = useCookies();
    const navigate = useNavigate();
    let jwt = cookies['jsonwebtoken'];

    let [tagSearch, setTagSearch] = useState('')

    useEffect(() => {
        if (!jwt) return navigate('/alert/Ошибка авторизации/Авторизируйтесь или зарегистрируйтесь')

        if (!props.etag) {
            setTagSearch('')

            axios({
                headers: {
                    'Authorization': 'Bearer ' + jwt
                },
                url: 'questions/contains/title/' + text
            })
                .then(response => setQuests(response.data))

        } else {
            setTagSearch('stag')

            axios({
                headers: {
                    'Authorization': 'Bearer ' + jwt
                },
                url: 'questions/contains/tag/' + text
            })
                .then(response => setQuests(response.data))
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