declare interface Ingredient {
  createdAt: string;
  id: number;
  name: string;
  type: string;
  tags: string[];
  bought: boolean
}

declare interface InsertIngredient {
  createdAt?: string;
  id?: number;
  name?: string;
  type: string;
  tags?: string[];
  bought?: boolean;
}


declare interface UpdateIngredient {
  createdAt?: string;
  id: number;
  name?: string;
  type?: string;
  tags?: string[];
  bought?: boolean;
}