import React from 'react';
import '../styles/pages.css'
import {Link, useParams} from "react-router-dom";

const MessagePage = () => {
    let {title, text} = useParams()

    return (
        <div className="messagepage mpage">
            <h1>{title}</h1>
            <h4>{text}</h4>
            <Link to='/'>Home page</Link>
        </div>
    );
};

export default MessagePage;