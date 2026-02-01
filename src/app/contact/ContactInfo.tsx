'use client';

import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';
import Card from '@/components/ui/Card';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { COMPANY } from '@/lib/constants';

// WhatsApp SVG Icon Component
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

// Contact details using COMPANY constants
const contactDetails = [
  {
    icon: MapPin,
    title: 'Head Office',
    lines: [
      COMPANY.offices[0].address,
      COMPANY.offices[0].city,
      COMPANY.offices[0].state,
    ],
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: [COMPANY.phone],
  },
  {
    icon: Mail,
    title: 'Email',
    lines: [COMPANY.email],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    lines: ['Monday - Saturday: 9AM - 6PM', 'Sunday: Closed'],
  },
];

const socialLinks = [
  { icon: Facebook, href: COMPANY.socialLinks.facebook, label: 'Facebook' },
  { icon: Instagram, href: COMPANY.socialLinks.instagram, label: 'Instagram' },
  { icon: Youtube, href: COMPANY.socialLinks.youtube, label: 'YouTube' },
  { icon: WhatsAppIcon, href: COMPANY.socialLinks.whatsapp, label: 'WhatsApp', isCustom: true },
];

export default function ContactInfo() {
  return (
    <AnimatedSection delay={0.2}>
      <div className="space-y-6">
        {/* Contact Details */}
        {contactDetails.map((item, index) => (
          <Card key={index} className="flex gap-4 p-5">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-primary-light flex items-center justify-center">
              <item.icon size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
              {item.lines.map((line, i) => (
                <p key={i} className="text-foreground-muted text-sm">
                  {line}
                </p>
              ))}
            </div>
          </Card>
        ))}

        {/* Social Links */}
        <Card className="p-5">
          <h3 className="font-semibold text-foreground mb-4">Connect With Us</h3>
          <div className="flex gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 group"
                aria-label={social.label}
              >
                <social.icon size={20} className="text-foreground-muted group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </Card>

        {/* Map Placeholder */}
        <Card padding="none" className="overflow-hidden">
          <div className="h-48 bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={32} className="text-primary mx-auto mb-2" />
              <p className="text-foreground-muted text-sm">Interactive Map</p>
              <p className="text-foreground-muted text-xs">Coming Soon</p>
            </div>
          </div>
        </Card>
      </div>
    </AnimatedSection>
  );
}

