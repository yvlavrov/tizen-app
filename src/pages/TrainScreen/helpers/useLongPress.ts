import { useCallback, useRef, useState } from 'react';
import React from 'react';

export const useLongPress = (
    onLongPress: (event?: React.TouchEvent | React.MouseEvent) => void,
    onClick: () => void,
    { shouldPreventDefault = true, delay = 300 } = {},
) => {
    const [longPressTriggered, setLongPressTriggered] = useState(false);
    const timeout: any = useRef();
    const target: any = useRef();

    const start = useCallback(
        (event) => {
            if (shouldPreventDefault && event.target) {
                event.target.addEventListener('touchend', preventDefault, {
                    passive: false,
                });
                target.current = event.target;
            }
            timeout.current = setTimeout(() => {
                onLongPress(event);
                setLongPressTriggered(true);
            }, delay);
        },
        [onLongPress, delay, shouldPreventDefault],
    );

    const clear = useCallback(
        (event, shouldTriggerClick = true) => {
            timeout.current && clearTimeout(timeout.current);
            shouldTriggerClick && !longPressTriggered && onClick();
            setLongPressTriggered(false);
            if (shouldPreventDefault && target.current) {
                target.current.removeEventListener('touchend', preventDefault);
            }
        },
        [shouldPreventDefault, onClick, longPressTriggered],
    );

    return {
        onMouseDown: (e: React.MouseEvent) => start(e),
        onTouchStart: (e: React.TouchEvent) => start(e),
        onMouseUp: (e: React.MouseEvent) => clear(e),
        onMouseLeave: (e: React.MouseEvent) => clear(e, false),
        onTouchEnd: (e: React.TouchEvent) => clear(e),
    };
};

const isTouchEvent = (event: React.TouchEvent | React.MouseEvent): boolean => {
    return 'touches' in event;
};

const preventDefault = (event: React.TouchEvent) => {
    if (!isTouchEvent(event)) return;

    if (event.touches.length < 2 && event.preventDefault) {
        event.preventDefault();
    }
};
