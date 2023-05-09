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
        </v-card-actions>
    </v-card>
</template>
<script setup lang="ts">
interface Props {
    shoppingList: ShoppingList
}
const { shoppingList } = defineProps<Props>()


const lengthIsBought = computed(() => {
    return shoppingList.ingredients.filter(shoppingListItem => shoppingListItem.isBought).length
});
</script>
