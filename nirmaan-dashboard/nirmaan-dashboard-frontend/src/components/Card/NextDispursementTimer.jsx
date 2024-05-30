import React, { useState, useEffect } from 'react';
import './nextDispursementTimer.css';

function NextDispursementTimer() {
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const nowGMT = new Date(now.toUTCString().slice(0, -4));
            const midnightGMT = new Date(nowGMT.getFullYear(), nowGMT.getMonth(), nowGMT.getDate() + 1);
            const remainingTime = midnightGMT - nowGMT;
            const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
            const seconds = Math.floor((remainingTime / 1000) % 60);
            setTime({ hours, minutes, seconds });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="timer">
            <div className="timer-part">{time.hours} Hrs</div>
            <div className="timer-part">{time.minutes} Min</div>
            <div className="timer-part">{time.seconds} Sec</div>
        </div>
    );
}

export default NextDispursementTimer;
