/**
 * Vetri Driving Academy — Featured Course Cards Grid (Homepage)
 * ==============================================================
 * Role & Purpose:
 * - Highlights top 3 popular driving courses with pricing, duration, milestone checklist,
 *   and direct "Enrol Now" buttons pre-selecting the course in the contact form.
 * - Displays animated skeleton shimmer cards while course data loads from the API.
 */

import { Link } from 'react-router-dom';
import { Clock, Calendar, Car, CheckCircle2, ArrowRight, Sparkles, Target } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { getCourseHighlight } from '@/lib/courseHighlights';
import type { Course } from '@/types';

interface CourseCardsProps {
  courses: Course[];
  loading: boolean;
}

export function CourseCards({ courses, loading }: CourseCardsProps) {
  const topCourses = courses.slice(0, 3);

  return (
    <section className="section-padding bg-cream/50">
      <div className="section-container">
        <SectionHeading
          title="Our Most Popular Courses"
          subtitle="Focused training programmes built for RTO first-time success. Clear deliverables, no filler."
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 rounded-card bg-steel-lighter/50 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCourses.map((course, i) => {
              const highlight = getCourseHighlight(course.name);

              return (
                <ScrollReveal key={course.id} delay={i * 0.1}>
                  <Card className="h-full flex flex-col border border-steel-lighter/80 hover:border-amber/50 transition-all duration-300 hover:shadow-card-hover group">
                    {/* Top badges & highlight tag */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Badge variant="amber">{course.licence_category}</Badge>
                        <Badge variant="steel" size="sm">{course.vehicle_type}</Badge>
                      </div>
                      {highlight.badge && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber/15 text-road border border-amber/30">
                          <Sparkles size={11} className="text-amber-dark" />
                          {highlight.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-bold text-road mb-1.5 group-hover:text-amber-dark transition-colors">
                      {course.name}
                    </h3>

                    {/* Goal line — No paragraph */}
                    <div className="flex items-center gap-1.5 text-xs text-road/80 font-medium mb-3">
                      <Target size={13} className="text-amber-dark shrink-0" />
                      <span><strong className="text-road font-semibold">Goal:</strong> {highlight.goal}</span>
                    </div>

                    {/* Simple Training Steps — Direct Points */}
                    <div className="space-y-2 mb-5 text-xs sm:text-sm text-road/90">
                      {highlight.steps.slice(0, 3).map((step, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-amber/15 text-road font-bold text-[10px] flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="leading-snug">{step}</span>
                        </div>
                      ))}
                    </div>

                    {/* Compact Specs Bar */}
                    <div className="grid grid-cols-2 gap-2 py-2 px-3 rounded-xl bg-cream-dark/60 border border-steel-lighter/50 mb-5 mt-auto text-xs text-road/85">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-amber-dark shrink-0" />
                        <span><strong>{course.duration_days}</strong> Days</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-amber-dark shrink-0" />
                        <span><strong>{course.sessions_included}</strong> Sessions</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Car size={13} className="text-amber-dark shrink-0" />
                        <span className="truncate">{course.vehicle_type}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-success">
                        <CheckCircle2 size={13} className="shrink-0" />
                        <span>{course.rto_test_prep ? 'RTO Track Prep' : 'Test Guidance'}</span>
                      </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-end justify-between pt-4 border-t border-steel-lighter">
                      <div>
                        <div className="font-display text-2xl font-bold text-road">
                          ₹{course.fee_amount.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[11px] text-steel">
                          {course.instalment_available ? 'EMI available • All-inclusive' : 'All-inclusive fee'}
                        </span>
                      </div>
                      <Link
                        to={`/contact?course=${encodeURIComponent(course.name)}`}
                        className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold bg-amber text-road hover:bg-amber-dark transition-colors px-3.5 py-1.5 rounded-lg shadow-sm active:scale-95"
                      >
                        Enroll Now
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* View All CTA */}
        <ScrollReveal className="mt-10 text-center">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                     border-2 border-road text-road font-semibold
                     hover:bg-road hover:text-cream transition-all duration-200"
          >
            View All Courses & Pricing
            <ArrowRight size={18} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
