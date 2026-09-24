// All image URLs in one place so you can swap in your own shop photos later.
// Pexels free-licence images showing real garments, embroidery, and tailoring.

const px = (id: number, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=600&fit=crop`;

export const images = {
  hero: px(13661845, 1200),
  heroSecondary: px(14825269, 800),

  services: {
    'bridal-blouse': {
      hero: px(13661845, 1000),
      gallery: [
        px(37439026, 800),
        px(6011749, 800),
        px(14950241, 800),
        px(37439020, 800),
        px(13661848, 800),
        px(8751928, 800),
      ],
    },
    'aari-maggam-work': {
      hero: px(14825269, 1000),
      gallery: [
        px(14825268, 800),
        px(8886949, 800),
        px(6387638, 800),
        px(7685720, 800),
        px(12972006, 800),
        px(8711176, 800),
      ],
    },
    'hand-machine-embroidery': {
      hero: px(35623927, 1000),
      gallery: [
        px(9339397, 800),
        px(37194317, 800),
        px(6339511, 800),
        px(35251794, 800),
        px(9339396, 800),
        px(35617658, 800),
      ],
    },
    'chudithaar-salwar': {
      hero: px(20690539, 1000),
      gallery: [
        px(25184955, 800),
        px(18977058, 800),
        px(31323207, 800),
        px(25185003, 800),
        px(34933703, 800),
        px(31874451, 800),
      ],
    },
    'lehenga-half-saree': {
      hero: px(20736212, 1000),
      gallery: [
        px(37439025, 800),
        px(16324981, 800),
        px(19955775, 800),
        px(8531991, 800),
        px(35092891, 800),
        px(19613659, 800),
      ],
    },
    'designer-gowns-western-frock': {
      hero: px(5185596, 1000),
      gallery: [
        px(5185592, 800),
        px(5185593, 800),
        px(5185594, 800),
        px(5185590, 800),
        px(5185597, 800),
        px(31648380, 800),
      ],
    },
    'kids-frock-pattu-pavadai-uniforms': {
      hero: px(13056483, 1000),
      gallery: [
        px(26316187, 800),
        px(16445659, 800),
        px(13440016, 800),
        px(10483776, 800),
        px(13056399, 800),
        px(36046012, 800),
      ],
    },
    'saree-falls-pico-pleating-alteration': {
      hero: px(13206031, 1000),
      gallery: [
        px(36883230, 800),
        px(27893063, 800),
        px(39081592, 800),
        px(38835539, 800),
        px(18359551, 800),
        px(7116999, 800),
      ],
    },
  },

  whyChoose: [
    px(8769327, 600),
    px(9850083, 600),
    px(3984871, 600),
  ],

  howItWorks: [
    px(8886949, 400),
    px(4622406, 400),
    px(13206031, 400),
    px(36731207, 400),
    px(38835523, 400),
  ],

  boutique: px(8886949, 800),
  fabricRolls: px(18359551, 800),
  threads: px(7116999, 800),
  sewingMachine: px(13206031, 800),
  designerStudio: px(8769327, 800),
  measuringTape: px(4622406, 800),
};
