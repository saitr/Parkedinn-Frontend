import React, { useState, useEffect } from "react";

function Stopwatch() {
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);

    const startTimer = () => {
        setStartTime(Date.now());
        const interval = setInterval(() => {
            setElapsedTime(Date.now() - startTime);
        }, 1000);
        setTimerInterval(interval);
    };

    const stopTimer = () => {
        clearInterval(timerInterval);
        // Update end time in the backend using an API call
    };

    useEffect(() => {
        return () => {
            clearInterval(timerInterval);
        };
    }, [timerInterval]);

    return (
        <div>
            <p>Elapsed Time: {elapsedTime} ms</p>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
        </div>
    );
}

export default Stopwatch;
