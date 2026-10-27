export interface IngredientPin {
  id: string;
  text: string;
  x: number; // percentage of viewport width (0 - 100)
  y: number; // percentage of viewport height (0 - 100)
  lineAngle?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "left" | "right";
  startProg: number; // chapter progress (0 - 1)
  endProg: number;   // chapter progress (0 - 1)
}

export interface ChapterIngredientConfig {
  chapterId: string;
  labels: IngredientPin[];
}

export const INGREDIENT_LABELS_CONFIG: ChapterIngredientConfig[] = [
  {
    chapterId: "burger",
    labels: [
      { id: "b-bun", text: "Sesame Bun", x: 68, y: 18, lineAngle: "bottom-left", startProg: 0.10, endProg: 0.85 },
      { id: "b-onion", text: "Onion", x: 74, y: 26, lineAngle: "bottom-left", startProg: 0.20, endProg: 0.80 },
      { id: "b-tomato", text: "Tomato", x: 72, y: 35, lineAngle: "bottom-left", startProg: 0.25, endProg: 0.75 },
      { id: "b-cucumber", text: "Cucumber", x: 26, y: 24, lineAngle: "bottom-right", startProg: 0.30, endProg: 0.75 },
      { id: "b-cabbage", text: "Cabbage", x: 24, y: 32, lineAngle: "bottom-right", startProg: 0.35, endProg: 0.75 },
      { id: "b-lettuce", text: "Lettuce", x: 75, y: 46, lineAngle: "bottom-left", startProg: 0.35, endProg: 0.85 },
      { id: "b-cheddar", text: "Cheddar", x: 73, y: 56, lineAngle: "bottom-left", startProg: 0.40, endProg: 0.90 },
      { id: "b-patty", text: "Grilled Patty", x: 72, y: 66, lineAngle: "top-left", startProg: 0.45, endProg: 0.92 },
      { id: "b-sauce", text: "Smoky Sauce", x: 30, y: 72, lineAngle: "top-right", startProg: 0.45, endProg: 0.92 },
    ],
  },
  {
    chapterId: "wrap",
    labels: [
      { id: "w-roti", text: "Soft Roti", x: 68, y: 22, lineAngle: "bottom-left", startProg: 0.12, endProg: 0.85 },
      { id: "w-chicken", text: "Crispy Chicken", x: 74, y: 34, lineAngle: "bottom-left", startProg: 0.22, endProg: 0.85 },
      { id: "w-lettuce", text: "Fresh Lettuce", x: 28, y: 28, lineAngle: "bottom-right", startProg: 0.28, endProg: 0.80 },
      { id: "w-tomato", text: "Tomato", x: 72, y: 46, lineAngle: "bottom-left", startProg: 0.35, endProg: 0.85 },
      { id: "w-chipotle", text: "Chipotle Sauce", x: 70, y: 58, lineAngle: "top-left", startProg: 0.40, endProg: 0.90 },
      { id: "w-cheddar", text: "Cheddar", x: 32, y: 68, lineAngle: "top-right", startProg: 0.45, endProg: 0.90 },
    ],
  },
  {
    chapterId: "drink",
    labels: [
      { id: "d-cola", text: "Ice Cold Cola", x: 68, y: 24, lineAngle: "bottom-left", startProg: 0.15, endProg: 0.88 },
      { id: "d-ice", text: "Crisp Ice", x: 72, y: 38, lineAngle: "bottom-left", startProg: 0.20, endProg: 0.85 },
      { id: "d-fries", text: "Golden Fries", x: 26, y: 32, lineAngle: "bottom-right", startProg: 0.30, endProg: 0.90 },
      { id: "d-salt", text: "Sea Salt", x: 70, y: 56, lineAngle: "top-left", startProg: 0.38, endProg: 0.90 },
    ],
  },
  {
    chapterId: "bag",
    labels: [
      { id: "g-packed", text: "Packed Fresh", x: 68, y: 24, lineAngle: "bottom-left", startProg: 0.15, endProg: 0.85 },
      { id: "g-sealed", text: "Sealed Tight", x: 72, y: 36, lineAngle: "bottom-left", startProg: 0.25, endProg: 0.85 },
      { id: "g-rope", text: "Rope Handles", x: 28, y: 28, lineAngle: "bottom-right", startProg: 0.28, endProg: 0.88 },
      { id: "g-ready", text: "Ready to Go", x: 70, y: 52, lineAngle: "top-left", startProg: 0.40, endProg: 0.92 },
    ],
  },
];
