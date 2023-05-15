<template>
    <v-card :title="shoppingList.name" :subtitle="shoppingList.ownerId">
        <v-card-text>
            <v-row>
                <v-col cols="10">
                    <v-progress-linear :model-value="lengthIsBought" :max="shoppingList.ingredients.length" />
                </v-col>
                <v-col cols="2">
                    {{ lengthIsBought }} / {{ shoppingList.ingredients.length }}
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn :to="`/shopping-list/${shoppingList._id}`">
                <v-icon>mdi-open-in-new</v-icon>
                <v-tooltip activator="parent" location="top">Open</v-tooltip>
            </v-btn>
            <v-spacer />
            <v-btn @click="deleteList(shoppingList)" size="small" variant="text">
                <v-icon>mdi-trash-can-outline</v-icon>
                <v-tooltip activator="parent" location="top">Delete</v-tooltip>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script setup lang="ts">

const config = useRuntimeConfig();
const shoppingListStore = useShoppingList()
const { BASE_URL } = config.public
interface Props {
    shoppingList: ShoppingListInterface
}
const emit = defineEmits(['deleteList'])

const { shoppingList } = defineProps<Props>()


const lengthIsBought = computed(() => {
    return shoppingList.ingredients.filter(shoppingListItem => shoppingListItem.isBought).length
});

const deleteList = async (val: ShoppingListInterface) => {
    await $fetch(`/shopping-list/${val._id}`, {
        baseURL: BASE_URL,
        method: "DELETE",
    })
    shoppingListStore.removeShoppingList(val)
    emit('deleteList')
}
</script>
