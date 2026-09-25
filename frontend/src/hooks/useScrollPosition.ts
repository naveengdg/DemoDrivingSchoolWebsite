/**
 * Vetri Driving Academy — useScrollPosition Window Scroll Hook
 * =============================================================
 * Role & Purpose:
 * - Tracks vertical scroll distance using passive event listeners for maximum 60fps performance.
 * - Used by the Header to smoothly switch from transparent to elevated frosted-glass styling
 *   as the user scrolls down the page.
 */

import { useState, useEffect } from 'react';

export function useScrollPosition(threshold: number = 80): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Passive listener for scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
