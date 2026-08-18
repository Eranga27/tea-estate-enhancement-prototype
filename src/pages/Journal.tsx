import React from 'react';
import { Link } from 'react-router-dom';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Container, Section } from '../components/Layout';
import { SectionHeading } from '../components/SectionHeading';
import { GoldRule } from '../components/Ornament';
import { photography } from '../data/homepage';

/**
 * Journal
 * Catch Up feature — editorial content / blog for SEO and ongoing storytelling.
 * Uses estate photography and brand voice.
 * Future: CMS-driven, filterable by category (Tea, Travel, Estate Life, Seasons).
 */

const articles = [
  {
    id: 'mist-before-breakfast',
    category: 'Estate Life',
    date: 'October 2026',
    title: 'The Mist That Arrives Before Breakfast',
    excerpt: 'By half past five the valley is gone. The tea terraces float on white. A field walk before the light changes is not something you forget easily.',
    image: photography.teaFields,
    imageAlt: 'Tea terraces at dawn with mist in the valley',
  },
  {
    id: 'two-leaves-and-a-bud',
    category: 'Tea',
    date: 'September 2026',
    title: 'Two Leaves and a Bud: The Art of Plucking',
    excerpt: 'The finest Ceylon grades begin with a gesture — two leaves and the young bud at the tip of each shoot. An estate walk illuminates why this matters.',
    image: photography.teaFactory,
    imageAlt: 'Old Ceylon tea factory on a misty hillside',
  },
  {
    id: 'the-pekoe-trail',
    category: 'Walking',
    date: 'August 2026',
    title: 'Walking the Pekoe Trail from Our Gate',
    excerpt: 'The trail begins at the estate boundary. A guided section to the first ridge and back takes about four hours and reveals why the highlands are called Ceylon\'s second country.',
    image: photography.pekoeTrail,
    imageAlt: 'Misty highland walking trail through moss-covered forest',
  },
  {
    id: 'the-long-table',
    category: 'Dining',
    date: 'July 2026',
    title: 'The Long Table: On Dining at the Bungalow',
    excerpt: 'No fixed menu, no set times. Meals at the estate are composed around the party, the season, and a quiet conversation with the estate cook.',
    image: photography.pavilion,
    imageAlt: 'Garden dining pavilion with a long table set with linen and lanterns',
  },
];

export function Journal() {
  return (
    <div className="min-h-screen w-full bg-ivory text-ink">
      <SiteHeader activeHref="/journal" />

      <Section surface="parchment" spacing="loose">
        <Container>
          <SectionHeading
            eyebrow="From the Estate"
            title="The Journal"
            lede="Notes on tea, landscape, travel, and the quiet rhythms of life in the Galaha hills."
            align="center"
            scale="display"
            ornament="diamond"
            as="h1"
          />
        </Container>
      </Section>

      <Section surface="ivory" spacing="default">
        <Container>
          {/* Featured article */}
          <article className="grid gap-0 lg:grid-cols-12">
            <div className="aspect-[16/10] overflow-hidden lg:col-span-7">
              <img
                src={articles[0].image}
                alt={articles[0].imageAlt}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="bg-ivory-parchment p-8 sm:p-12 lg:col-span-5 lg:-ml-12 lg:mt-12 lg:self-start">
              <p className="u-eyebrow text-[10px] text-gold-deep">{articles[0].category} · {articles[0].date}</p>
              <h2 className="mt-3 font-serif text-3xl font-medium text-forest">{articles[0].title}</h2>
              <GoldRule className="mt-5" width="w-10" />
              <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">{articles[0].excerpt}</p>
              <Link
                to={`/journal/${articles[0].id}`}
                className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-button text-forest underline-offset-4 hover:underline"
              >
                Read More
              </Link>
            </div>
          </article>

          {/* Article grid */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(1).map(article => (
              <article key={article.id} className="group flex flex-col">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-6 flex flex-1 flex-col">
                  <p className="u-eyebrow text-[9px] text-gold-deep">{article.category} · {article.date}</p>
                  <h3 className="mt-3 font-serif text-2xl font-medium text-forest">{article.title}</h3>
                  <GoldRule className="mt-4" width="w-8" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">{article.excerpt}</p>
                  <Link
                    to={`/journal/${article.id}`}
                    className="mt-5 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-button text-forest underline-offset-4 hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
