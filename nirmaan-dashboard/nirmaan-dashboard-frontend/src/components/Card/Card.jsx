import React from 'react';
import NextDispursementTimer from './NextDispursementTimer'
import './card.css';

function Card({ card, showTimer }) {
    return (
        <div className="col-xxl-4 col-md-6">
            <div className="card">
                <div className="text">
                    <h5 className="card-title">{card.name}</h5>
                    <div className="icons">
                        <div className="icon-container">
                            <i className={card.icon}></i>
                        </div>
                        {showTimer ? <NextDispursementTimer /> : <h6 className="amount">{card.amount}</h6>}
                    </div>
                </div>
                <a href={card.href} className="btn">
                    {card.label} <i className="bi bi-arrow-right-circle-fill icon-style-button"></i>
                </a>
            </div>
        </div>
    );
}


export default Card;
