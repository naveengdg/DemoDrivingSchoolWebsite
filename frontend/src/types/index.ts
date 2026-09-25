/**
 * Vetri Driving Academy — Shared TypeScript Type Definitions
 * ==========================================================
 * Role & Purpose:
 * - Centralizes all data interfaces across the frontend for strict type safety.
 * - Includes:
 *     • Course & CourseListResponse (curriculum data from backend)
 *     • Review & ReviewListResponse (student testimonials from backend)
 *     • EnquiryPayload & EnquiryResponse (lead submission payload & confirmation receipt)
 *     • Static UI types (FleetVehicle, Instructor, ServiceOffering, ProcessStep)
 */

/* ── API Response Types ── */

export interface Course {
  id: number;
  name: string;
  licence_category: string;
  duration_days: number;
  sessions_included: number;
  session_duration_minutes: number;
  vehicle_type: string;
  rto_test_prep: boolean;
  learner_licence_assistance: boolean;
  fee_amount: number;
  instalment_available: boolean;
  description: string;
}

export interface CourseListResponse {
  courses: Course[];
  total: number;
}

export interface Review {
  id: number;
  student_name: string;
  location: string;
  rating: number;
  course_taken: string;
  testimonial: string;
  result: string;
  created_at: string;
}

export interface ReviewListResponse {
  reviews: Review[];
  total: number;
  average_rating: number;
}

export interface EnquiryPayload {
  name: string;
  phone: string;
  email?: string;
  course_interest: string;
  message?: string;
  source_page: string;
}

export interface EnquiryResponse {
  id: number;
  name: string;
  phone: string;
  course_interest: string;
  status: string;
  owner_email?: string;
  notification_sent?: boolean;
}

/* ── Static Content Types ── */

export interface Instructor {
  name: string;
  role: string;
  experience: string;
  specialization: string;
  certifications: string[];
  bio: string;
  image?: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface FleetVehicle {
  type: string;
  count: number;
  models: string;
  transmission: string;
  image?: string;
  tagline?: string;
  features?: string[];
  safetyBadge?: string;
}

export interface NavLink {
  label: string;
  path: string;
}

export interface ServiceOffering {
  title: string;
  description: string;
  features: string[];
  icon: string;
  tag?: string;
  priceNote?: string;
}
