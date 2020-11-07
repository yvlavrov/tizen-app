import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';

export function TrainScreen() {
    const { zone }: { zone: string } = useParams();
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const [pulse, setPulse] = useState<number>(125);
    const [time, setTime] = useState<number>(125);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('This will run every second!');
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="grid-container">
                <div className="pulse">125</div>
                <div className="lock">
                    <button
                        style={{ backgroundColor: isLocked ? 'red' : 'green' }}
                        onClick={(e) => setIsLocked(!isLocked)}
                    >
                        Lock
                    </button>
                </div>
                <div className="line">
                    <hr />
                </div>
                <div className="time">00:35:21</div>
                <div className="undefined">
                    <p>Выбрана зона {zone}</p>
                </div>
            </div>
        </div>
    );
}
