/**
 * Vetri Driving Academy — Contact & Student Enrolment Page
 * =========================================================
 * Role & Purpose:
 * - High-conversion student enquiry page with direct email dispatch to the academy director.
 * - Clean mobile-optimized enquiry form: Name, Phone (10-digit validation), Email, Course Selection, Message.
 * - Dynamic pre-selection of courses when arriving from course cards ("Enrol Now").
 * - Clean post-submission success state with WhatsApp chat, direct call, and new enquiry reset.
 * - Displays physical academy location near Mattuthavani Bus Stand, interactive Google Map embed,
 *   working hours, and official phone numbers.
 */

import { useState, useEffect, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  MessageCircle,
} from 'lucide-react';
import { api } from '@/lib/api';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { BUSINESS } from '@/lib/constants';
import type { EnquiryPayload, EnquiryResponse } from '@/types';

interface FormErrors {
  name?: string;
  phone?: string;
  course_interest?: string;
}

interface SubmittedSummary {
  name: string;
  phone: string;
  email?: string;
  course: string;
  ownerEmail: string;
}

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const preselectedCourse = searchParams.get('course') || '';

  const [formData, setFormData] = useState<EnquiryPayload>({
    name: '',
    phone: '',
    email: '',
    course_interest: preselectedCourse,
    message: '',
    source_page: 'contact_page',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedSummary, setSubmittedSummary] = useState<SubmittedSummary | null>(null);

  useEffect(() => {
    const courseParam = searchParams.get('course');
    if (courseParam) {
      setFormData((prev) => ({ ...prev, course_interest: courseParam }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [searchParams]);

  // Fetch courses for the dropdown
  const { data: coursesData } = useQuery({
    queryKey: ['courses'],
    queryFn: () => api.getCourses(),
  });

  const courseOptions = (coursesData?.courses || []).map((c) => ({
    value: c.name,
    label: `${c.name} — ₹${c.fee_amount.toLocaleString('en-IN')}`,
  }));

  // Submit mutation
  const mutation = useMutation({
    mutationFn: (data: EnquiryPayload) => api.submitEnquiry(data),
  });

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Please enter your full name';
    }
    if (!formData.phone || !/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.course_interest) {
      newErrors.course_interest = 'Please select a course';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = { ...formData };

    mutation.mutate(payload, {
      onSuccess: (res: EnquiryResponse) => {
        setSubmittedSummary({
          name: payload.name,
          phone: payload.phone,
          email: payload.email,
          course: payload.course_interest,
          ownerEmail: res.owner_email || BUSINESS.email,
        });
        setFormData({
          name: '',
          phone: '',
          email: '',
          course_interest: '',
          message: '',
          source_page: 'contact_page',
        });
        setErrors({});
      },
    });
  };

  const updateField = (field: keyof EnquiryPayload, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="w-full">
      <section className="section-padding">
        <div className="section-container">
          <SectionHeading
            title="Contact & Enrolment"
            subtitle="Ready to start learning? Submit your query below and our team will get in touch with you shortly."
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form — takes 3 columns */}
            <ScrollReveal className="lg:col-span-3">
              <Card padding="lg">
                {mutation.isSuccess && submittedSummary ? (
                  <div className="py-4 text-center">
                    {/* Success Icon */}
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 border border-emerald-300">
                      <CheckCircle size={32} className="text-emerald-600" />
                    </div>

                    <h3 className="font-display text-2xl font-bold text-road">
                      Query Sent Successfully!
                    </h3>
                    <p className="text-steel text-sm max-w-sm mx-auto mt-1.5">
                      Thank you, <strong className="text-road">{submittedSummary.name}</strong>! Our team will get back to you shortly.
                    </p>

                    {/* Compact Details Summary */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 my-5 max-w-sm mx-auto text-left text-xs space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-steel">Course:</span>
                        <span className="font-semibold text-road truncate max-w-[200px]">{submittedSummary.course}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1.5 border-t border-slate-200/60">
                        <span className="text-steel">Mobile:</span>
                        <span className="font-semibold text-road">{submittedSummary.phone}</span>
                      </div>
                    </div>

                    {/* Mobile-friendly Action Buttons */}
                    <div className="max-w-sm mx-auto space-y-2.5">
                      <a
                        href={`https://wa.me/919876543210?text=${encodeURIComponent(
                          `Hello Vetri Driving Academy, I just submitted an enquiry for "${submittedSummary.course}". My name is ${submittedSummary.name} (${submittedSummary.phone}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-sm transition-all active:scale-[0.98]"
                      >
                        <MessageCircle size={18} />
                        <span>Chat on WhatsApp</span>
                      </a>

                      <a
                        href={`tel:${BUSINESS.phone}`}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber hover:bg-amber-dark text-road font-bold text-sm shadow-sm transition-all active:scale-[0.98]"
                      >
                        <Phone size={17} />
                        <span>Call Us ({BUSINESS.phoneDisplay})</span>
                      </a>

                      <Button
                        variant="outline"
                        size="md"
                        className="w-full mt-1"
                        onClick={() => {
                          setSubmittedSummary(null);
                          mutation.reset();
                        }}
                      >
                        Submit Another Query
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-6">
                      <h3 className="font-display text-xl font-bold text-road">
                        Enrolment Enquiry
                      </h3>
                      <p className="text-xs sm:text-sm text-steel mt-1">Send to the team</p>
                    </div>

                    <div className="space-y-4">
                      <Input
                        label="Full Name"
                        placeholder="Your full name"
                        required
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        error={errors.name}
                      />

                      <Input
                        label="Mobile Number"
                        placeholder="10-digit mobile number"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        error={errors.phone}
                      />

                      <Input
                        label="Email Address (Optional)"
                        placeholder="your@email.com"
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => updateField('email', e.target.value)}
                      />

                      <Select
                        label="Course Interest"
                        required
                        options={courseOptions}
                        placeholder="Select a course"
                        value={formData.course_interest}
                        onChange={(e) => updateField('course_interest', e.target.value)}
                        error={errors.course_interest}
                      />

                      <Textarea
                        label="Message (Optional)"
                        placeholder="Any questions or timing preferences..."
                        rows={3}
                        value={formData.message || ''}
                        onChange={(e) => updateField('message', e.target.value)}
                      />
                    </div>

                    {mutation.isError && (
                      <div className="mt-4 p-3 rounded-xl bg-red-50 flex items-start gap-2">
                        <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-red-600">
                          {mutation.error?.message || 'Something went wrong. Please try again.'}
                        </p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      fullWidth
                      size="lg"
                      className="mt-6 shadow-md shadow-amber/25 hover:shadow-lg hover:shadow-amber/35"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send size={18} />
                          Submit Query
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </Card>
            </ScrollReveal>

            {/* Contact details — takes 2 columns */}
            <ScrollReveal delay={0.1} className="lg:col-span-2 space-y-5">
              {/* Phone */}
              <Card padding="md">
                <a href={`tel:${BUSINESS.phone}`} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center shrink-0
                               group-hover:bg-amber/20 transition-colors">
                    <Phone size={22} className="text-amber" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-road text-sm mb-0.5">Call Us</h3>
                    <p className="text-lg font-semibold text-road group-hover:text-amber-dark transition-colors">
                      {BUSINESS.phoneDisplay}
                    </p>
                    <p className="text-xs text-steel">Tap to call • Available Mon–Sat 6AM–7PM</p>
                  </div>
                </a>
              </Card>

              {/* WhatsApp */}
              <Card padding="md">
                <a
                  href={BUSINESS.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-success-light flex items-center justify-center shrink-0
                               group-hover:bg-success/20 transition-colors">
                    <MessageCircle size={22} className="text-success" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-road text-sm mb-0.5">WhatsApp</h3>
                    <p className="text-sm font-medium text-road group-hover:text-success transition-colors">
                      Send us a message anytime
                    </p>
                    <p className="text-xs text-steel">We reply within 1 hour</p>
                  </div>
                </a>
              </Card>

              {/* Email */}
              <Card padding="md">
                <a href={`mailto:${BUSINESS.email}`} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-steel-lighter flex items-center justify-center shrink-0
                               group-hover:bg-steel/10 transition-colors">
                    <Mail size={22} className="text-steel" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-road text-sm mb-0.5">Email</h3>
                    <p className="text-sm font-medium text-road">{BUSINESS.email}</p>
                    <p className="text-xs text-steel">For detailed enquiries and documents</p>
                  </div>
                </a>
              </Card>

              {/* Address */}
              <Card padding="md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center shrink-0">
                    <MapPin size={22} className="text-amber" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-road text-sm mb-0.5">Visit Us</h3>
                    <p className="text-sm text-road">{BUSINESS.address}</p>
                    <p className="text-xs text-steel mt-1">Near Mattuthavani Bus Stand</p>
                  </div>
                </div>
              </Card>

              {/* Hours */}
              <Card padding="md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-steel-lighter flex items-center justify-center shrink-0">
                    <Clock size={22} className="text-steel" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-road text-sm mb-0.5">Hours</h3>
                    <div className="text-sm space-y-1">
                      <p className="text-road">Mon–Sat: 6:00 AM – 7:00 PM</p>
                      <p className="text-road">Sunday: 7:00 AM – 12:00 PM</p>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          </div>

          {/* Google Map embed */}
          <ScrollReveal className="mt-10">
            <div className="rounded-2xl overflow-hidden shadow-card h-80">
              <iframe
                src={BUSINESS.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vetri Driving Academy Location"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
