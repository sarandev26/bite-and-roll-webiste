export interface MenuItem {
  id: string;
  number: string;
  name: string;
  category: "Burgers" | "Wraps" | "Sides" | "Drinks";
  description: string;
  price: string;
  priceValue: number;
  previewImage: string;
  badge?: string;
  spicyLevel?: number;
}

const inrFormat = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "classic-burger",
    number: "01",
    name: "Classic Burger",
    category: "Burgers",
    description: "Double smash prime patty, house pickled relish, melted cheddar, toasted brioche bun.",
    price: inrFormat.format(149),
    priceValue: 149,
    previewImage: "/images/menu/classic-burger.webp",
    badge: "Bestseller",
  },
  {
    id: "double-cheese",
    number: "02",
    name: "Double Cheese",
    category: "Burgers",
    description: "Two prime smashed patties, double melted gouda, caramelized onion glaze.",
    price: inrFormat.format(229),
    priceValue: 229,
    previewImage: "/images/menu/double-cheese.webp",
    badge: "Fan Favorite",
  },
  {
    id: "chicken-burger",
    number: "03",
    name: "Chicken Burger",
    category: "Burgers",
    description: "Crispy spiced chicken thigh, crunchy purple cabbage slaw, garlic herb mayo.",
    price: inrFormat.format(199),
    priceValue: 199,
    previewImage: "/images/menu/chicken-burger.webp",
    spicyLevel: 1,
  },
  {
    id: "bbq-burger",
    number: "04",
    name: "BBQ Burger",
    category: "Burgers",
    description: "Smoked slow-cooked patty, smoky brown sugar BBQ glaze, crispy onion straw rings.",
    price: inrFormat.format(249),
    priceValue: 249,
    previewImage: "/images/menu/bbq-burger.webp",
  },
  {
    id: "spicy-burger",
    number: "05",
    name: "Spicy Burger",
    category: "Burgers",
    description: "Fiery hot honey glaze, melted pepper jack, charred fire jalapeños.",
    price: inrFormat.format(189),
    priceValue: 189,
    previewImage: "/images/menu/spicy-burger.webp",
    badge: "Hot Pick",
    spicyLevel: 3,
  },
  {
    id: "chicken-wrap",
    number: "06",
    name: "Chicken Wrap",
    category: "Wraps",
    description: "Crispy spiced tenders, crushed mint crema, romaine crunch in a warm rolled paratha.",
    price: inrFormat.format(179),
    priceValue: 179,
    previewImage: "/images/menu/chicken-wrap.webp",
    badge: "Signature Roll",
  },
  {
    id: "loaded-fries",
    number: "07",
    name: "Loaded Fries",
    category: "Sides",
    description: "Skin-on rustic fries, warm queso blanco drizzle, smoked peri-peri crumble, fresh scallions.",
    price: inrFormat.format(149),
    priceValue: 149,
    previewImage: "/images/menu/loaded-fries.webp",
  },
  {
    id: "nuggets",
    number: "08",
    name: "Nuggets",
    category: "Sides",
    description: "6-piece crispy battered tender chicken bites served with house smoked mustard dip.",
    price: inrFormat.format(129),
    priceValue: 129,
    previewImage: "/images/menu/nuggets.webp",
  },
  {
    id: "milkshake",
    number: "09",
    name: "Milkshake",
    category: "Drinks",
    description: "Hand-spun salted caramel malt, double whipped cream, artisan waffle cone crumb.",
    price: inrFormat.format(169),
    priceValue: 169,
    previewImage: "/images/menu/milkshake.webp",
    badge: "Sweet Rush",
  },
  {
    id: "cold-coffee",
    number: "10",
    name: "Cold Coffee",
    category: "Drinks",
    description: "18-hour cold brew extract, sweet condensed milk swirl, aromatic cinnamon dust on ice.",
    price: inrFormat.format(139),
    priceValue: 139,
    previewImage: "/images/menu/cold-coffee.webp",
  },
];
