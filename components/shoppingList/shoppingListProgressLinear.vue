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
            <v-btn :to="`/shopping-list/${shoppingList._id}`">open</v-btn>
            <v-spacer />
            <v-btn @click="deleteList(shoppingList)"
                                        icon="mdi-trash-can-outline" size="small" variant="text" title="Delete" />
        </v-card-actions>
    </v-card>
</template>
<script setup lang="ts">

const config = useRuntimeConfig();
const { BASE_URL } = config.public
interface Props {
    shoppingList: ShoppingList
}
const emit = defineEmits(['deleteList'])

const { shoppingList } = defineProps<Props>()


const lengthIsBought = computed(() => {
    return shoppingList.ingredients.filter(shoppingListItem => shoppingListItem.isBought).length
});

const deleteList = async (val: ShoppingList) => {
    await $fetch(`/shopping-list/${val._id}`, {
        baseURL: BASE_URL,
        method: "DELETE",
    })
    emit('deleteList')
}
</script>
