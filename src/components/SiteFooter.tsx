import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, MessageCircleIcon, ShieldCheckIcon } from 'lucide-react';
import { Container } from './Layout';
import { Crest, GoldRule } from './Ornament';
import { estate, footerColumns } from '../data/site';

const socials = [
  { label: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com' },
  { label: 'WhatsApp', icon: MessageCircleIcon, href: 'https://whatsapp.com' },
  { label: 'Facebook', icon: FacebookIcon, href: 'https://facebook.com' }
];

export function SiteFooter() {
  return (
    <footer className="w-full bg-forest text-ivory">
      <Container className="py-16 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <Crest className="h-16 w-12" tone="dark" />
            <p className="mt-7 font-serif text-lg uppercase tracking-nav text-gold-light">{estate.name}</p>
            <p className="mt-2 font-serif text-sm italic text-ivory/65">{estate.region}</p>
            <GoldRule className="mt-8" width="w-12" />

            <ul className="mt-8 flex items-center gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center border border-gold/40 text-gold-light transition-colors duration-200 ease-estate hover:border-gold hover:bg-gold/10"
                  >
                    <social.icon className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="font-serif text-base uppercase tracking-nav text-gold">{column.title}</h2>
                <ul className="mt-6 space-y-3.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-[15px] text-ivory/80 transition-colors duration-200 ease-estate hover:text-gold-light"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-ivory/10 bg-forest-dark py-6">
        <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="h-4 w-4 text-gold" />
            <p className="u-eyebrow text-[9px] text-ivory/60">
              The Tea Bungalow Prototype · Concept Proof-of-Concept
            </p>
          </div>
          <p className="u-eyebrow text-[9px] text-ivory/45">© 2026 The Tea Bungalow · Galaha</p>
        </Container>
      </div>
    </footer>
  );
}