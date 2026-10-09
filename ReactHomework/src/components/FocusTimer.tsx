import { useEffect, useRef, useState } from "react";

export default function FocusTimer() {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [note, setNote] = useState('');

    const intervalRef = useRef<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const startTimer = () => {
        if (isActive) return;
        setIsActive(true);
        intervalRef.current = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);
    };

    const stopTimer = () => {
        setIsActive(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        useEffect(() => () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }, []);
        inputRef.current?.focus();
    }

    const formatTime = (totalSeconds: number) => {
        const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`
    }

    return (
        <section className={`focus-timer ${isActive ? 'focus-timer--active' : ''}`}>
            <div className="focus-timer__header">
                <div>
                    <p className="eyebrow">Навчальний кабінет / 05</p>
                    <h2>Таймер фокусування</h2>
                </div>
                <span className="focus-timer__badge">{isActive ? 'фокус' : 'готовий'}</span>
            </div>
            <div className="focus-timer__clock" aria-live="polite">{formatTime(seconds)}</div>
            <div className="focus-timer__controls">
                {isActive ? (
                    <button onClick={stopTimer}
                        className="focus-timer__button focus-timer__button--stop">Завершити фокус</button>
                ) : (
                    <button onClick={startTimer}
                        className="focus-timer__button">Почати фокус</button>
                )}
            </div>
            <div className="focus-timer__note">
                <label htmlFor="focus-note">Що встигли вивчити?</label>
                <input id="focus-note" type="text" ref={inputRef} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Напишіть коротку нотатку..." />
            </div>
        </section>
    )
}