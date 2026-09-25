/**
 * Vetri Driving Academy — Training Fleet Showcase Section
 * ========================================================
 * Role & Purpose:
 * - Showcases the academy's 13 certified training vehicles:
 *     • Dual-control Manual Cars (Maruti Swift & Hyundai Grand i10)
 *     • Dual-control Automatic Cars (Maruti Celerio AMT)
 *     • Two-Wheelers with crash guards (Honda Activa & Bajaj Pulsar)
 *     • Heavy Commercial Vehicles (TATA 407 Commercial Truck)
 * - Displays high-resolution vehicle photography, transmission type, and key safety features.
 */

import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { FLEET } from '@/lib/constants';
import type { FleetVehicle } from '@/types';

function FleetCard({ vehicle, index }: { vehicle: FleetVehicle; index: number }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <Card
        padding="sm"
        className="h-full flex flex-col border border-steel-lighter/80 hover:border-amber/50 hover:shadow-card-hover transition-all duration-300 group overflow-hidden"
      >
        {/* Vehicle Image Banner — neatly fitted into the card box */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-cream-dark mb-3.5">
          {vehicle.image && (
            <img
              src={vehicle.image}
              alt={vehicle.models}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          )}

          {/* Safety feature badge */}
          {vehicle.safetyBadge && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-amber text-road font-bold text-[10px] shadow-sm">
              {vehicle.safetyBadge}
            </span>
          )}

          {/* Vehicle count pill */}
          <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-lg bg-road/85 backdrop-blur-md text-cream font-bold text-xs shadow-sm">
            {vehicle.count} {vehicle.count === 1 ? 'Vehicle' : 'Vehicles'}
          </span>
        </div>

        {/* Vehicle Type & Models */}
        <h3 className="font-display text-lg font-bold text-road mb-1 group-hover:text-amber-dark transition-colors">
          {vehicle.type}
        </h3>

        <div className="text-xs font-semibold text-amber-dark mb-1.5">
          {vehicle.models}
        </div>

        <div className="text-[11px] text-steel font-medium mb-3 flex items-center gap-1.5">
          <ShieldCheck size={13} className="text-success shrink-0" />
          <span>{vehicle.transmission}</span>
        </div>

        {/* Additional Vehicle Information & Specifications */}
        {vehicle.features && vehicle.features.length > 0 && (
          <div className="pt-3 border-t border-steel-lighter/60 mt-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-steel mb-2">
              Vehicle Highlights:
            </div>
            <ul className="space-y-1.5 text-xs text-road/85">
              {vehicle.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 size={13} className="text-success shrink-0 mt-0.5" />
                  <span className="leading-snug">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </ScrollReveal>
  );
}

export function FleetShowcase() {
  return (
    <section className="section-padding bg-cream/40">
      <div className="section-container">
        <SectionHeading
          title="Our Training Fleet"
          subtitle="Modern, certified vehicles equipped with instructor dual controls, safety guards, and AC cabins."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLEET.map((vehicle, i) => (
            <FleetCard key={vehicle.type} vehicle={vehicle} index={i} />
          ))}
        </div>

        {/* Total fleet summary */}
        <ScrollReveal className="mt-8 text-center">
          <p className="text-xs sm:text-sm text-steel">
            <span className="font-semibold text-road">13 certified training vehicles</span> across our fleet —
            all fitted with dual controls, fully commercial insured, and inspected daily before sessions.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
