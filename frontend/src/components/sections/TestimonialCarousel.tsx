/**
 * Vetri Driving Academy — Animated Testimonial Carousel Component
 * ===============================================================
 * Role & Purpose:
 * - Interactive carousel showcasing authentic student testimonials and Google reviews.
 * - Displays student name, rating stars, location, course completed, and first-attempt pass verification badge.
 * - Supports keyboard/button navigation, dot indicators, and fluid AnimatePresence slide transitions.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, MapPin, CheckCircle } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import type { Review } from '@/types';

interface TestimonialCarouselProps {
  reviews: Review[];
  loading: boolean;
}

export function TestimonialCarousel({ reviews, loading }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);

  const displayReviews = reviews.slice(0, 6);

  const next = () => {
    setCurrent((prev) => (prev + 1) % displayReviews.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + displayReviews.length) % displayReviews.length);
  };

  if (loading || displayReviews.length === 0) {
    return (
      <section className="section-padding bg-cream-dark">
        <div className="section-container">
          <div className="h-64 rounded-card bg-steel-lighter/50 animate-pulse" />
        </div>
      </section>
    );
  }

  const review = displayReviews[current];

  return (
    <section className="section-padding bg-cream-dark">
      <div className="section-container">
        <SectionHeading
          title="What Our Students Say"
          subtitle="Real feedback from learners who trained with us and passed their RTO test."
        />

        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-white rounded-2xl shadow-card p-5 sm:p-10 min-h-[260px]">
              {/* Quote icon */}
              <Quote
                size={36}
                className="text-amber/20 absolute top-4 right-4 sm:top-6 sm:right-6 pointer-events-none"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < review.rating
                            ? 'text-amber fill-amber'
                            : 'text-steel-lighter'
                        }
                      />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <blockquote className="text-road text-sm sm:text-lg leading-relaxed mb-5 sm:mb-6">
                    "{review.testimonial}"
                  </blockquote>

                  {/* Result badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle size={15} className="text-success shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-success">
                      {review.result}
                    </span>
                  </div>

                  {/* Author info */}
                  <div className="flex items-center justify-between pt-3 border-t border-steel-lighter">
                    <div>
                      <div className="font-display font-semibold text-road text-sm sm:text-base">
                        {review.student_name}
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-steel mt-0.5">
                        <MapPin size={11} className="shrink-0" />
                        <span>{review.location}</span>
                        <span className="text-steel-light">•</span>
                        <span>{review.course_taken}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile & Desktop Safe Controls */}
            <div className="flex items-center justify-between sm:justify-center gap-4 mt-5 sm:mt-6 px-1">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center hover:bg-cream active:scale-95 transition-all text-road border border-steel-lighter"
                aria-label="Previous review"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex justify-center gap-2">
                {displayReviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`
                      h-2.5 rounded-full transition-all duration-200
                      ${i === current ? 'bg-amber w-6' : 'bg-steel-lighter hover:bg-steel-light w-2.5'}
                    `.trim()}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center hover:bg-cream active:scale-95 transition-all text-road border border-steel-lighter"
                aria-label="Next review"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
