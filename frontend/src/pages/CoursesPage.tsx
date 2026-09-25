/**
 * Vetri Driving Academy — Courses & Transparent Pricing Page
 * ==========================================================
 * Role & Purpose:
 * - Comprehensive driving course catalog with interactive licence category filtering:
 *     • All Courses
 *     • Four-Wheeler / Car (Manual & Automatic)
 *     • Two-Wheeler (Motorcycle & Scooter)
 *     • Heavy Commercial Vehicle (HMV / Truck)
 *     • Refresher & Confidence Training
 * - Shows fee amounts, duration, session count, instalment availability, RTO test prep, and direct enrolment buttons.
 */

import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Clock,
  Calendar,
  Car,
  Bike,
  Truck,
  Briefcase,
  LayoutGrid,
  CheckCircle2,
  Sparkles,
  Target,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { CTABanner } from '@/components/sections/CTABanner';
import { COURSE_CATEGORIES } from '@/lib/constants';
import { getCourseHighlight } from '@/lib/courseHighlights';
import type { Course } from '@/types';

const categoryIcons: Record<string, React.ReactNode> = {
  '': <LayoutGrid size={13} className="shrink-0" />,
  LMV: <Car size={13} className="shrink-0" />,
  'Two-Wheeler': <Bike size={13} className="shrink-0" />,
  'LMV Commercial': <Briefcase size={13} className="shrink-0" />,
  HMV: <Truck size={13} className="shrink-0" />,
};

