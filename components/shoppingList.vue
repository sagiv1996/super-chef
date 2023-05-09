<template>
    <v-card :title="item.name" :subtitle="item.ownerId" :loading="isLoading">
        <v-card-text>
            <v-list :max-height="single ? 'none' : '100'" style="overflow:hidden;">

                <v-hover v-for=" (ingredient, index) in item.ingredients">
                    <template v-slot:default="{ isHovering, props }">
                        <v-list-item v-bind="props" :title="ingredient?.ingredient?.name" :active="ingredient.isBought"
                            :subtitle="ingredient.amount" @change="handleChange(ingredient)">
                            <template v-slot:append>
                                <v-btn v-show="isHovering" @click="deleteItem(ingredient, index)"
                                    icon="mdi-trash-can-outline" size="small" variant="text" title="Delete" />
                                <v-icon color="red">mdi-food-apple</v-icon>
                            </template>
                            <template v-slot:prepend="{ isActive }">
                                <v-list-item-action end>
                                    <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>

                                </v-list-item-action>
                            </template>
                        </v-list-item>
                    </template>
                </v-hover>




            </v-list>
            <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
            <v-btn v-if="!single" :to="`/shopping-list/${item._id}`">open!</v-btn>
            <v-btn v-else to="/shopping-list">Back!</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
interface Props {
    item: ShoppingList
    single: { type: boolean, default: false }
}

const emit = defineEmits(['deleteValue'])
const { item, single } = defineProps<Props>()
const config = useRuntimeConfig();
const { BASE_URL } = config.public


const isLoading = ref<boolean>(false)

const handleChange = async (val: ShoppingListItem) => {
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

const deleteItem = async (val: ShoppingListItem, indexValue: number) => {
    isLoading.value = true
    await $fetch(`/shopping-list/deleteItem/${val._id}`, {
        baseURL: BASE_URL,
        method: "PATCH",
    })
    emit('deleteValue', indexValue)
    isLoading.value = false


}




</script>
