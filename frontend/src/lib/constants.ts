/**
 * Vetri Driving Academy — Core Business Information & Static Constants
 * ====================================================================
 * Role & Purpose:
 * - Single source of truth for business contact information:
 *     • Business name, branch addresses, operational hours, official phone, email.
 *     • WhatsApp direct-chat deep link, social handles, Google Maps embed URL.
 *     • Verified Academy stats (students trained, 94% RTO pass rate, 14 years exp).
 *     • Fleet specifications (Manual, Automatic, Two-Wheeler, Heavy Vehicle).
 *     • Certified instructors list with bios and RTO credentials.
 *     • Comprehensive service catalog, license preparation timetable, and FAQ items.
 */

import type {
  Instructor,
  StatItem,
  ProcessStep,
  FleetVehicle,
  NavLink,
  ServiceOffering,
} from '@/types';

/* ── Navigation ── */

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Courses & Pricing', path: '/courses' },
  { label: 'Services', path: '/services' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

/* ── Business Info ── */

export const BUSINESS = {
  name: 'Vetri Driving Academy',
  tagline: 'From First Gear to Full Licence — Pass With Confidence.',
  phone: '+919876543210',
  phoneDisplay: '+91 98765 43210',
  email: 'naveenkanakaraj2023@gmail.com',
  address: '45, Bypass Road, Near Mattuthavani Bus Stand, Madurai - 625007, Tamil Nadu',
  city: 'Madurai',
  state: 'Tamil Nadu',
  established: 2012,
  rtoCode: 'TN-58',
  googleRating: 4.8,
  googleReviewCount: 340,
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.177!2d78.1198!3d9.9252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c5b2e3b7e8a1%3A0x1234567890abcdef!2sMadurai%2C+Tamil+Nadu!5e0!3m2!1sen!2sin!4v1700000000000',
  socialLinks: {
    instagram: 'https://instagram.com/vetridriving',
    facebook: 'https://facebook.com/vetridriving',
    youtube: 'https://youtube.com/@vetridriving',
    whatsapp: 'https://wa.me/919876543210',
  },
} as const;

/* ── Statistics ── */

export const STATS: StatItem[] = [
  { label: 'Students Trained', value: 4200, suffix: '+' },
  { label: 'RTO Pass Rate', value: 94, suffix: '%' },
  { label: 'Years of Experience', value: 14, suffix: '' },
  { label: 'Certified Instructors', value: 8, suffix: '' },
];

/* ── Instructors ── */

export const INSTRUCTORS: Instructor[] = [
  {
    name: 'Murugan S.',
    role: 'Founder & Chief Instructor',
    experience: '18 years',
    specialization: 'Car & Heavy Vehicle (HMV)',
    image: '/instructors/murugan.jpg',
    certifications: ['RTO Certified', 'Master Trainer'],
    bio: 'Head trainer specializing in clutch control, hill starts, and first-attempt RTO test clearance.',
  },
  {
    name: 'Priya R.',
    role: 'Senior Instructor',
    experience: '12 years',
    specialization: 'Automatic Cars & Women Learners',
    image: '/instructors/priya.jpg',
    certifications: ['RTO Certified', 'Defensive Driving'],
    bio: 'Patient trainer focused on stress-free city driving and confidence building for beginners.',
  },
  {
    name: 'Karthik V.',
    role: 'Two-Wheeler Specialist',
    experience: '8 years',
    specialization: 'Bikes & Scooters',
    image: '/instructors/karthik.jpg',
    certifications: ['RTO Certified', 'Track Safety'],
    bio: 'Teaches slow-riding balance, RTO figure-8 clearance, and defensive road safety.',
  },
  {
    name: 'Ravi M.',
    role: 'Commercial Vehicle Trainer',
    experience: '10 years',
    specialization: 'Taxi, Cab & Highway Driving',
    image: '/instructors/ravi.jpg',
    certifications: ['RTO Certified', 'Commercial Badge'],
    bio: 'Prepares commercial drivers for fleet careers, high-mileage safety, and highway navigation.',
  },
];

/* ── Fleet ── */

export const FLEET: FleetVehicle[] = [
  {
    type: 'Manual Cars',
    count: 6,
    models: 'Maruti Suzuki Swift & Hyundai Grand i10',
    transmission: '5-Speed Manual with Dual Pedals',
    image: '/fleet/manual-car.jpg',
    tagline: 'Dual-control hatchback training fleet',
    safetyBadge: 'Dual-Control Certified',
    features: [
      'Dual-brake & clutch instructor pedals',
      'Power steering with easy city manoeuvrability',
      'Air-conditioned cabin for comfortable sessions',
      'Speed governor fitted & RTO test approved',
    ],
  },
  {
    type: 'Automatic Cars',
    count: 2,
    models: 'Maruti Suzuki Celerio AMT',
    transmission: 'Automatic Transmission (Clutch-Free)',
    image: '/fleet/automatic-car.jpg',
    tagline: 'Stress-free clutchless city driving',
    safetyBadge: 'Zero-Stall AMT',
    features: [
      'Instructor-side secondary emergency brake',
      'Zero risk of engine stalling in traffic',
      'Rear parking sensors & compact turning circle',
      'Ideal for women learners & urban commuters',
    ],
  },
  {
    type: 'Two-Wheelers',
    count: 4,
    models: 'Honda Activa 6G & Bajaj Pulsar 150',
    transmission: 'Automatic Scooter & Geared Motorcycle',
    image: '/fleet/two-wheeler.jpg',
    tagline: 'Geared & non-geared balance training',
    safetyBadge: 'Crash-Guard Protected',
    features: [
      'Reinforced perimeter tubular safety crash guards',
      'Clean ISI-certified helmets provided on-site',
      'Low seat height for confident ground reach',
      'Exclusive private Figure-8 practice ground',
    ],
  },
  {
    type: 'Heavy Vehicles',
    count: 1,
    models: 'TATA 407 Commercial Truck',
    transmission: 'Commercial Grade Manual Gearbox',
    image: '/fleet/heavy-truck.jpg',
    tagline: 'Commercial badge & lorry training',
    safetyBadge: 'Pneumatic Air Brakes',
    features: [
      'Dual pneumatic air brake safety systems',
      'Wide-angle convex training mirrors',
      'High driver cabin visibility for reversing',
      'Official TN-58 Madurai RTO test certified',
    ],
  },
];

/* ── Process Steps ── */

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: 'Contact & Enquiry',
    description: 'Call us, WhatsApp, or fill the online form. We will understand your licence requirements and recommend the right course.',
    icon: 'phone',
  },
  {
    step: 2,
    title: 'Course Selection & Payment',
    description: 'Choose your course, pick a convenient training schedule, and pay the fee. Instalment options available for courses above ₹8,000.',
    icon: 'clipboard-check',
  },
  {
    step: 3,
    title: 'Training & RTO Preparation',
    description: 'Attend structured driving sessions with your assigned instructor. Practice on our ground and in real traffic. Mock RTO tests included.',
    icon: 'car',
  },
  {
    step: 4,
    title: 'RTO Test & Licence',
    description: 'We assist with learner licence application, accompany you to the RTO for the driving test, and help with permanent licence processing.',
    icon: 'award',
  },
];

