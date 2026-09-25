/**
 * Vetri Driving Academy — Student Testimonials & Ratings Page
 * ============================================================
 * Role & Purpose:
 * - Displays verified student reviews and Google ratings metrics (4.8 stars from 340+ learners).
 * - Shows summary statistics (first-time pass rate, instructor rating score, total alumni).
 * - Renders individual student testimonial cards with student name, location, and verified test results.
 */

import { useQuery } from '@tanstack/react-query';
import { Star, MapPin, CheckCircle, Trophy, Users, ThumbsUp } from 'lucide-react';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { CTABanner } from '@/components/sections/CTABanner';
import { BUSINESS } from '@/lib/constants';
import type { Review } from '@/types';

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <ScrollReveal delay={index * 0.06}>
      <Card padding="lg" className="h-full flex flex-col">
        {/* Stars */}
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < review.rating ? 'text-amber fill-amber' : 'text-steel-lighter'
              }
            />
          ))}
        </div>

        {/* Testimonial */}
        <blockquote className="text-sm text-road leading-relaxed mb-4 flex-1">
          "{review.testimonial}"
        </blockquote>

        {/* Result badge */}
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle size={14} className="text-success" />
          <span className="text-xs font-medium text-success">{review.result}</span>
        </div>

        {/* Author */}
        <div className="pt-4 border-t border-steel-lighter">
          <div className="font-display font-semibold text-road text-sm">
            {review.student_name}
          </div>
          <div className="flex items-center gap-2 text-xs text-steel mt-0.5">
            <MapPin size={10} />
            {review.location}
            <span className="text-steel-light">•</span>
            {review.course_taken}
          </div>
        </div>
      </Card>
    </ScrollReveal>
  );
}

export default function ReviewsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => api.getReviews(),
  });

  return (
    <div className="w-full">
      {/* Page header with stats */}
      <section className="section-padding pb-8">
        <div className="section-container">
          <SectionHeading
            title="Student Reviews"
            subtitle="Real feedback from learners who trained with us. Every review is from a verified student."
          />

          {/* Summary stats */}
          {data && (
            <ScrollReveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-3xl mx-auto">
                <div className="text-center p-4 rounded-xl bg-white shadow-card">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star size={20} className="text-amber fill-amber" />
                    <span className="font-display text-2xl font-bold text-road">
                      {data.average_rating}
                    </span>
                  </div>
                  <span className="text-xs text-steel">Average Rating</span>
                </div>
                <div className="text-center p-4 rounded-xl bg-white shadow-card">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users size={20} className="text-steel" />
                    <span className="font-display text-2xl font-bold text-road">
                      {data.total}
                    </span>
                  </div>
                  <span className="text-xs text-steel">Total Reviews</span>
                </div>
                <div className="text-center p-4 rounded-xl bg-white shadow-card">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Trophy size={20} className="text-success" />
                    <span className="font-display text-2xl font-bold text-road">94%</span>
                  </div>
                  <span className="text-xs text-steel">Pass Rate</span>
                </div>
                <div className="text-center p-4 rounded-xl bg-white shadow-card">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <ThumbsUp size={20} className="text-amber" />
                    <span className="font-display text-2xl font-bold text-road">
                      {BUSINESS.googleReviewCount}+
                    </span>
                  </div>
                  <span className="text-xs text-steel">Google Reviews</span>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Reviews grid */}
      <section className="section-padding pt-4">
        <div className="section-container">
          {error ? (
            <div className="text-center py-12">
              <p className="text-steel">Failed to load reviews. Please try again later.</p>
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-64 rounded-card bg-steel-lighter/50 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.reviews.map((review, i) => (
                <ReviewCard key={review.id} review={review} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABanner
        title="Join 4,200+ Successful Learners"
        subtitle="Start your driving journey today. Our instructors are ready to help you pass with confidence."
      />
    </div>
  );
}
