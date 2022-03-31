import React from 'react';

const OnePlus = (props) => {
    return (
        <div className="plus">
            <h3>{props.title}</h3>
            <p className='pp'>{props.desc}</p>
        </div>
    );
};

export default OnePlus;