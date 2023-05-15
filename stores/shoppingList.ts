export const useShoppingList = defineStore("shoppingLists", {
  state: () => ({
    items: [] as ShoppingListInterface[],
  }),

  actions: {
    addShoppingList(shoppingList: ShoppingListInterface) {
      this.items.push(shoppingList);
    },

    removeShoppingList(shoppingList: ShoppingListInterface) {
      this.items.push(shoppingList);
    },

    async loadShoppingLists() {
      const config = useRuntimeConfig();
      const { BASE_URL } = config.public;
      const { data } = await useAsyncData<ShoppingListInterface[]>(() =>
        $fetch<ShoppingListInterface[]>("shopping-list/Sagiv", {
          baseURL: BASE_URL,
        })
      );
      if (Array.isArray(data.value)) {
        this.items = data.value;
      } else {
        console.error("Invalid data format. Expected an array.");
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useShoppingList, import.meta.hot));
}