/* ── Services ── */

export const SERVICES: ServiceOffering[] = [
  {
    title: 'Complete Beginner Training',
    description: 'Structured multi-week courses for first-time drivers covering LMV, two-wheeler, and automatic car categories.',
    tag: 'Most Popular',
    priceNote: 'Courses from ₹4,800',
    features: [
      'Dedicated private practice ground sessions',
      'Progressive road training — colony to highway',
      'Dual-control vehicles for instructor safety',
      'Printed session-by-session roadmap on Day 1',
    ],
    icon: 'graduation-cap',
  },
  {
    title: 'RTO Test Preparation',
    description: 'Focused preparation for the Tamil Nadu RTO driving test, including mock tests on the actual test track layout.',
    tag: '94% First-Time Pass',
    priceNote: 'Included in courses or standalone',
    features: [
      'Mock test on real RTO track layout (TN-58)',
      'Figure-8, slalom, and reverse parking practice',
      'Test-day briefing and common mistake reviews',
      'Complete Learner Licence paperwork assistance',
    ],
    icon: 'target',
  },
  {
    title: 'Refresher & Confidence Training',
    description: "For licence holders who haven't driven in years. Rebuild confidence with tailored sessions.",
    tag: 'Confidence Booster',
    priceNote: '10-Session Quick Refresh',
    features: [
      'Flexible scheduling — weekday or weekend slots',
      'Heavy city traffic & narrow street handling',
      'Choice of manual gear or automatic vehicle',
      'Night driving & multi-level basement parking',
    ],
    icon: 'refresh-cw',
  },
  {
    title: 'Commercial Vehicle Training',
    description: 'Specialized training for commercial LMV (taxi/cab) and HMV (lorry/bus) licences required for professional driving careers.',
    tag: 'Career Focused',
    priceNote: 'Ola / Uber / Logistics Ready',
    features: [
      'LMV Commercial (Yellow board) & HMV programmes',
      'Transport authority interview preparation',
      'Fuel-efficient driving & digital map navigation',
      'Placement guidance for ride-share and fleets',
    ],
    icon: 'truck',
  },
  {
    title: "Women's Driving Programme",
    description: "Dedicated training environment designed for women learners with women-only practice slots and a patient, confidence-first approach.",
    tag: 'Women-Led Slots',
    priceNote: 'Certified Female Instructor',
    features: [
      'Women-only batch timings (Tue & Thu mornings)',
      'Female instructor guidance (Priya R.)',
      'Low-stress vehicle familiarization start',
      'Safe, supportive, zero-pressure atmosphere',
    ],
    icon: 'shield-check',
  },
  {
    title: 'Hourly Lessons & Block Bookings',
    description: 'Need a few extra sessions instead of a full course? Book individual hours or blocks of 5/10 sessions at discounted rates.',
    tag: 'Pay As You Go',
    priceNote: 'Starting at ₹600 / Hour',
    features: [
      'Single session: ₹600/hour (no lock-in)',
      'Block of 5 sessions: ₹2,800 (save ₹200)',
      'Block of 10 sessions: ₹5,400 (save ₹600)',
      'Available for all vehicle types & transmissions',
    ],
    icon: 'clock',
  },
];

/* ── Course category labels for filter ── */

export const COURSE_CATEGORIES = [
  { value: '', label: 'All Courses' },
  { value: 'LMV', label: 'Car (LMV)' },
  { value: 'Two-Wheeler', label: 'Two-Wheeler' },
  { value: 'LMV Commercial', label: 'Commercial (LMV)' },
  { value: 'HMV', label: 'Heavy Vehicle (HMV)' },
];
