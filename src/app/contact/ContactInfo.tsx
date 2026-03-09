'use client';

import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';
import Card from '@/components/ui/Card';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { COMPANY } from '@/lib/constants';

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const OFFICE_LAT = 8.8932663;
const OFFICE_LNG = 76.6296389;
const MAPS_LINK = `https://www.google.com/maps?q=${OFFICE_LAT},${OFFICE_LNG}&z=17`;

export default function ContactInfo() {
  const office = COMPANY.offices[0];

  return (
    <AnimatedSection delay={0.2}>
      <div className="space-y-6">

        {/* Address */}
        <Card className="flex gap-4 p-5">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-primary-light flex items-center justify-center">
            <MapPin size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">{office.name}</h3>
            <p className="text-foreground-muted text-sm">{office.address}</p>
            <p className="text-foreground-muted text-sm">{office.city}</p>
            <p className="text-foreground-muted text-sm">{office.state}</p>
          </div>
        </Card>

        {/* Phone */}
        <Card className="flex gap-4 p-5">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-primary-light flex items-center justify-center">
            <Phone size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Phone</h3>
            <a href={`tel:${COMPANY.phone}`} className="text-foreground-muted text-sm hover:text-primary transition-colors">
              {COMPANY.phone}
            </a>
          </div>
        </Card>

        {/* Email */}
        <Card className="flex gap-4 p-5">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-primary-light flex items-center justify-center">
            <Mail size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Email</h3>
            <a href={`mailto:${COMPANY.email}`} className="text-foreground-muted text-sm hover:text-primary transition-colors">
              {COMPANY.email}
            </a>
          </div>
        </Card>

        {/* Hours */}
        <Card className="flex gap-4 p-5">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-primary-light flex items-center justify-center">
            <Clock size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
            <p className="text-foreground-muted text-sm">Monday – Saturday: 9AM – 6PM</p>
            <p className="text-foreground-muted text-sm">Sunday: Closed</p>
          </div>
        </Card>

        {/* Social Links */}
        <Card className="p-5">
          <h3 className="font-semibold text-foreground mb-4">Connect With Us</h3>
          <div className="flex gap-3">
            {[
              { icon: Facebook,     href: COMPANY.socialLinks.facebook,  label: 'Facebook'  },
              { icon: Instagram,    href: COMPANY.socialLinks.instagram,  label: 'Instagram' },
              { icon: Youtube,      href: COMPANY.socialLinks.youtube,    label: 'YouTube'   },
              { icon: WhatsAppIcon, href: COMPANY.socialLinks.whatsapp,   label: 'WhatsApp'  },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
              >
                <social.icon size={20} className="text-foreground-muted group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </Card>

        <Card padding="none" className="overflow-hidden">
          <iframe
            title={`${office.name} Location`}
            src={`https://www.google.com/maps?q=${OFFICE_LAT},${OFFICE_LNG}&z=17&output=embed`}
            width="100%"
            height="240"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-surface border-t border-border hover:bg-primary-light transition-colors duration-200 group"
          >
            <MapPin size={14} className="text-primary shrink-0" />
            <span className="text-xs text-foreground-muted group-hover:text-primary transition-colors">
              {office.address}, {office.city} — Open in Google Maps ↗
            </span>
          </a>
        </Card>

      </div>
    </AnimatedSection>
  );
}