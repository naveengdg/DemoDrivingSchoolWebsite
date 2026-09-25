/**
 * Vetri Driving Academy — ScrollReveal Animation Wrapper
 * =======================================================
 * Role & Purpose:
 * - Declarative wrapper using Framer Motion to create smooth scroll entrance effects.
 * - Supports directional slide offsets (up, down, left, right) and customizable delays.
 * - Triggers only once when 20% visible with a modern exponential-out easing curve.
 */

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

const directionOffset = {
  up: { y: 24, x: 0 },
  down: { y: -24, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
}: ScrollRevealProps) {
  const offset = directionOffset[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // expo-out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
