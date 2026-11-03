import { site } from '~/content/site';
/** Every language has readable prerendered HTML, its own canonical and reciprocal alternatives. */
export function usePageSeo(title: string, description: string, routePath: string) {
  const { tr, locale } = useCopy();
  const localPath = () => (locale.value === 'ro' ? '/ro' + routePath : routePath);
  const canonical = () => site.url + localPath();
  useSeoMeta({
    title: () => tr(title),
    description: () => tr(description),
    ogTitle: () => tr(title) + ' | ' + site.name,
    ogDescription: () => tr(description),
    ogUrl: canonical,
    ogType: 'website',
    ogSiteName: site.name,
    ogLocale: () => (locale.value === 'ro' ? 'ro_RO' : 'en_GB'),
    ogImage: site.url + '/social-card.png',
    twitterCard: 'summary_large_image',
  });
  useHead(() => {
    const graph: Record<string, unknown>[] = [
      {
        '@type': 'WebPage',
        '@id': canonical() + '#webpage',
        url: canonical(),
        name: tr(title),
        description: tr(description),
        inLanguage: locale.value,
        isPartOf: { '@id': site.url + '/#website' },
        about: { '@id': site.url + '/#organization' },
      },
      {
        '@type': 'WebSite',
        '@id': site.url + '/#website',
        name: site.name,
        url: site.url,
        inLanguage: ['en', 'ro'],
        publisher: { '@id': site.url + '/#organization' },
      },
    ];
    if (routePath !== '/')
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: tr('Home'),
            item: site.url + (locale.value === 'ro' ? '/ro/' : '/'),
          },
          { '@type': 'ListItem', position: 2, name: tr(title), item: canonical() },
        ],
      });
    return {
      htmlAttrs: { lang: locale.value },
      link: [
        { rel: 'canonical', href: canonical() },
        { rel: 'alternate', hreflang: 'en', href: site.url + routePath },
        { rel: 'alternate', hreflang: 'ro', href: site.url + '/ro' + routePath },
        { rel: 'alternate', hreflang: 'x-default', href: site.url + routePath },
      ],
      script: [
        {
          key: 'page-schema',
          type: 'application/ld+json',
          innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(
            /</g,
            '\\u003c',
          ),
        },
      ],
    };
  });
}
