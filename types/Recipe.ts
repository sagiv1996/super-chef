declare interface Recipe {
  name: string;
  steps: string[];
  imageURL: string;
  originalURL: string;
  userName: string;
  tags: string[];
  ingredients: Ingredient[];
}