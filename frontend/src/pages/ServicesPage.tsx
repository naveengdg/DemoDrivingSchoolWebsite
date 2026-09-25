/**
 * Vetri Driving Academy — Comprehensive Services & FAQ Page
 * ==========================================================
 * Role & Purpose:
 * - Details all professional driving services: LLR document assistance, road safety theory,
 *   RTO test mock drills, dual-control fleet training, and commercial badge licensing.
 * - Displays training timetables, key academy advantages, interactive FAQ accordion,
 *   and process steps.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Target,
  RefreshCw,
  Truck,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ArrowRight,
  Calendar,
  ChevronDown,
  Shield,
  Sparkles,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { CTABanner } from '@/components/sections/CTABanner';
import { SERVICES, BUSINESS } from '@/lib/constants';
import type { ServiceOffering } from '@/types';

const iconMap: Record<string, React.ReactNode> = {
  'graduation-cap': <GraduationCap size={24} className="text-amber-dark" />,
  target: <Target size={24} className="text-amber-dark" />,
  'refresh-cw': <RefreshCw size={24} className="text-amber-dark" />,
  truck: <Truck size={24} className="text-amber-dark" />,
  'shield-check': <ShieldCheck size={24} className="text-amber-dark" />,
  clock: <Clock size={24} className="text-amber-dark" />,
};

function ServiceCard({ service, index }: { service: ServiceOffering; index: number }) {
  return (
    <ScrollReveal delay={index * 0.07}>
      <Card
        padding="lg"
        className="h-full flex flex-col border border-steel-lighter/80 hover:border-amber/50 hover:shadow-card-hover transition-all duration-300 group"
      >
        {/* Top Header: Icon & Category Tag */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="w-12 h-12 rounded-xl bg-amber/15 flex items-center justify-center shrink-0 group-hover:bg-amber/25 transition-colors">
            {iconMap[service.icon] || <GraduationCap size={24} className="text-amber-dark" />}
          </div>
          {service.tag && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber/15 text-road border border-amber/30">
              <Sparkles size={11} className="text-amber-dark" />
              {service.tag}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-road mb-1 group-hover:text-amber-dark transition-colors">
          {service.title}
        </h3>

        {/* Price / Scope Note */}
        {service.priceNote && (
          <p className="text-xs font-semibold text-amber-dark mb-3">
            {service.priceNote}
          </p>
        )}

        {/* Description */}
        <p className="text-sm text-road/80 leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Features Checklist */}
        <ul className="space-y-2.5 mb-6">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-road/90">
              <CheckCircle2 size={15} className="text-success shrink-0 mt-0.5" />
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Direct Action Button to Contact / Enquiry */}
        <div className="mt-auto pt-4 border-t border-steel-lighter/60">
          <Link
            to={`/contact?course=${encodeURIComponent(service.title)}`}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl
                     bg-amber/15 hover:bg-amber text-road font-bold text-xs sm:text-sm
                     transition-all duration-200 active:scale-95 group-hover:shadow-sm"
          >
            <span>Enquire / Book This Service</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </Card>
    </ScrollReveal>
  );
}

