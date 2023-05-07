<template>
    <v-btn position="fixed" variant="flat">Text@!!
    </v-btn>
    <v-row>
        <v-col v-for="shoppingList in shoppingLists"> <shopping-list :item="shoppingList" /></v-col>

    </v-row>
</template>

<script setup lang="ts">

const config = useRuntimeConfig();
const { BASE_URL } = config.public


const { data: shoppingLists, pending, error, refresh } = await useLazyAsyncData<ShoppingList[]>(
    'getShoppingList',
    () => $fetch(
        'shopping-list/Sagiv',
        {
            baseURL: BASE_URL
        }
    )
)
</script>