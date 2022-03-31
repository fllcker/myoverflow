import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";

const AccNav = () => {
    const [cookies, setCookie] = useCookies();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    let authed = false;

    const [loginButton, setLoginButton] = useState(<Link className='button' to='/users/login'>Log in</Link>)
    const [singupButton, setSingupButton] = useState(<Link className='button' to='/users/singup'>Sing up</Link>)
    const [exitButton, setExitButton] = useState(null)

    function exitClick() {
        setCookie('jsonwebtoken', '')
        document.location.href = '/'
    }

    useEffect(() => {
        let jwt = cookies['jsonwebtoken'];
        if (jwt) {
            axios({
                headers: {
                    'Authorization': 'Bearer ' + jwt
                },
                url: 'users/jwttest'
            })
                .then((response) => {
                    if (response.data == '123') {
                        authed = true;
                        const decoded = jwt_decode(jwt);
                        setUsername(decoded.username)
                        setEmail('(' + decoded.email + ')')
                        setExitButton(<button onClick={exitClick} className='exitbtn'>Exit</button>)
                        setLoginButton(null)
                        setSingupButton(null)
                    }
                })
        }
    }, [])

    return (
        <div className="accNav">
            {username} {email}
            {exitButton}
            {loginButton}
            {singupButton}
        </div>
    );
};

export default AccNav;