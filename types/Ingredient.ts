declare interface Ingredient {
  createdAt: string;
  id: number;
  name: string;
  type: string;
  tags: string[];
}

declare interface InsertIngredient {
  createdAt?: string;
  id?: number;
  name?: string 
  type: string;
  tags?: string[];
}


declare interface UpdateIngredient {
  createdAt?: string;
  id: number;
  name?: string;
  type?: string;
  tags?: string[];
}