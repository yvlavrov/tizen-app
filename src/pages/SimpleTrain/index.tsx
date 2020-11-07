import React from 'react';
import { Link } from 'react-router-dom';

export function SimpleTrain() {
    return (
        <ul>
            {[1, 2, 3, 4, 5].map((z) => (
                <li>
                    <Link to={`train/${z}`}>Зона {z}</Link>
                </li>
            ))}
        </ul>
    );
}
