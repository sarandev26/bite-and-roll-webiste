export interface HeadlineWord {
  text: string;
  color?: "ember" | "mustard" | "charcoal" | "green";
  outline?: boolean;
}

export interface BeatMetric {
  value: number;
  suffix: string;
  label: string;
}

export interface BeatData {
  id: number;
  accent: string;
  headlineLines: HeadlineWord[][];
  body: string;
  echoWord: string;
  cta?: string;
  sticker?: string;
  metrics?: BeatMetric[];
  ingredients?: string[];
  posterShape?: "circle" | "badge" | "square";
}

export interface ChapterData {
  id: string;
  chapterIndex: number;
  title: string;
  frameDir: "burger" | "wrap" | "drink" | "bag";
  totalFrames: number;
  bgTint: string;
  beats: BeatData[];
}

export const CHAPTERS_DATA: ChapterData[] = [
  {
    id: "burger",
    chapterIndex: 0,
    title: "SIGNATURE SMASH",
    frameDir: "burger",
    totalFrames: 120,
    bgTint: "#EDE6DB",
    beats: [
      {
        id: 1,
        accent: "The Original",
        headlineLines: [
          [{ text: "BITE", color: "ember" }],
          [{ text: "INTO", outline: true }],
          [{ text: "BOLD", color: "mustard" }],
        ],
        body: "Every layer tells a story of smoking flat-tops and prime smash sear.",
        echoWord: "BURGER",
        cta: "Explore Menu",
        sticker: "SIGNATURE",
        posterShape: "circle",
      },
      {
        id: 2,
        accent: "Double Prime",
        headlineLines: [
          [{ text: "STACKED", color: "ember" }],
          [{ text: "TO THE", outline: true }],
          [{ text: "BRIM", color: "mustard" }],
        ],
        body: "Double smash beef patties seared until crunchy on fire-forged cast iron.",
        echoWord: "LAYERS",
        sticker: "DOUBLE",
        posterShape: "badge",
      },
      {
        id: 3,
        accent: "House Glaze",
        headlineLines: [
          [{ text: "SAUCE", color: "mustard" }],
          [{ text: "THAT", outline: true }],
          [{ text: "SPLASHES", color: "ember" }],
        ],
        body: "Secret spiced relish dripping over bubbling melted aged gouda cheese.",
        echoWord: "SAUCY",
        sticker: "HOT",
        posterShape: "circle",
      },
      {
        id: 4,
        accent: "Fresh Brioche",
        headlineLines: [
          [{ text: "ONE", color: "charcoal" }],
          [{ text: "PERFECT", color: "ember" }],
          [{ text: "BUN", color: "mustard" }],
        ],
        body: "Golden toasted brioche carrying pure, untamed street food majesty.",
        echoWord: "CRAFT",
        sticker: "GOLDEN",
        posterShape: "badge",
      },
    ],
  },
  {
    id: "wrap",
    chapterIndex: 1,
    title: "CHICKEN ROLL CRAFT",
    frameDir: "wrap",
    totalFrames: 120,
    bgTint: "#EDE6DB",
    beats: [
      {
        id: 1,
        accent: "Rolled Tight",
        headlineLines: [
          [{ text: "MEET THE", outline: true }],
          [{ text: "ROLL", color: "ember" }],
        ],
        body: "Hand-rolled street perfection crafted for hungry urban wanderers.",
        echoWord: "WRAP",
        sticker: "FRESH",
        posterShape: "circle",
      },
      {
        id: 2,
        accent: "Buttermilk Crunch",
        headlineLines: [
          [{ text: "CRISPY", color: "ember" }],
          [{ text: "CHICKEN", color: "mustard" }],
          [{ text: "INSIDE", color: "green" }],
        ],
        body: "Golden fried chicken tenders layered with crisp romaine and crushed avocado.",
        echoWord: "CRISPY",
        ingredients: ["Lettuce", "Chicken", "Cheese", "Chipotle", "Fresh"],
        sticker: "CRUNCH",
        posterShape: "badge",
      },
      {
        id: 3,
        accent: "Zero Mess",
        headlineLines: [
          [{ text: "ROLLED", color: "charcoal" }],
          [{ text: "TIGHT", color: "ember" }],
        ],
        body: "Wrapped tight in warm toasted tortilla to lock in every drop of heat.",
        echoWord: "ROLLED",
        sticker: "HOT",
        posterShape: "circle",
      },
      {
        id: 4,
        accent: "Made To Order",
        headlineLines: [
          [{ text: "FRESH", color: "green" }],
          [{ text: "EVERY", outline: true }],
          [{ text: "TIME", color: "ember" }],
        ],
        body: "Prepped and rolled in under 180 seconds. Steaming, spicy and fresh.",
        echoWord: "FRESH",
        sticker: "DAILY",
        posterShape: "badge",
      },
    ],
  },
  {
    id: "drink",
    chapterIndex: 2,
    title: "CRUNCH & REFRESH",
    frameDir: "drink",
    totalFrames: 120,
    bgTint: "#EDE6DB",
    beats: [
      {
        id: 1,
        accent: "Sub-Zero Chill",
        headlineLines: [
          [{ text: "ICE", outline: true }],
          [{ text: "COLD", color: "ember" }],
        ],
        body: "Frosty chill crafted to cut through the richest, spiciest street bites.",
        echoWord: "CHILL",
        sticker: "ICE",
        posterShape: "circle",
      },
      {
        id: 2,
        accent: "Double Fried",
        headlineLines: [
          [{ text: "PERFECTLY", outline: true }],
          [{ text: "CRISPY", color: "mustard" }],
        ],
        body: "Golden russet cut fries dusted with smoked paprika and sea salt crystals.",
        echoWord: "CRUNCH",
        sticker: "CRISP",
        posterShape: "badge",
      },
      {
        id: 3,
        accent: "Honest Ingredients",
        headlineLines: [
          [{ text: "100%", color: "ember" }],
          [{ text: "FRESH", color: "mustard" }],
          [{ text: "TASTE", outline: true }],
        ],
        body: "No artificial shortcuts. 24-hour scratch preparation every single morning.",
        echoWord: "PURE",
        metrics: [
          { value: 100, suffix: "%", label: "Fresh Handcrafted" },
          { value: 0, suffix: "%", label: "Artificial Taste" },
          { value: 24, suffix: "h", label: "Hour Fresh Prep" },
        ],
        sticker: "100%",
        posterShape: "circle",
      },
      {
        id: 4,
        accent: "Street Harmony",
        headlineLines: [
          [{ text: "SIP", color: "ember" }],
          [{ text: "AND", outline: true }],
          [{ text: "CRUNCH", color: "mustard" }],
        ],
        body: "The unmistakable rhythm of handcrafted street food satisfaction.",
        echoWord: "SIP",
        sticker: "PAIR",
        posterShape: "badge",
      },
    ],
  },
  {
    id: "bag",
    chapterIndex: 3,
    title: "PACKED TO GO",
    frameDir: "bag",
    totalFrames: 120,
    bgTint: "#EDE6DB",
    beats: [
      {
        id: 1,
        accent: "Crafted Care",
        headlineLines: [
          [{ text: "WRAPPED", color: "charcoal" }],
          [{ text: "WITH", outline: true }],
          [{ text: "LOVE", color: "ember" }],
        ],
        body: "Packed with heat, aroma, and relentless devotion to street flavor.",
        echoWord: "PACKED",
        sticker: "WARM",
        posterShape: "circle",
      },
      {
        id: 2,
        accent: "Full Feast",
        headlineLines: [
          [{ text: "EVERYTHING", color: "mustard" }],
          [{ text: "IN ONE", outline: true }],
          [{ text: "BAG", color: "ember" }],
        ],
        body: "Burgers, rolls, fries and dips all sealed in custom insulated kraft bags.",
        echoWord: "TO GO",
        sticker: "SEALED",
        posterShape: "badge",
      },
      {
        id: 3,
        accent: "Fast Delivery",
        headlineLines: [
          [{ text: "FRESH TO", outline: true }],
          [{ text: "YOUR DOOR", color: "ember" }],
        ],
        body: "Piping hot delivery dispatched directly from our street food kitchens.",
        echoWord: "SPEED",
        sticker: "HOT",
        posterShape: "circle",
      },
      {
        id: 4,
        accent: "Street Culture",
        headlineLines: [
          [{ text: "EVERY", color: "mustard" }],
          [{ text: "BITE", color: "ember" }],
          [{ text: "MATTERS", color: "charcoal" }],
        ],
        body: "Join the street food revolution. Savor every single crunchy bite.",
        echoWord: "BITE",
        cta: "Order Now",
        sticker: "ORDER",
        posterShape: "badge",
      },
    ],
  },
];
