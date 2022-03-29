import React from 'react';

const Answer = (props) => {
    return (
        <div className="answer">
            <p>Пользователь <strong>{props.authorUsername}</strong>:</p>
            <p>{props.authorAnswer}</p>
        </div>
    );
};

export default Answer;