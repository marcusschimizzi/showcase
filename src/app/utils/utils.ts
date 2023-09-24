import { useEffect, useRef } from 'react';

export function scaledRandom(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function map(n: number, start1: number, end1: number, start2: number, end2: number) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

export function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef<() => void>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            if (savedCallback.current) {
                savedCallback.current();
            }
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
