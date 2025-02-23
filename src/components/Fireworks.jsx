import { useEffect } from 'react';
import confetti from 'canvas-confetti';

function Fireworks() {
  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        spread: 60,
        origin: { y: 0.6 }
      });
      confetti({
        particleCount,
        angle: 60,
        spread: 60,
        origin: { x: 0 }
      });
      confetti({
        particleCount,
        angle: 120,
        spread: 60,
        origin: { x: 1 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return null;
}

export default Fireworks; 