function CourseDetail({ course }: { course: Course }) {
  const highlight = getCourseHighlight(course.name);

  return (
    <Card padding="lg" className="h-full flex flex-col border border-steel-lighter/80 hover:border-amber/50 hover:shadow-card-hover transition-all duration-300">
      {/* Header Badges */}
      <div className="flex items-start justify-between mb-3 gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="amber">{course.licence_category}</Badge>
          <Badge variant="steel" size="sm">{course.vehicle_type}</Badge>
          {course.rto_test_prep && (
            <Badge variant="success" size="sm">
              <CheckCircle2 size={12} />
              RTO Prep
            </Badge>
          )}
        </div>
        {highlight.badge && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber/15 text-road border border-amber/30">
            <Sparkles size={11} className="text-amber-dark" />
            {highlight.badge}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-display text-xl sm:text-2xl font-bold text-road mb-1.5">
        {course.name}
      </h3>

      {/* Target & Goal Summary */}
      <div className="flex items-center gap-1.5 text-xs text-road/80 font-medium mb-4">
        <Target size={14} className="text-amber-dark shrink-0" />
        <span><strong className="text-road font-semibold">Goal:</strong> {highlight.goal}</span>
      </div>

      {/* Action Steps — Direct points, NO paragraph */}
      <div className="space-y-2 mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider text-steel mb-2">
          What this course actually trains you to do:
        </div>
        {highlight.steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-road/90">
            <span className="w-5 h-5 rounded-full bg-amber/15 text-road font-bold text-[11px] flex items-center justify-center shrink-0">
              {idx + 1}
            </span>
            <span className="leading-snug">{step}</span>
          </div>
        ))}
      </div>

      {/* Compact Specs Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-2.5 px-3 rounded-xl bg-cream-dark/60 border border-steel-lighter/50 mb-5 mt-auto text-xs text-road/85">
        <div className="flex items-center gap-1.5">
          <Calendar size={14} className="text-amber-dark shrink-0" />
          <div>
            <span className="font-bold text-road">{course.duration_days}</span> <span className="text-steel">Days</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={14} className="text-amber-dark shrink-0" />
          <div>
            <span className="font-bold text-road">{course.sessions_included}</span> <span className="text-steel">Sessions</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Car size={14} className="text-amber-dark shrink-0" />
          <span className="truncate font-medium">{course.vehicle_type}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 size={14} className="text-success shrink-0" />
          <span className="font-medium">{course.learner_licence_assistance ? 'LL Included' : 'RTO Guidance'}</span>
        </div>
      </div>

      {/* Price + CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-4 border-t border-steel-lighter">
        <div>
          <div className="font-display text-2xl sm:text-3xl font-bold text-road">
            ₹{course.fee_amount.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-steel mt-0.5">
            {course.instalment_available ? 'EMI available • All inclusive' : 'One-time payment • All inclusive'}
          </div>
        </div>
        <Button
          to={`/contact?course=${encodeURIComponent(course.name)}`}
          size="md"
          className="w-full sm:w-auto justify-center"
        >
          Enroll Now
        </Button>
      </div>
    </Card>
  );
}

export default function CoursesPage() {
  const [category, setCategory] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollRatio(Math.min(1, Math.max(0, scrollLeft / maxScroll)));
      setCanScrollLeft(scrollLeft > 8);
      setCanScrollRight(scrollLeft < maxScroll - 8);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === 'left' ? -180 : 180;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['courses', category],
    queryFn: () => api.getCourses(category || undefined),
  });

  return (
    <div className="w-full">
      {/* Page header */}
      <section className="section-padding pb-4 sm:pb-8">
        <div className="section-container">
          <SectionHeading
            title="Courses & Pricing"
            subtitle="Transparent pricing with no hidden fees. Choose the course that matches your licence goal."
          />

          {/* Category filter — Mobile horizontally scrollable with visible mini scrollbar */}
          <div className="relative mt-6 sm:mt-8">
            {/* Mobile Left Scroll Arrow */}
            {canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                aria-label="Scroll categories left"
                className="sm:hidden absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-road/90 text-cream flex items-center justify-center shadow-md active:scale-95 transition-all"
              >
                <ChevronLeft size={16} />
              </button>
            )}

            {/* Scrollable category pills */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center gap-2 pb-2 px-1 -mx-4 sm:mx-0 px-4 sm:px-0 scroll-smooth"
            >
              {COURSE_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={(e) => {
                    setCategory(cat.value);
                    e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                  }}
                  className={`
                    flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0
                    ${category === cat.value
                      ? 'bg-road text-cream shadow-sm scale-[1.02]'
                      : 'bg-white text-road hover:bg-road/5 border border-steel-lighter active:scale-95'
                    }
                  `.trim()}
                >
                  {categoryIcons[cat.value]}
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Right Scroll Arrow */}
            {canScrollRight && (
              <button
                onClick={() => scroll('right')}
                aria-label="Scroll categories right"
                className="sm:hidden absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-amber text-road flex items-center justify-center shadow-md active:scale-95 transition-all animate-pulse"
              >
                <ChevronRight size={16} />
              </button>
            )}

            {/* Mobile Scroll Indicator & Option Count (The little scrollbar) */}
            <div className="sm:hidden flex items-center justify-between px-1 mt-2.5 text-xs text-steel">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-steel">
                <span className="font-bold text-road">{COURSE_CATEGORIES.length} Categories</span>
                <span className="text-amber-dark font-bold">•</span>
                <span>Swipe to view all</span>
              </div>

              {/* Little Scrollbar */}
              <div className="w-20 h-1.5 bg-steel-lighter/80 rounded-full overflow-hidden relative shadow-inner">
                <div
                  className="h-full bg-amber rounded-full transition-all duration-150"
                  style={{
                    width: '45%',
                    transform: `translateX(${scrollRatio * 122}%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course grid */}
      <section className="section-padding pt-4">
        <div className="section-container">
          {error ? (
            <div className="text-center py-12">
              <p className="text-steel">Failed to load courses. Please try again later.</p>
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-96 rounded-card bg-steel-lighter/50 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {data?.courses.map((course, i) => (
                <ScrollReveal key={course.id} delay={i * 0.08}>
                  <CourseDetail course={course} />
                </ScrollReveal>
              ))}
            </div>
          )}

          {data && data.total === 0 && (
            <div className="text-center py-12">
              <p className="text-steel">No courses found for this category.</p>
            </div>
          )}
        </div>
      </section>

      <CTABanner
        title="Not Sure Which Course Is Right for You?"
        subtitle="Call us for a free consultation — we will recommend the best programme based on your licence needs and schedule."
      />
    </div>
  );
}
