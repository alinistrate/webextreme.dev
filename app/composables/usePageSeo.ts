import { site } from '~/content/site';

/** One canonical and one truthful description for each statically generated route. */
export function usePageSeo(title: string, description: string, routePath: string) {
  const canonical = site.url + routePath;
  useSeoMeta({
    title,
    description,
    ogTitle: title + ' | ' + site.name,
    ogDescription: description,
    ogUrl: canonical,
    ogType: 'website',
    ogSiteName: site.name,
    ogImage: site.url + '/social-card.png',
    twitterCard: 'summary_large_image',
  });
  const label = title.split(' | ')[0];
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': canonical + '#webpage',
      url: canonical,
      name: title,
      description,
      inLanguage: 'en',
      isPartOf: { '@id': site.url + '/#website' },
      about: { '@id': site.url + '/#organization' },
    },
    {
      '@type': 'WebSite',
      '@id': site.url + '/#website',
      name: site.name,
      url: site.url,
      publisher: { '@id': site.url + '/#organization' },
    },
  ];
  if (routePath !== '/')
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site.url + '/' },
        { '@type': 'ListItem', position: 2, name: label, item: canonical },
      ],
    });
  useHead({
    link: [{ rel: 'canonical', href: canonical }],
    script: [
      {
        key: 'page-schema',
        type: 'application/ld+json',
        innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(
          /</g,
          '\u003c',
        ),
      },
    ],
  });
}
