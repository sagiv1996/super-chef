declare interface Database {
  public: {
    Tables: {
      Ingredient: {
        Row: Ingredient;
        Insert: InsertIngredient;
        Update: UpdateIngredient;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
