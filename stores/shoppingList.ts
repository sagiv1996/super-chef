export const useShoppingList = defineStore("shoppingLists", {
  state: () => ({
    items: [] as ShoppingListInterface[],
  }),

  getters: {
    nav: (state) =>
      state.items.map((item) => ({ title: item.name, _id: item._id })),
  },
  actions: {
    addShoppingList(shoppingList: ShoppingListInterface) {
      this.items.push(shoppingList);
    },

    removeShoppingList(shoppingList: ShoppingListInterface) {
      const shoppingListIndex = this.items.findIndex(
        (item) => item._id === shoppingList._id
      );
      this.items.splice(shoppingListIndex, 1);
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
