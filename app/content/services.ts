export interface Service {
  id: string;
  title: string;
  headline: string;
  intro: string;
  body: string;
  scope: string[];
  tags: string[];
}
export const services: Service[] = [
  {
    id: 'design',
    title: 'Design & UI/UX',
    headline: 'Make the complex feel clear.',
    intro: 'Interfaces shaped around the people using them and the tasks they need to complete.',
    body: 'We connect structure, content and interaction before moving into the visual details. The result is a considered direction that can be carried into development.',
    scope: [
      'User journeys and information architecture',
      'Wireframes and responsive interface design',
      'Design systems and interactive prototypes',
    ],
    tags: ['User journeys', 'UI systems', 'Prototypes'],
  },
  {
    id: 'web-development',
    title: 'Web Development',
    headline: 'A website that works beyond the first impression.',
    intro: 'Responsive websites and content platforms built around your goals.',
    body: 'From a focused business website to a content-rich platform, we define how the site should work, how it will be managed and how it can develop over time.',
    scope: [
      'Responsive front-end development',
      'CMS setup and custom functionality',
      'Performance, accessibility and launch checks',
    ],
    tags: ['Responsive web', 'CMS', 'Custom features'],
  },
  {
    id: 'automation',
    title: 'AI & Workflow Automation',
    headline: 'Connect the work. Reduce the repetition.',
    intro: 'Workflows, integrations and AI-assisted features with clear human review.',
    body: 'We start by understanding the workflow and the information moving through it. Automation is scoped around a useful task, with clear controls and a practical way to assess the result.',
    scope: [
      'Workflow mapping and integration planning',
      'API connections and task automation',
      'AI-assisted features with review points',
    ],
    tags: ['Workflows', 'APIs', 'AI assistance'],
  },
  {
    id: 'brand',
    title: 'Brand & Creative Direction',
    headline: 'An identity that holds together.',
    intro: 'A consistent visual direction across your website and digital touchpoints.',
    body: 'We bring the identity into a practical system: how the logo behaves, how typography is used and how the visual language supports the content.',
    scope: [
      'Visual identity and creative direction',
      'Color, typography and digital brand systems',
      'Brand guidelines and reusable assets',
    ],
    tags: ['Identity', 'Art direction', 'Guidelines'],
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages',
    headline: 'One clear page. One focused next step.',
    intro: 'Pages for a campaign, a product launch or a specific offer.',
    body: 'We organize the message around the audience and the action they need to take. Design and development work together to keep that journey clear on every screen.',
    scope: [
      'Page structure and content hierarchy',
      'Responsive design and development',
      'Forms, measurement planning and launch checks',
    ],
    tags: ['Campaigns', 'Launches', 'Lead capture'],
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce Development',
    headline: 'Commerce around the customer.',
    intro: 'Storefronts and shopping journeys that make products easier to find and understand.',
    body: 'We map the product experience from discovery to checkout, then connect payments, shipping, product data and the business systems needed to support the store.',
    scope: [
      'Storefront design and development',
      'Product, collection and cart experiences',
      'Payment, shipping and business-system integrations',
    ],
    tags: ['Storefront UX', 'Product data', 'Integrations'],
  },
  {
    id: 'software',
    title: 'Web Apps & Custom Software',
    headline: 'Software shaped around your business.',
    intro: 'Portals, business tools and connected systems built around real workflows.',
    body: 'We clarify the requirements, model the important interactions and build the features in a sequence that can be reviewed and tested.',
    scope: [
      'Application planning and technical architecture',
      'Custom features, data models and APIs',
      'Testing, deployment and handoff',
    ],
    tags: ['Portals', 'Business tools', 'Connected systems'],
  },
];
