export {};
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

declare global {
  interface LoadRecipe extends ParsedContent {
    body: Recipe[];
  }
}