const FAQS = [
  {
    q: 'Do I need my own car or two-wheeler for training?',
    a: 'No. All practical lessons take place in our certified dual-control academy vehicles (manual cars, automatics, bikes, and trucks) fully insured with instructor backup pedals.',
  },
  {
    q: 'How does Learner Licence (LL) assistance work?',
    a: 'We submit your online Parivahan application, upload age and address documents, and book your RTO slot. We also provide road sign study material for the computer test.',
  },
  {
    q: 'What if I need to cancel or reschedule a session?',
    a: 'We provide free rescheduling as long as you notify your instructor or the office at least 24 hours in advance. You never lose your paid class.',
  },
  {
    q: 'Are female instructors available for women learners?',
    a: 'Yes. Senior instructor Priya R. conducts specialized women-only slots every Tuesday and Thursday morning in a patient, low-stress environment.',
  },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* Header & Trust Strip */}
      <section className="section-padding pb-6 sm:pb-10">
        <div className="section-container">
          <SectionHeading
            title="Our Driver Training Services"
            subtitle="Certified, structured driver training tailored for every stage — from absolute beginners to commercial fleet professionals."
          />

          {/* Trust Highlights Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-4">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-steel-lighter/80 shadow-xs">
              <Shield size={18} className="text-amber-dark shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-road">100% Dual Controls</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-steel-lighter/80 shadow-xs">
              <Clock size={18} className="text-amber-dark shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-road">Flexible 6AM–7PM</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-steel-lighter/80 shadow-xs">
              <ShieldCheck size={18} className="text-success shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-road">Women-Only Batches</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-steel-lighter/80 shadow-xs">
              <Target size={18} className="text-amber-dark shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-road">94% RTO Pass Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding pt-0">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How We Work: 4 Process Steps */}
      <ProcessSteps />

      {/* Schedule & Inclusions Breakdown */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Card 1: Timetable & Batch Schedules */}
            <ScrollReveal>
              <Card padding="lg" className="h-full flex flex-col border border-steel-lighter/80">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber/15 flex items-center justify-center">
                    <Calendar size={20} className="text-amber-dark" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-road">
                      Training Timetable & Batches
                    </h3>
                    <p className="text-xs text-steel">Convenient morning, evening, and weekend slots</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm mb-6 divide-y divide-steel-lighter/60">
                  <div className="flex justify-between items-center py-2.5">
                    <span className="text-steel font-medium">Monday – Saturday Regular Batches</span>
                    <span className="font-bold text-road bg-cream-dark px-2.5 py-1 rounded-md">6:00 AM – 7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5">
                    <span className="text-steel font-medium">Sunday Weekend Intensive</span>
                    <span className="font-bold text-road bg-cream-dark px-2.5 py-1 rounded-md">7:00 AM – 12:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5">
                    <span className="text-steel font-medium">Women-Only Batches (Priya R.)</span>
                    <span className="font-bold text-success bg-success-light px-2.5 py-1 rounded-md">Tue & Thu 8–10 AM</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5">
                    <span className="text-steel font-medium">Working Professionals Evening Batch</span>
                    <span className="font-bold text-road bg-cream-dark px-2.5 py-1 rounded-md">4:00 PM – 7:00 PM</span>
                  </div>
                </div>

                <div className="mt-auto p-3.5 rounded-xl bg-amber/10 border border-amber/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-xs text-road font-medium">
                    Need a custom slot? We arrange tailored timings around your commute.
                  </span>
                  <Link
                    to="/contact"
                    className="shrink-0 text-xs font-bold text-road bg-amber hover:bg-amber-dark px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Request Slot
                  </Link>
                </div>
              </Card>
            </ScrollReveal>

            {/* Card 2: Included with Every Service */}
            <ScrollReveal delay={0.1}>
              <Card padding="lg" className="h-full flex flex-col border border-steel-lighter/80">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-success-light flex items-center justify-center">
                    <ShieldCheck size={20} className="text-success" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-road">
                      The Vetri Quality Standard
                    </h3>
                    <p className="text-xs text-steel">Included free in every driving programme</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {[
                    'Dual-control vehicle for all sessions',
                    'Official TN RTO mock track tests',
                    'Learner Licence paperwork support',
                    'Road sign & theory test training',
                    '1-on-1 certified instructor dedicated',
                    'Full vehicle & passenger insurance',
                    'Session roadmap given on Day 1',
                    'Free reschedule with 24h notice',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-road/85">
                      <CheckCircle2 size={15} className="text-success shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto p-3.5 rounded-xl bg-cream-dark border border-steel-lighter/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-road font-semibold">
                    <Badge variant="success" size="sm">Zero Hidden Fees</Badge>
                    <span>All RTO forms & test-day assistance included</span>
                  </div>
                  <Link
                    to="/courses"
                    className="text-xs font-bold text-amber-dark hover:underline flex items-center gap-1"
                  >
                    View Pricing
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section-padding bg-cream/40">
        <div className="section-container">
          <SectionHeading
            title="Service FAQs"
            subtitle="Common questions about our licences, timings, and training procedures."
          />

          <div className="max-w-3xl mx-auto space-y-3 mt-8">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-steel-lighter/80 bg-white overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-display font-semibold text-road text-sm sm:text-base cursor-pointer hover:bg-cream-dark/30 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-steel shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-amber-dark' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-road/80 leading-relaxed border-t border-steel-lighter/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Banner */}
      <CTABanner
        title="Ready to Start Your Training?"
        subtitle="Call us or enquire online. We will confirm your preferred timing batch within 30 minutes."
      />
    </div>
  );
}
