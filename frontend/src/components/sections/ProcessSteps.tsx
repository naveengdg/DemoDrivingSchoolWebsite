/**
 * Vetri Driving Academy — Learning Process & Roadmap Section
 * ==========================================================
 * Role & Purpose:
 * - Details the 4-step journey to getting a driving license:
 *     1. Free Consultation & Scheduling
 *     2. Learner's Licence (LLR) Document Assistance
 *     3. Practical Dual-Control Behind-the-Wheel Training
 *     4. Official RTO Driving Test & Permanent Smart Card Licence Issuance
 */

import { Phone, ClipboardCheck, Car, Award } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { PROCESS_STEPS } from '@/lib/constants';
import type { ProcessStep } from '@/types';

const iconMap: Record<string, React.ReactNode> = {
  phone: <Phone size={24} className="text-amber" />,
  'clipboard-check': <ClipboardCheck size={24} className="text-amber" />,
  car: <Car size={24} className="text-amber" />,
  award: <Award size={24} className="text-amber" />,
};

function Step({ step, index }: { step: ProcessStep; index: number }) {
  return (
    <ScrollReveal delay={index * 0.12}>
      <div className="relative flex flex-col items-center text-center">
        {/* Step number + icon */}
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-2xl bg-amber/10 flex items-center justify-center">
            {iconMap[step.icon]}
          </div>
          <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-road text-cream
                         text-xs font-bold flex items-center justify-center">
            {step.step}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold text-road mb-2">
          {step.title}
        </h3>
        <p className="text-sm text-steel leading-relaxed">
          {step.description}
        </p>

        {/* Connector line (not on last item) */}
        {index < PROCESS_STEPS.length - 1 && (
          <div className="hidden lg:block absolute top-8 left-[calc(100%+0.5rem)] w-[calc(100%-1rem)]
                        h-px bg-steel-lighter" />
        )}
      </div>
    </ScrollReveal>
  );
}

export function ProcessSteps() {
  return (
    <section className="section-padding bg-cream-dark">
      <div className="section-container">
        <SectionHeading
          title="How We Work"
          subtitle="Four simple steps from enquiry to licence — we handle the complexity so you can focus on learning."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {PROCESS_STEPS.map((step, i) => (
            <Step key={step.step} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
