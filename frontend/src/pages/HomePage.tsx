/**
 * Vetri Driving Academy — Homepage View
 * =====================================
 * Role & Purpose:
 * - The primary landing page designed for maximum conversion and first-impression credibility.
 * - Integrates dynamic course and review data fetched from the FastAPI backend via TanStack Query.
 * - Composes the full narrative:
 *     1. Hero (driving training branding, top "L" car visual, CTAs)
 *     2. Stats (animated metrics counters)
 *     3. CourseCards (most popular training programs)
 *     4. FleetShowcase (dual-control training vehicles)
 *     5. ProcessSteps (4-step road to getting a licence)
 *     6. TestimonialCarousel (verified student reviews)
 *     7. CTABanner (final conversion closing section)
 */

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { CourseCards } from '@/components/sections/CourseCards';
import { TestimonialCarousel } from '@/components/sections/TestimonialCarousel';
import { FleetShowcase } from '@/components/sections/FleetShowcase';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { CTABanner } from '@/components/sections/CTABanner';

export default function HomePage() {
  const { data: coursesData, isLoading: coursesLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: () => api.getCourses(),
  });

  const { data: reviewsData, isLoading: reviewsLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => api.getReviews(6),
  });

  return (
    <>
      <Hero />
      <Stats />
      <CourseCards
        courses={coursesData?.courses || []}
        loading={coursesLoading}
      />
      <FleetShowcase />
      <ProcessSteps />
      <TestimonialCarousel
        reviews={reviewsData?.reviews || []}
        loading={reviewsLoading}
      />
      <CTABanner />
    </>
  );
}
