import React, {useEffect, useState} from 'react';
import '../styles/homepage.css'
import OnePlus from "../OnePlus";
import {Link} from "react-router-dom";

const HomePage = () => {
    let [prof, setProf] = useState('developer')

    let profs = [
        'developer',
        'system admin',
        'game developer',
        'mobile developer',
        'data scientist'
    ]

    useEffect(() => {
        for (let i = 0; i < profs.length; i++) {
            setInterval(() => {
                setProf(profs[i])
            }, 1500 * (i + 1))
        }
    }, [])

    return (
        <div className="homepage">
            <h1 className="title">
                <span className="s1">
                    Every <span className="prof">{prof} </span> has a
                </span> <br/>
                <span className="s2">
                    tab open MyOverFlow
                </span>
            </h1>

            <Link className="button jtc" to='/users/singup'>Join the community</Link>

            <div className="pluses">
                <OnePlus title='100+ million' desc='monthly visitors to Stack Overflow & Stack Exchange'/>
                <OnePlus title='45.1+ billion' desc='Times a developer got help since 2008'/>
                <OnePlus title='179% ROI' desc='from companies using Stack Overflow for Teams'/>
                <OnePlus title='5,000+' desc='Stack Overflow for Teams instances active every day'/>
            </div>

            <div className="otherinfo">
                <h1>Integrates with and improves other tools</h1>
                <p className='pp'>All plans come with integrations for ChatOps tools Slack & Microsoft Teams in order to cut down on pings, limit distractions and make the tools even more powerful. Business and Enterprise customers get access to Jira, GitHub & Okta integrations.</p>
            </div>
        </div>
    );
};

export default HomePage;