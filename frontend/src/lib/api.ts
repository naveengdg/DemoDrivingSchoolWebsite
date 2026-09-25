/**
 * Vetri Driving Academy — Typed HTTP API Client
 * =============================================
 * Role & Purpose:
 * - Handles all HTTP network requests between the frontend and FastAPI backend.
 * - getCourses(category?): Fetches active driving courses.
 * - getCourseById(id): Fetches details for a single course.
 * - getReviews(limit): Fetches student ratings and testimonial data.
 * - submitEnquiry(payload): Posts student lead data with error parsing and status code handling.
 */

import type {
  CourseListResponse,
  ReviewListResponse,
  EnquiryPayload,
  EnquiryResponse,
  Course,
} from '@/types';

const API_ORIGIN = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || '';
const BASE_URL = `${API_ORIGIN}/api`;

interface ApiError {
  detail: string;
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorBody: ApiError = await response.json().catch(() => ({
        detail: `Request failed with status ${response.status}`,
      }));
      throw new Error(errorBody.detail);
    }

    return response.json() as Promise<T>;
  }

  /** Fetch all active courses, optionally filtered by licence category. */
  async getCourses(category?: string): Promise<CourseListResponse> {
    const params = category ? `?category=${encodeURIComponent(category)}` : '';
    return this.request<CourseListResponse>(`/courses${params}`);
  }

  /** Fetch a single course by ID. */
  async getCourse(id: number): Promise<Course> {
    return this.request<Course>(`/courses/${id}`);
  }

  /** Fetch reviews with optional limit. */
  async getReviews(limit?: number): Promise<ReviewListResponse> {
    const params = limit ? `?limit=${limit}` : '';
    return this.request<ReviewListResponse>(`/reviews${params}`);
  }

  /** Submit an enrolment enquiry. */
  async submitEnquiry(data: EnquiryPayload): Promise<EnquiryResponse> {
    return this.request<EnquiryResponse>('/enquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiClient();
