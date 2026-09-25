/**
 * Vetri Driving Academy — Key Metrics & Statistics Section
 * ========================================================
 * Role & Purpose:
 * - Displays 4 animated key performance indicators (Students Trained, RTO Pass Rate, Years Exp, Certified Instructors).
 * - Utilizes `useInView` and `useCountUp` to trigger smooth numerical counting animations when scrolled into view.
 */

import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import { STATS } from '@/lib/constants';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import type { StatItem } from '@/types';

function StatCounter({ stat, isInView }: { stat: StatItem; isInView: boolean }) {
  const count = useCountUp({ end: stat.value, isInView, duration: 2000 });

  return (
    <div className="text-center p-3.5 sm:p-4 rounded-2xl bg-white/80 sm:bg-transparent border border-steel-lighter/60 sm:border-0 shadow-sm sm:shadow-none">
      <div className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-road">
        {stat.prefix}
        {count}
        <span className="text-amber">{stat.suffix}</span>
      </div>
      <div className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold text-steel">{stat.label}</div>
    </div>
  );
}

export function Stats() {
  const [ref, isInView] = useInView({ threshold: 0.3 });

  return (
    <section className="section-padding bg-cream-dark" ref={ref}>
      <div className="section-container">
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {STATS.map((stat) => (
              <StatCounter key={stat.label} stat={stat} isInView={isInView} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
