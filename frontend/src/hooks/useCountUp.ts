/**
 * Vetri Driving Academy — useCountUp Animation Hook
 * ==================================================
 * Role & Purpose:
 * - Smoothly animates numbers from 0 to target value (e.g. 4200+ students, 94% pass rate).
 * - Utilizes ease-out quart interpolation for realistic acceleration and gentle deceleration.
 * - Triggers automatically once the element enters the viewport via IntersectionObserver.
 */

import { useEffect, useState } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  startOnView?: boolean;
  isInView?: boolean;
}

export function useCountUp({
  end,
  duration = 2000,
  isInView = false,
}: UseCountUpOptions): number {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isInView || hasStarted) return;

    setHasStarted(true);
    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for natural deceleration
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(startValue + (end - startValue) * easedProgress);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration, hasStarted]);

  return count;
}
