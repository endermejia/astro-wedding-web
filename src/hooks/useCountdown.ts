import { useState, useEffect } from 'react';
import { WEDDING_CONFIG } from '../i18n';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

function calculateRemaining(targetIso: string): CountdownTime {
  const targetMs = new Date(targetIso).getTime();
  const nowMs = Date.now();
  const diff = targetMs - nowMs;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isComplete: false,
  };
}

export function useCountdown(targetIso: string = WEDDING_CONFIG.date.isoStart): CountdownTime {
  const [time, setTime] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
  });

  useEffect(() => {
    setTime(calculateRemaining(targetIso));
    const timer = window.setInterval(() => {
      setTime(calculateRemaining(targetIso));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [targetIso]);

  return time;
}
