declare interface RecipeInterface {
  _id: string;
  name: string;
  description: string;
  steps: string[];
  imageURL: string;
  ownerId: string;
  tags: string[];
  ingredients: [{ ingredient: IngredientInterface; amount: number }];
}
