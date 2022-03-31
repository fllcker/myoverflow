import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";
import jwt_decode from "jwt-decode";

const AccNav = () => {
    const [cookies, setCookie] = useCookies();
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let authed = false;

    let [loginButton, setLoginButton] = useState(<Link className='button' to='/users/login'>Log in</Link>)
    let [singupButton, setSingupButton] = useState(<Link className='button' to='/users/singup'>Sing up</Link>)
    let [exitButton, setExitButton] = useState(null)

    function exitbtn() {
        setCookie('jsonwebtoken', '')
        document.location.href = '/'
    }

    useEffect(() => {
        let jwt = cookies['jsonwebtoken'];
        if (!jwt) {
            authed = false;
        } else {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwt
                }
            };

            fetch('http://localhost:7000/users/jwttest', requestOptions)
                .then(response => response.text())
                .then((data) => {
                    console.log(data)
                    if (data == '123') authed = true;
                    const decoded = jwt_decode(jwt);
                    setUsername(decoded.username)
                    setEmail('(' + decoded.email + ')')
                    setExitButton(<button onClick={exitbtn} className='exitbtn'>Exit</button>)
                    setLoginButton(null)
                    setSingupButton(null)
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