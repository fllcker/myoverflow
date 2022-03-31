import React, {useState} from 'react';
import './styles/header.css'
import {Link} from "react-router-dom";
import AccNav from "./AccNav";

const Header = () => {
    let [sinput, SetSinput] = useState('')

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
                    <input type="text" className="search_input" placeholder='Search' value={sinput} onChange={event => SetSinput(event.target.value)}/>
                    <Link to={'/search/q/' + sinput} className='alink asearch'>Search</Link>
                </div>

                <AccNav/>
            </div>
        </header>
    );
};

export default Header;