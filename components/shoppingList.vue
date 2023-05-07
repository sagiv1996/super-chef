<template>
    <v-card :title="item.name" :subtitle="item.ownerId">
        <v-card-text>
            <v-list :max-height="single ? 'none' : '100'" style="overflow:hidden;">
                <v-list-item v-for="ingredient in item.ingredients" :title="ingredient?.ingredient?.name"
                    :active="ingredient.isBought" :subtitle="ingredient.amount" @change="handleChange(ingredient)">
                    <template v-slot:append="{ isActive }">
                        <v-list-item-action end>
                            <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                        </v-list-item-action>
                    </template>
                </v-list-item>
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
const { item, single } = defineProps<Props>()
const config = useRuntimeConfig();
const { BASE_URL } = config.public


const handleChange = async (val: ShoppingListItem) => {
    console.log({ val })
    // console.log(`/shoppingList/${val.ingredient._id}`, {
    //     baseURL: BASE_URL,
    //     method: 'PATCH',
    //     body: {
    //         isBought: !val.isBought
    //     }

    // })
    const a = await $fetch(`/shopping-list/${val._id}`, {
        baseURL: BASE_URL,
        method: 'PATCH',
        body: {
            isBought: !val.isBought
        }

    })
}

</script>
