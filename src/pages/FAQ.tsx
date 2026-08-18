import React, { useState } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Container, Section } from '../components/Layout';
import { SectionHeading } from '../components/SectionHeading';
import { GoldRule } from '../components/Ornament';
import { ChevronDownIcon } from 'lucide-react';

/**
 * FAQ
 * Catch Up feature — SEO-ready dedicated FAQ page.
 * Content derived from concierge.ts knowledge base.
 * Future: link directly from concierge modal, searchable, schema markup.
 */

const faqs = [
  {
    category: 'Booking & Rates',
    questions: [
      {
        q: 'How do I book The Tea Bungalow?',
        a: 'The estate is booked directly with the hosts via our direct booking platform or by sending a personal enquiry. We do not use booking intermediaries for direct reservations. Booking.com and Airbnb listings are available for price comparison.',
      },
      {
        q: 'What is the minimum stay?',
        a: 'The minimum stay is two nights. For whole-estate buyouts, a three-night minimum applies. Extended stays of a week or more are particularly encouraged — the estate reveals itself slowly.',
      },
      {
        q: 'What does the rate include?',
        a: 'All rates include accommodation, estate breakfasts, afternoon tea, and complimentary estate walks. Garden dining, private tastings, and off-estate excursions are arranged additionally.',
      },
      {
        q: 'Do you offer packages or special rates?',
        a: 'Yes — seasonal offers, honeymoon packages, and extended-stay rates are available. These are detailed in the Packages & Offers section and are bookable directly with the estate.',
      },
    ],
  },
  {
    category: 'The Estate & Chambers',
    questions: [
      {
        q: 'How many guests can the estate accommodate?',
        a: 'The main house accommodates up to ten guests across six chambers. The Carriage House adds a further four guests across two bedrooms. The maximum capacity for a whole-estate buyout is therefore fourteen guests.',
      },
      {
        q: 'Are all chambers in the main house?',
        a: 'Six chambers are within the main colonial house, opening onto the shared verandah. The Carriage House is a detached two-bedroom residence within the grounds — fully stepless and with its own living and dining space.',
      },
      {
        q: 'Is the estate accessible?',
        a: 'The Highlands Suite and Carriage House are fully step-free and accessible. The estate grounds include some uneven terrain typical of a working highland property. Please share any access requirements when enquiring.',
      },
    ],
  },
  {
    category: 'Experiences & Activities',
    questions: [
      {
        q: 'What experiences are available at the estate?',
        a: 'Tea estate walks, private tea tastings, Pekoe Trail access, factory visits, garden dining, and billiards evenings are available to all guests. All experiences can be curated in advance or arranged informally on arrival.',
      },
      {
        q: 'Can we walk the Pekoe Trail directly from the estate?',
        a: 'Yes — the estate sits directly on the Pekoe Trail route. Guided sections depart from the estate gate and return for breakfast, or guests may walk independently with trail maps provided by the hosts.',
      },
      {
        q: 'Is the tea factory visit included?',
        a: 'Factory visits are arranged by the hosts and are available to all guests. Timing depends on the factory\'s operational schedule — the hosts will advise on the best days during your stay.',
      },
    ],
  },
  {
    category: 'Practical Information',
    questions: [
      {
        q: 'Where is The Tea Bungalow?',
        a: 'The estate is located on Moragolla Road, Galaha, in the Kandy District of Sri Lanka. Galaha is approximately 24 km from Kandy city centre and 62 km from Nuwara Eliya. Colombo International Airport is approximately 4 hours by road.',
      },
      {
        q: 'How do I get to the estate?',
        a: 'The estate can arrange private transfers from Kandy or Colombo Airport. Guests arriving by train to Kandy may also arrange an onward transfer. Detailed arrival guidance is shared upon booking confirmation.',
      },
      {
        q: 'Is there Wi-Fi?',
        a: 'Basic Wi-Fi is available in the common areas. We gently encourage guests to be present in the estate environment — the signal may wander with the mist, and that is, perhaps, the point.',
      },
      {
        q: 'Are children welcome?',
        a: 'Children are warmly welcome. The estate is particularly suited to families taking the whole house — the Carriage House and main chambers connect flexibly, and the grounds are safe for children of all ages.',
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gold/25">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="font-serif text-lg text-forest">{q}</span>
        <ChevronDownIcon
          className={`mt-1 h-4 w-4 shrink-0 text-gold transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-[15px] leading-relaxed text-ink-muted">{a}</p>
      )}
    </div>
  );
}

export function FAQ() {
  return (
    <div className="min-h-screen w-full bg-ivory text-ink">
      <SiteHeader activeHref="/faq" />

      <Section surface="parchment" spacing="loose">
        <Container>
          <SectionHeading
            eyebrow="Guest Information"
            title="Frequently Asked Questions"
            lede="Everything you may wish to know before your stay. For anything not covered here, our digital concierge and host team are available directly."
            align="center"
            scale="display"
            ornament="diamond"
            as="h1"
          />
        </Container>
      </Section>

      <Section surface="ivory" spacing="default">
        <Container className="max-w-3xl">
          {faqs.map(section => (
            <div key={section.category} className="mb-14">
              <p className="u-eyebrow text-[10px] text-gold-deep">{section.category}</p>
              <GoldRule className="mt-3" width="w-8" />
              <div className="mt-6">
                {section.questions.map(faq => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
