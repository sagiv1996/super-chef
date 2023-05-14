declare interface Recipe {
  _id: string;
  name: string;
  description: string;
  steps: string[];
  imageURL: string;
  ownerId: string;
  tags: string[];
  ingredients: [{ ingredient: Ingredient; amount: number }];
}
