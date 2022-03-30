import React, {useState} from 'react';
import './styles/header.css'
import {Link} from "react-router-dom";

const Header = () => {
    let [sinput, SetSinput] = useState('')

    const startSearch = () => {
        if (sinput.length == 0) return 1;


    }

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
                    <Link className='alink' to='/questions/new'>New question</Link>
                </div>

                <div className="search">
                    <input onBlur={startSearch} type="text" className="search_input" placeholder='Search' value={sinput} onChange={event => SetSinput(event.target.value)}/>
                    <Link to={'/search/q/' + sinput} className='alink asearch'>Search</Link>
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