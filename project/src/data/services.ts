export interface ServiceContent {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  offerings: string[];
  steps: { title: string; detail: string }[];
}

export const services: ServiceContent[] = [
  {
    slug: 'bridal-blouse',
    name: 'Bridal & Designer Blouse',
    shortName: 'Bridal Blouse',
    tagline: 'The centerpiece of your bridal look',
    description:
      'Your bridal blouse deserves as much care as your saree. We stitch fitted, padded, and designer blouses with intricate back necks, hook closures, and perfect darting — so you feel confident and comfortable from muhurtham to reception.',
    offerings: [
      'Custom-fitted bridal blouses with padding & lining',
      'Designer back-neck designs (cutwork, tassels, mirror, beadwork)',
      'Aari & zardosi embellishment on blouse fabric',
      'Princess-cut, katori, and corset-style blouses',
      'Matching blouse stitching for silk, kanjivaram & designer sarees',
      'Trial fitting & alterations included',
    ],
    steps: [
      { title: 'Design Consult', detail: 'Share your saree and blouse ideas; we suggest necklines, back designs & embellishments.' },
      { title: 'Measurements', detail: 'Precise body measurements taken at our boutique with fitting allowance.' },
      { title: 'Stitching', detail: 'Cut and stitched with padding, lining, hooks and darting for a sculpted fit.' },
      { title: 'Embellishment', detail: 'Aari, zardosi or beadwork applied by hand where requested.' },
      { title: 'Fitting & Delivery', detail: 'Trial fitting, final alterations, and on-time delivery before your event.' },
    ],
  },
  {
    slug: 'aari-maggam-work',
    name: 'Aari / Maggam Work',
    shortName: 'Aari Work',
    tagline: 'Hand-crafted Aari & Maggam embroidery',
    description:
      'Aari and Maggam work is the soul of South Indian bridal embroidery. Using the hooked Aari needle and Maggam frame, we create dense, flowing floral and figurative patterns with zardosi, sequins, beads and stones — the kind of work that turns a blouse or saree into an heirloom.',
    offerings: [
      'Full-coverage Aari work on blouses, sarees & lehengas',
      'Maggam-frame embroidery for heavy bridal pieces',
      'Zardosi, dabka, sequin & bead detailing',
      'Mirror, kundan & stone setting',
      'Custom motif design (floral, peacock, temple, figurative)',
      'Matching borders & pallu embellishment',
    ],
    steps: [
      { title: 'Motif Design', detail: 'We sketch the motif layout — floral, peacock, temple border or custom.' },
      { title: 'Frame Setup', detail: 'Fabric is mounted on the Maggam frame and stretched taut.' },
      { title: 'Aari Stitching', detail: 'Hooked-needle Aari work lays zardosi, sequins and beads in dense patterns.' },
      { title: 'Stone Setting', detail: 'Mirrors, kundans and stones are set and secured by hand.' },
      { title: 'Finishing', detail: 'Loose threads trimmed, fabric cleaned and delivered ready to wear.' },
    ],
  },
  {
    slug: 'hand-machine-embroidery',
    name: 'Hand & Machine Embroidery',
    shortName: 'Embroidery',
    tagline: 'Fine hand and machine embroidery',
    description:
      'From delicate chain stitch to dense machine fill, we do both hand and machine embroidery on blouses, sarees, kurtis, and uniform badges. Choose your thread, your motif, and your density — we deliver crisp, even stitching that lasts through washes and wear.',
    offerings: [
      'Hand embroidery: chain, satin, French knot, bullion & more',
      'Machine embroidery for uniform badges, logos & names',
      'Custom motif digitising & thread colour matching',
      'Thread work on saree borders, pallu & blouse panels',
      'Kurti, yoke & dupatta embroidery',
      'Bulk school & corporate logo embroidery',
    ],
    steps: [
      { title: 'Design & Digitise', detail: 'Motif is drawn and (for machine work) digitised for the embroidery file.' },
      { title: 'Thread Selection', detail: 'Thread colours matched to your fabric and design reference.' },
      { title: 'Stitching', detail: 'Hand or machine embroidery executed with even tension and clean edges.' },
      { title: 'Quality Check', detail: 'Stitch density, alignment and loose threads inspected.' },
      { title: 'Delivery', detail: 'Finished piece delivered or stitched into your garment.' },
    ],
  },
  {
    slug: 'chudithaar-salwar',
    name: 'Chudithaar / Salwar',
    shortName: 'Chudithaar',
    tagline: 'Perfectly fitted chudithaar & salwar suits',
    description:
      'A well-fitted chudithaar or salwar suit is the most versatile outfit in your wardrobe. We stitch chudithaar, anarkali, straight-cut, and palazzo suits with clean finishing, matching dupatta work, and comfortable fittings — ready for daily wear, office, or occasions.',
    offerings: [
      'Chudithaar, anarkali, straight-cut & palazzo suits',
      'Custom kameez stitching with neck & sleeve variations',
      'Salwar, chudithaar-bottom & palazzo stitching',
      'Dupatta border, tassel & lace work',
      'Ready-made suit alteration & refitting',
      'Bulk uniform salwar stitching',
    ],
    steps: [
      { title: 'Design Select', detail: 'Choose your style — chudithaar, anarkali, straight or palazzo.' },
      { title: 'Measurements', detail: 'Full body measurements with comfort and ease allowance.' },
      { title: 'Cutting & Stitching', detail: 'Kameez and bottom cut and stitched with clean finishing.' },
      { title: 'Dupatta Work', detail: 'Border, lace or tassel work added to the dupatta.' },
      { title: 'Fitting & Delivery', detail: 'Trial fitting, adjustments and delivery.' },
    ],
  },
  {
    slug: 'lehenga-half-saree',
    name: 'Lehenga & Half Saree',
    shortName: 'Lehenga',
    tagline: 'Statement lehengas & half sarees',
    description:
      'Whether it is a half saree function, a muhurtham lehenga, or a reception skirt, we stitch lehengas and half sarees with deep box pleats, cancan lining, and fitted blouses. Pair it with Aari or zardosi work for a look that photographs beautifully and stays comfortable all day.',
    offerings: [
      'Bridal & reception lehengas with cancan lining',
      'Half saree (langa voni) stitching for functions',
      'Deep box pleat, knife pleat & gathered skirts',
      'Fitted lehenga blouse with designer back neck',
      'Aari, zardosi & stone work on lehenga panels',
      'Dupatta stitching with border & tassels',
    ],
    steps: [
      { title: 'Design Consult', detail: 'Discuss your function, colour palette and embroidery scope.' },
      { title: 'Measurements', detail: 'Waist, hip and blouse measurements taken with fitting allowance.' },
      { title: 'Stitching', detail: 'Skirt pleated and lined, blouse fitted, dupatta finished.' },
      { title: 'Embellishment', detail: 'Aari, zardosi or stone work applied to panels and border.' },
      { title: 'Fitting & Delivery', detail: 'Trial fitting, final pleat check and delivery before your event.' },
    ],
  },
  {
    slug: 'designer-gowns-western-frock',
    name: 'Designer Gowns & Western Frock',
    shortName: 'Designer Gowns',
    tagline: 'Designer gowns & western frocks',
    description:
      'From birthday gowns to party and reception gowns, we stitch western silhouettes that fit your body and your occasion. Choose your fabric, your length, and your embellishment — we deliver a gown that moves with you and photographs like a dream.',
    offerings: [
      'Party & reception gowns with flare & trail',
      'Birthday & milestone gowns for kids & adults',
      'Fitted bodice with corset or zip closure',
      'Lace, sequin & stone embellishment',
      'Western frocks & midi dresses',
      'Alteration & refitting of ready-made gowns',
    ],
    steps: [
      { title: 'Design Consult', detail: 'Share your occasion, reference images and fabric preference.' },
      { title: 'Measurements', detail: 'Bust, waist, hip and length measurements taken.' },
      { title: 'Stitching', detail: 'Bodice fitted, skirt flared, lining and closure added.' },
      { title: 'Embellishment', detail: 'Lace, sequin or stone work applied as designed.' },
      { title: 'Fitting & Delivery', detail: 'Trial fitting, hem check and delivery.' },
    ],
  },
  {
    slug: 'kids-frock-pattu-pavadai-uniforms',
    name: 'Kids Frock, Pattu Pavadai & School Uniforms',
    shortName: 'Kids Wear',
    tagline: 'Frocks, pattu pavadai & school uniforms',
    description:
      'We stitch for the little ones too — pattu pavadai for functions, frocks for birthdays, and school uniforms for the whole year. Soft fabrics, comfortable fits, and durable stitching that survives play, wash, and repeat wear.',
    offerings: [
      'Pattu pavadai (silk skirt & blouse) for functions',
      'Birthday & party frocks for kids',
      'School uniform stitching (shirt, pant, skirt, tunic)',
      'Bulk school uniform orders',
      'Kids lehenga & chudithaar',
      'Soft cotton frocks for daily wear',
    ],
    steps: [
      { title: 'Design Select', detail: 'Choose the outfit type — pattu pavadai, frock or uniform.' },
      { title: 'Measurements', detail: 'Child measured with room for growth and comfort.' },
      { title: 'Cutting & Stitching', detail: 'Soft seams, comfortable fit and clean finishing.' },
      { title: 'Embellishment', detail: 'Simple lace, border or embroidery added as requested.' },
      { title: 'Fitting & Delivery', detail: 'Quick fitting check and delivery.' },
    ],
  },
  {
    slug: 'saree-falls-pico-pleating-alteration',
    name: 'Saree Falls, Pico, Pleating & Alteration',
    shortName: 'Saree Care',
    tagline: 'Saree falls, pico, pleating & alteration',
    description:
      'A saree only drapes well when the falls, pico, and pleats are done right. We attach cotton falls, hand-pico the edges, pre-pleat your saree for easy wearing, and alter old or ready-made blouses and dresses so they fit like new.',
    offerings: [
      'Saree falls attachment (cotton / matching)',
      'Hand pico for saree borders & pallu',
      'Pre-pleating for easy wearing & storage',
      'Blouse alteration (tighten, loosen, re-cut)',
      'Dress, lehenga & gown alteration',
      'Zip, hook & closure repair',
    ],
    steps: [
      { title: 'Bring Your Saree', detail: 'Drop off your saree or garment at either boutique.' },
      { title: 'Assessment', detail: 'We check the fabric and recommend falls, pico or alteration scope.' },
      { title: 'Work Done', detail: 'Falls stitched, edges picoed, or garment altered as agreed.' },
      { title: 'Pleating', detail: 'Saree pre-pleated and pinned for easy draping if requested.' },
      { title: 'Delivery', detail: 'Ready for pickup or delivery within the agreed time.' },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
