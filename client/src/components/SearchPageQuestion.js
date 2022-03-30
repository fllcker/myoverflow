import React from 'react';
import './styles/spq.css'
import {Link} from "react-router-dom";

const SearchPageQuestion = (props) => {
    return (
        <div className="SearchPageQuestion">
            <h2>{props.title}</h2>
            <Link to={'/questions/id/' + props.id} className='alink'>Открыть</Link>
        </div>
    );
};

export default SearchPageQuestion;