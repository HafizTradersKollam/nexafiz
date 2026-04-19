import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { COMPANY, NAV_LINKS } from '@/lib/constants';
import { CONTAINER_PADDING, CONTAINER_MAX_WIDTH } from '@/components/ui/Section';
import { cn } from '@/lib/utils';

// WhatsApp SVG Icon Component
function WhatsAppIcon({ size = 18 }: { size?: number }) {
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

const socialLinks = [
  { icon: Facebook, href: COMPANY.socialLinks.facebook, label: 'Facebook' },
  { icon: Instagram, href: COMPANY.socialLinks.instagram, label: 'Instagram' },
  { icon: Youtube, href: COMPANY.socialLinks.youtube, label: 'YouTube' },
  { icon: WhatsAppIcon, href: COMPANY.socialLinks.whatsapp, label: 'WhatsApp', isCustom: true },
];

const quickLinks = [
  { name: 'FAQ', href: '/faq' },
  { name: 'Support', href: '/contact' },
  { name: 'Business Plan', href: '/business-plan' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-alt border-t border-border">
      {/* Main Footer */}
      <div className={cn('mx-auto py-16 lg:py-20', CONTAINER_MAX_WIDTH, CONTAINER_PADDING)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 shrink-0">
                <Image src="/logo.png" alt={`${COMPANY.name} Logo`} fill sizes="40px" className="object-contain" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-primary">{COMPANY.name.slice(0, 4)}</span>
                <span className="text-accent">{COMPANY.name.slice(4)}</span>
              </span>
            </Link>
            <p className="text-foreground-muted text-sm leading-relaxed mb-6">
              {COMPANY.description}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2.5 rounded-lg bg-surface hover:bg-primary hover:text-white text-foreground-muted transition-all duration-200"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground-muted hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground-muted hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <span className="text-foreground-muted text-sm">
                  {COMPANY.offices[0].address}, {COMPANY.offices[0].city}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-foreground-muted hover:text-primary text-sm transition-colors"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                  className="text-foreground-muted hover:text-primary text-sm transition-colors"
                >
                  {COMPANY.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className={cn('mx-auto py-6', CONTAINER_MAX_WIDTH, CONTAINER_PADDING)}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-foreground-muted text-sm text-center sm:text-left">
              © {currentYear} {COMPANY.name}. All rights reserved.
            </p>
            <p className="text-foreground-subtle text-sm font-medium">
              {COMPANY.tagline}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

