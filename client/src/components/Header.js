import React from 'react';
import './styles/header.css'
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className='headerr'>
            <div className="header">
                <Link className='alink' to='/'>
                    <span className="my">My</span>
                    <span className="overflow">OverFlow</span>
                </Link>

                <div className="nav">
                    <Link className='alink' to='/'>Home</Link>
                    <Link className='alink' to='/'>About</Link>
                </div>

                <div className="search">
                    <input type="text" className="search_input" placeholder='Search'/>
                </div>

                <div className="accNav">
                    <Link className='button' to='/users/login'>Log in</Link>
                    <Link className='button' to='/users/singup'>Sing up</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;