declare interface ShoppingListItem {
  _id: string;
  amount: number;
  isBought: boolean;
  ingredient: {
    _id: string;
    name: string;
  };
}

declare interface ShoppingList {
  _id: string;
  ownerId: string;
  name: string;
  ingredients: ShoppingListItem[];
}
