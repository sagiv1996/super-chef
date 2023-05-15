<template>
    <v-card :title="item.name" :subtitle="item.ownerId" :loading="isLoading">
        <v-card-text>
            <v-list>
                <v-hover v-for=" (ingredient, index) in item.ingredients">
                    <template v-slot:default="{ isHovering, props }">
                        <v-list-item v-bind="props" :title="ingredient?.ingredient?.name" :subtitle="ingredient.amount">
                            <template v-slot:append>
                                <v-scroll-x-reverse-transition>
                                    <v-btn v-show="isHovering" @click="deleteItem(ingredient, index)"
                                        icon="mdi-trash-can-outline" size="small" variant="text" title="Delete" />
                                </v-scroll-x-reverse-transition>
                                <ingredient-icon :category="ingredient.ingredient?.category" />
                            </template>
                            <template v-slot:prepend>
                                <v-list-item-action end>
                                    <v-checkbox-btn :model-value="ingredient.isBought"
                                        @change="handleChange(ingredient)"></v-checkbox-btn>

                                </v-list-item-action>
                            </template>
                        </v-list-item>
                    </template>
                </v-hover>




            </v-list>
            <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
            <v-btn to="/shopping-list">Back!</v-btn> </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
interface Props {
    item: ShoppingListInterface
}

const emit = defineEmits(['deleteValue'])
const { item } = defineProps<Props>()
const config = useRuntimeConfig();
const { BASE_URL } = config.public


const isLoading = ref<boolean>(false)

const handleChange = async (val: ShoppingListItemInterface) => {
    isLoading.value = true
    await $fetch(`/shopping-list/${val._id}`, {
        baseURL: BASE_URL,
        method: 'PATCH',
        body: {
            isBought: !val.isBought
        }
    })
    isLoading.value = false

}

const deleteItem = async (val: ShoppingListItemInterface, indexValue: number) => {
    isLoading.value = true
    await $fetch(`/shopping-list/deleteItem/${val._id}`, {
        baseURL: BASE_URL,
        method: "PATCH",
    })
    emit('deleteValue', indexValue)
    isLoading.value = false


}




</script>
