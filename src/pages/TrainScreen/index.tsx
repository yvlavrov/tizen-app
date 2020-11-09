import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
import { formatTime } from './helpers/formatTime';
import { useTimer } from './helpers/useTimer';
import { useLongPress } from './helpers/useLongPress';

export function TrainScreen() {
    const { zone }: { zone: string } = useParams();
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const [pulse, setPulse] = useState<number>(125);

    const {
        timer,
        isActive,
        isPaused,
        handleStart,
        handlePause,
        handleResume,
        handleReset,
    } = useTimer(0);

    useEffect(() => {
        handleStart();
    }, []);

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 750,
    };

    const onLongPress = () => {
        setIsLocked(false);
    };

    const onClick = () => {
        if (!isLocked) {
            setIsLocked(true);
        }
    };

    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

    return (
        <div>
            <div className="grid-container">
                <div className="pulse">{pulse}</div>
                <div className="lock">
                    <button
                        style={{ backgroundColor: isLocked ? 'red' : 'green' }}
                        {...longPressEvent}
                    >
                        {isLocked ? 'Unlock' : 'Lock'}
                    </button>
                </div>
                <div className="line">
                    <hr />
                </div>
                <div className="time">
                    <p>{formatTime(timer)}</p>
                    <div className="buttons">
                        {!isActive && !isPaused ? (
                            <button disabled={isLocked} onClick={handleStart}>
                                Start
                            </button>
                        ) : isPaused ? (
                            <button disabled={isLocked} onClick={handlePause}>
                                Pause
                            </button>
                        ) : (
                            <button disabled={isLocked} onClick={handleResume}>
                                Resume
                            </button>
                        )}
                        <button onClick={handleReset} disabled={!isActive || isLocked}>
                            Finish
                        </button>
                    </div>
                </div>
                <div className="undefined">
                    <p>Выбрана зона {zone}</p>
                </div>
            </div>
        </div>
    );
}
