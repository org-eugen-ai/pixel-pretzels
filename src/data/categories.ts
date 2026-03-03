import type { Category } from '@/types';

export const categories: Category[] = [
  {
    slug: 'notebooks',
    name: 'Notebooks',
    nameDE: 'Notebooks',
    description:
      'Powerful laptops for work, creativity, and everyday use. From ultrabooks to high-performance workstations.',
    descriptionDE:
      'Leistungsstarke Laptops fuer Arbeit, Kreativitaet und den Alltag. Von Ultrabooks bis hin zu Hochleistungs-Workstations.',
    image: '/images/categories/notebooks.svg',
    productCount: 8,
  },
  {
    slug: 'smartphones',
    name: 'Smartphones',
    nameDE: 'Smartphones',
    description:
      'The latest smartphones from top brands. Flagship performance, stunning cameras, and all-day battery life.',
    descriptionDE:
      'Die neuesten Smartphones von Top-Marken. Flaggschiff-Leistung, beeindruckende Kameras und ganztaegige Akkulaufzeit.',
    image: '/images/categories/smartphones.svg',
    productCount: 8,
  },
  {
    slug: 'printers',
    name: 'Printers',
    nameDE: 'Drucker',
    description:
      'Reliable printers for home and office. Laser, inkjet, and all-in-one multifunction devices.',
    descriptionDE:
      'Zuverlaessige Drucker fuer Zuhause und Buero. Laser-, Tintenstrahl- und All-in-One-Multifunktionsgeraete.',
    image: '/images/categories/printers.svg',
    productCount: 7,
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    nameDE: 'Zubehoer',
    description:
      'Essential accessories to complete your setup. Docks, peripherals, chargers, and more.',
    descriptionDE:
      'Unverzichtbares Zubehoer fuer Ihr Setup. Dockingstationen, Peripheriegeraete, Ladegeraete und mehr.',
    image: '/images/categories/accessories.svg',
    productCount: 7,
  },
];
