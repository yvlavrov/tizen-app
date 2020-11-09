import React, { useRef } from 'react';

export const useTimer = (initialState = 0) => {
    const [timer, setTimer] = React.useState(initialState);
    const [isActive, setIsActive] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(false);
    const countRef: ReturnType<any> = useRef<null | number>(null);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(true);
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);
        console.log(countRef.current);
    };

    const handlePause = () => {
        clearInterval(countRef.current as number);
        setIsPaused(false);
    };

    const handleResume = () => {
        setIsPaused(true);
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);
    };

    const handleReset = () => {
        clearInterval(countRef.current as number);
        setIsActive(false);
        setIsPaused(false);
        setTimer(0);
    };

    return {
        timer,
        isActive,
        isPaused,
        handleStart,
        handlePause,
        handleResume,
        handleReset,
    };
};
