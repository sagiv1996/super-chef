declare interface ShoppingListItemInterface {
  _id: string;
  amount: number;
  isBought: boolean;
  ingredient: {
    _id: string;
    name: string;
    category?: string;
  };
}

declare interface ShoppingListInterface {
  _id: string;
  ownerId: string;
  name: string;
  ingredients: ShoppingListItemInterface[];
}
