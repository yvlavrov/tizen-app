import { Link } from 'react-router-dom';
import React from 'react';

export function Home() {
    return (
        <ul>
            <li>
                <Link to="/simple">Простая тренировка</Link>
            </li>
            <li>
                <Link to="/complex">Составная</Link>
            </li>
        </ul>
    );
}
