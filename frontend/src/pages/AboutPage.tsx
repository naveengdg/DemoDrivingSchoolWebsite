/**
 * Vetri Driving Academy — About Academy & Instructors Page
 * ========================================================
 * Role & Purpose:
 * - Introduces the academy's 14-year heritage, mission, and RTO-certified credentials in Madurai.
 * - Showcases the 8 certified professional instructors with portraits, teaching specializations,
 *   years of experience, and government badges.
 * - Highlights core values: dual-control safety, patient teaching, and zero hidden fee policy.
 */

import { Award, Clock, Users, Shield, MapPin, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { CTABanner } from '@/components/sections/CTABanner';
import { INSTRUCTORS, BUSINESS } from '@/lib/constants';
import type { Instructor } from '@/types';

function InstructorCard({ instructor, index }: { instructor: Instructor; index: number }) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <Card
        padding="md"
        className="h-full flex flex-col border border-steel-lighter/80 hover:border-amber/50 hover:shadow-card-hover transition-all duration-300 group overflow-hidden"
      >
        {/* Instructor Photo */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3.5 bg-cream-dark">
          {instructor.image ? (
            <img
              src={instructor.image}
              alt={instructor.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-road text-cream font-bold text-2xl">
              {instructor.name.split(' ').map((n) => n[0]).join('')}
            </div>
          )}

          {/* Experience tag */}
          <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-road/85 backdrop-blur-md text-cream font-bold text-xs shadow-sm">
            {instructor.experience}
          </span>
        </div>

        {/* Name & Role */}
        <h3 className="font-display text-lg font-bold text-road mb-0.5 group-hover:text-amber-dark transition-colors">
          {instructor.name}
        </h3>
        <p className="text-xs font-semibold text-amber-dark mb-1.5">{instructor.role}</p>

        {/* Specialization */}
        <div className="text-xs text-steel font-medium mb-3 flex items-center gap-1.5">
          <CheckCircle2 size={13} className="text-success shrink-0" />
          <span className="truncate">{instructor.specialization}</span>
        </div>

        {/* Crisp, Precise Description */}
        <p className="text-xs sm:text-sm text-road/80 leading-relaxed mb-4">
          {instructor.bio}
        </p>

        {/* Certifications badges */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-steel-lighter/60">
          {instructor.certifications.map((cert) => (
            <Badge key={cert} variant="steel" size="sm">
              {cert}
            </Badge>
          ))}
        </div>
      </Card>
    </ScrollReveal>
  );
}

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Our Story & Academy Overview */}
      <section className="section-padding pb-8 sm:pb-12">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Story text — crisp, not overloaded */}
            <ScrollReveal>
              <div>
                <Badge variant="amber" size="md">Established {BUSINESS.established}</Badge>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-road mt-3 mb-5 text-balance">
                  Madurai's Trusted Driving Academy
                </h1>

                <p className="text-sm sm:text-base text-road/85 leading-relaxed mb-4">
                  Founded in 2012 by certified instructor Murugan S., Vetri Driving Academy
                  was built on structured, step-by-step training instead of guesswork.
                </p>

                <p className="text-sm sm:text-base text-road/85 leading-relaxed mb-6">
                  Over the past 14 years, we have trained more than <strong>4,200+ students</strong> with
                  a proven <strong>94% first-attempt RTO pass rate</strong> across Madurai and surrounding districts.
                </p>

                {/* Key Academy Metrics */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-steel-lighter/70">
                  <div className="p-3 rounded-xl bg-cream-dark/60 border border-steel-lighter/50">
                    <div className="font-display text-2xl font-bold text-road">14+</div>
                    <div className="text-xs text-steel">Years Service</div>
                  </div>
                  <div className="p-3 rounded-xl bg-cream-dark/60 border border-steel-lighter/50">
                    <div className="font-display text-2xl font-bold text-road">4,200+</div>
                    <div className="text-xs text-steel">Graduates</div>
                  </div>
                  <div className="p-3 rounded-xl bg-cream-dark/60 border border-steel-lighter/50">
                    <div className="font-display text-2xl font-bold text-road">94%</div>
                    <div className="text-xs text-steel">RTO Pass Rate</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Core Values Cards */}
            <ScrollReveal delay={0.12}>
              <div className="space-y-3 sm:space-y-3.5">
                {[
                  {
                    icon: <Shield size={20} className="text-amber" />,
                    title: 'Dual-Control Fleet Safety',
                    desc: 'All cars are fitted with instructor-side dual pedals for 100% safe training.',
                  },
                  {
                    icon: <Award size={20} className="text-amber" />,
                    title: 'Structured Step-by-Step Training',
                    desc: 'Clear session milestones: clutch control, traffic navigation, and RTO track drills.',
                  },
                  {
                    icon: <Users size={20} className="text-amber" />,
                    title: 'Dedicated Women & Senior Batches',
                    desc: 'Female-led training slots and patient instruction tailored for nervous beginners.',
                  },
                  {
                    icon: <Clock size={20} className="text-amber" />,
                    title: 'Transparent, All-Inclusive Fees',
                    desc: 'No hidden charges. RTO paperwork, test preparation, and vehicle maintenance included.',
                  },
                ].map((value) => (
                  <Card key={value.title} hover={false} padding="sm" className="border border-steel-lighter/70">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center shrink-0">
                        {value.icon}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-road text-sm sm:text-base mb-0.5">{value.title}</h3>
                        <p className="text-xs sm:text-sm text-steel">{value.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Founder Voice — Compact with Photo */}
      <section className="section-padding py-10 sm:py-14 bg-cream-dark/60 border-y border-steel-lighter/60">
        <div className="section-container">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              {/* Founder Image */}
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber mx-auto mb-4 shadow-md">
                <img
                  src="/instructors/murugan.jpg"
                  alt="Murugan S. - Founder"
                  className="w-full h-full object-cover"
                />
              </div>

              <blockquote className="text-base sm:text-lg text-road leading-relaxed font-medium mb-4">
                "Our mission is simple: every learner who joins us should graduate as a safe,
                confident, and independent driver on real roads — not just someone who cleared a test."
              </blockquote>

              <div>
                <div className="font-display font-bold text-road">Murugan S.</div>
                <div className="text-xs text-steel">Founder & Chief Driving Instructor</div>
                <div className="flex items-center justify-center gap-1 text-[11px] text-steel mt-0.5">
                  <MapPin size={11} className="text-amber-dark" />
                  Madurai, Tamil Nadu
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Instructor Team with Photos & Crisp Bios */}
      <section className="section-padding">
        <div className="section-container">
          <SectionHeading
            title="Meet Our Certified Instructors"
            subtitle="Experienced, government-certified trainers dedicated to your first-attempt RTO success."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSTRUCTORS.map((instructor, i) => (
              <InstructorCard key={instructor.name} instructor={instructor} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Start Your Training with Certified Instructors"
        subtitle="Friendly, patient, and experienced guidance tailored to your schedule."
      />
    </div>
  );
}
