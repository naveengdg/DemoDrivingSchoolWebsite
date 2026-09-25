/**
 * Vetri Driving Academy — Course Highlights & Practical Milestones
 * =================================================================
 * Role & Purpose:
 * - Provides structured learning goals, 4 practical milestones, and target learner demographics
 *   for each course in the academy.
 * - Displayed on CourseCards (Homepage) and CoursesPage to give prospective learners
 *   crystal-clear clarity on what skills they will master.
 */

export interface CourseHighlightInfo {
  goal: string;
  steps: string[];
  idealFor: string;
  badge?: string;
}

export const COURSE_HIGHLIGHTS: Record<string, CourseHighlightInfo> = {
  "LMV Car — Complete Beginner": {
    goal: "Zero experience to licensed solo driver",
    steps: [
      "Clutch biting-point & pedal coordination",
      "Hill starts & zero-stall vehicle control",
      "Live Madurai city & highway navigation",
      "RTO 'H' track & reverse parking test drills",
    ],
    idealFor: "First-time car drivers",
    badge: "Most Popular",
  },
  "LMV Car — Refresher Course": {
    goal: "Regain driving confidence after a break",
    steps: [
      "Overcome driving anxiety with dual controls",
      "Heavy city traffic & narrow road driving",
      "Reverse, parallel & basement parking practice",
      "Highway overtaking & night navigation",
    ],
    idealFor: "Licence holders needing confidence",
    badge: "Confidence Booster",
  },
  "Two-Wheeler — Beginner": {
    goal: "Master independent two-wheeler riding",
    steps: [
      "Balance & clutch-throttle coordination",
      "Geared motorcycle & automatic scooter practice",
      "RTO Figure-8 test clearance drills",
      "Defensive braking & city traffic safety",
    ],
    idealFor: "First-time riders & daily commuters",
    badge: "High Pass Rate",
  },
  "LMV Commercial — Taxi/Cab Licence": {
    goal: "Professional commercial badge certification",
    steps: [
      "Commercial badge RTO regulations & test",
      "Passenger safety & GPS route navigation",
      "Fuel-efficient city driving techniques",
      "Ola, Uber & fleet career readiness",
    ],
    idealFor: "Commercial cab & fleet drivers",
    badge: "Career Focused",
  },
  "HMV — Lorry/Bus Licence": {
    goal: "Heavy motor vehicle licence certification",
    steps: [
      "TATA 407 hands-on heavy vehicle training",
      "Air brake systems & pre-trip safety checks",
      "Wide-turn geometry & mirror reversing",
      "TN-58 RTO commercial licence clearance",
    ],
    idealFor: "Truck, bus & transport drivers",
    badge: "Heavy Vehicle",
  },
  "Automatic Car — Beginner": {
    goal: "Easy clutch-free city driving",
    steps: [
      "Zero-stall AMT automatic vehicle handling",
      "Steering control & smooth braking",
      "Effortless stop-and-go bumper traffic",
      "RTO test track manoeuvres & parking",
    ],
    idealFor: "Urban commuters & easy learners",
    badge: "Clutch-Free",
  },
};

export function getCourseHighlight(courseName: string): CourseHighlightInfo {
  if (COURSE_HIGHLIGHTS[courseName]) {
    return COURSE_HIGHLIGHTS[courseName];
  }
  const match = Object.keys(COURSE_HIGHLIGHTS).find((key) =>
    courseName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(courseName.toLowerCase())
  );
  if (match) {
    return COURSE_HIGHLIGHTS[match];
  }
  return {
    goal: "Structured hands-on driver training",
    steps: [
      "Vehicle controls & safety fundamentals",
      "One-on-one dual-control road practice",
      "RTO test track manoeuvres & parking",
      "Learner licence documentation support",
    ],
    idealFor: "All learners",
  };
}
