<template>
    <search-ingredient />
    <shopping-list :item="data" :single="true" />
</template>

<script setup lang="ts">


const config = useRuntimeConfig();
const { BASE_URL } = config.public
const route = useRoute()


const { data, pending, error, refresh } = await useLazyAsyncData<ShoppingList>(
    'getShoppingList',
    () => $fetch(
        `shopping-list/get-by-id/${route.params.shoppingListId}`,
        {
            baseURL: BASE_URL
        }
    )
)
</script>