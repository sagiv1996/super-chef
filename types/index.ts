export {};
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

declare global {
  interface LoadRecipe extends ParsedContent {
    body: Recipe[];
  }

  interface ingredient {
    quantity: string;
    name: string;
    type: string;
  }
  interface Recipe {
    name: string;
    steps: string[];
    imageURL: string;
    originalURL: string;
    userName: string;
    tags: string[];
    ingredients: ingredient[];
  }
}
