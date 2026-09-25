/**
 * Vetri Driving Academy — Hero Section Component
 * ===============================================
 * Role & Purpose:
 * - High-impact visual hero section on the homepage.
 * - Features staggered entrance animations, trust badge (4,200+ learners), primary CTAs,
 *   rating proof (4.8 stars on Google), 94% RTO first-attempt pass stat, and the certified training car background.
 * - Displays a floating "Academy Snapshot" and pricing highlight badge on desktop viewports.
 */

import { motion } from 'framer-motion';
import { Phone, ArrowRight, Star, Shield, Users, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BUSINESS, STATS } from '@/lib/constants';

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden lg:min-h-[88vh] lg:flex lg:items-center">
      {/* Fitted Hero Background Image & Crisp Directional Scrim */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="/hero_bg.jpg?v=3"
          alt="Vetri Driving Academy Training Car"
          className="w-full h-full object-cover object-center sm:object-[68%_center] lg:object-[72%_center] filter contrast-[1.04] brightness-[1.01] saturate-[1.05] transition-transform duration-1000"
        />

        {/* Directional scrims: deep contrast on left for typography, crystal clear view of car on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/95 md:via-cream/85 lg:via-cream/65 lg:to-transparent" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-cream/70 via-cream/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-cream via-cream/80 to-transparent" />

        {/* Ambient subtle warm glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber/20 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10 py-8 sm:py-16 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
          {/* Left Column: Heading, Subhead, CTAs, Trust bar with high-contrast styling */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 xl:col-span-7"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/90 text-road text-xs sm:text-sm font-bold mb-4 sm:mb-6 border border-amber/40 shadow-sm">
                <Shield size={15} className="text-amber-dark shrink-0" />
                Trusted by 4,200+ learners since 2012
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-display text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-road leading-[1.15] text-balance tracking-tight drop-shadow-sm"
            >
              From First Gear to{' '}
              <span className="gradient-text">Full Licence</span>
            </motion.h1>

            {/* Subheadline - crisp contrast and depth */}
            <motion.p
              variants={fadeUp}
              className="mt-3.5 sm:mt-6 text-sm sm:text-lg text-road/80 font-medium max-w-xl leading-relaxed"
            >
              Certified driving training in Madurai — car, two-wheeler, and commercial vehicle.
              Structured courses, transparent pricing, and a 94% RTO first-attempt pass rate.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <a
                href={`tel:${BUSINESS.phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl
                         bg-amber text-road font-bold text-sm sm:text-base
                         hover:bg-amber-dark transition-all duration-200
                         active:scale-[0.97] shadow-lg shadow-amber/25 hover:shadow-xl hover:shadow-amber/35"
              >
                <Phone size={18} />
                Call Now — Enrol Today
              </a>
              <Link
                to="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl
                         backdrop-blur-md bg-white/70 border-2 border-road text-road font-bold text-sm sm:text-base
                         hover:bg-road hover:text-cream transition-all duration-200
                         active:scale-[0.97] shadow-sm hover:shadow-md"
              >
                View Courses & Pricing
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            {/* Trust bar — crisp frosted glass pill */}
            <motion.div
              variants={fadeUp}
              className="mt-6 sm:mt-10 inline-flex flex-wrap items-center gap-3 sm:gap-5 px-4 py-2.5 rounded-2xl backdrop-blur-md bg-white/80 border border-white/90 shadow-sm text-xs sm:text-sm"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-amber fill-amber sm:w-4 sm:h-4"
                    />
                  ))}
                </div>
                <span className="font-bold text-road">
                  {BUSINESS.googleRating}
                </span>
                <span className="text-road/65 font-medium">
                  ({BUSINESS.googleReviewCount}+ reviews)
                </span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-steel-lighter" />
              <div className="flex items-center gap-1.5">
                <Trophy size={14} className="text-success" />
                <span className="font-bold text-road">94% RTO Pass</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-steel-lighter" />
              <div className="flex items-center gap-1.5">
                <Users size={14} className="text-steel" />
                <span className="font-bold text-road">8 Certified Instructors</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Floating Highlights that complement the car visual */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end lg:self-start lg:pt-2 w-full mt-4 lg:mt-0"
          >
            <div className="w-full max-w-xs sm:max-w-sm">
              {/* Snapshot Card */}
              <div className="backdrop-blur-xl bg-white/95 rounded-2xl shadow-2xl border border-white/90 p-4 sm:p-5 mb-3 sm:mb-4 transition-all duration-300 hover:shadow-card-hover hover:bg-white">
                <div className="mb-3 pb-2 border-b border-steel-lighter/50 flex items-center justify-between">
                  <div className="text-xs font-bold text-road tracking-wide uppercase">Academy Snapshot</div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-success/15 text-success border border-success/30">
                    Govt. Approved
                  </span>
                </div>
                <div className="space-y-2.5">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="flex justify-between items-center">
                      <span className="text-xs text-road/80 font-medium">{stat.label}</span>
                      <span className="font-display font-bold text-road text-sm sm:text-base">
                        {stat.prefix}{stat.value}{stat.suffix}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Callout */}
              <div className="backdrop-blur-xl bg-road/95 rounded-2xl p-4 sm:p-5 text-cream shadow-2xl border border-white/20 relative overflow-hidden">
                <div className="text-[11px] sm:text-xs text-cream/70 mb-0.5">Courses starting from</div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-amber">₹4,800</div>
                <div className="text-[11px] sm:text-xs text-cream/80 mt-1 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-success inline-block shadow-sm shadow-success" />
                  All inclusive — dual-control fleet training
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
