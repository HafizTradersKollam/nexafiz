'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Section, { SectionHeader } from '@/components/ui/Section';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { cn } from '@/lib/utils';

// Realistic testimonials with 5-star reviews
const TESTIMONIALS = [
  {
    name: 'Arun Krishnan',
    role: 'Business Professional',
    location: 'Kollam',
    content: 'NEXAFIZ has completely changed how I view my daily purchases. What used to be just expenses is now building my income stream. The process is simple and transparent.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
  },
  {
    name: 'Lakshmi Nair',
    role: 'Homemaker',
    location: 'Thiruvananthapuram',
    content: 'As a homemaker, I manage all household purchases. With NEXAFIZ, every grocery run and essential purchase contributes to my family\'s additional income. Absolutely love it!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
  },
  {
    name: 'Rajesh Menon',
    role: 'Entrepreneur',
    location: 'Kollam',
    content: 'The zero-investment model was what attracted me initially. Now, after experiencing the transparent tracking system and automatic earnings, I recommend NEXAFIZ to everyone.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
  },
  {
    name: 'Sreelatha Thomas',
    role: 'Teacher',
    location: 'Thiruvananthapuram',
    content: 'Building a network was easier than I thought. My colleagues and family members joined, and now we all benefit from each other\'s everyday shopping. It\'s a win-win!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Auto-play every 3 seconds - NO pause on hover
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <Section id="testimonials" background="alt">
      <AnimatedSection>
        <SectionHeader
          subtitle="Success Stories"
          title="What Our Members Say"
          description="Real experiences from members who have transformed their daily shopping into a source of income."
        />
      </AnimatedSection>

      <div className="relative max-w-4xl mx-auto">
        {/* Main Testimonial Card */}
        <div className="relative bg-surface border border-border rounded-3xl p-8 lg:p-12 shadow-xl overflow-hidden min-h-80">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-accent/5 rounded-full translate-x-1/2 translate-y-1/2" />

          {/* Quote Icon */}
          <div className="absolute top-8 right-8 lg:top-12 lg:right-12">
            <Quote size={64} className="text-primary/10" />
          </div>

          {/* Testimonial Content */}
          <div className="relative">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={index}
                className={cn(
                  'transition-all duration-700 ease-in-out',
                  index === activeIndex
                    ? 'opacity-100 translate-x-0 relative'
                    : 'opacity-0 absolute top-0 left-0 right-0 pointer-events-none'
                )}
                aria-hidden={index !== activeIndex}
              >
                {/* Rating Stars - 5 Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={22} className="text-accent fill-accent" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl lg:text-2xl text-foreground font-medium leading-relaxed mb-8">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-primary/20">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-foreground">{testimonial.name}</div>
                    <div className="text-foreground-muted">{testimonial.role}</div>
                    <div className="text-foreground-subtle text-sm">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-surface border border-border hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'transition-all duration-300 rounded-full',
                  index === activeIndex
                    ? 'w-8 h-3 bg-primary'
                    : 'w-3 h-3 bg-border hover:bg-primary/50'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-surface border border-border hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </Section>
  );
}

