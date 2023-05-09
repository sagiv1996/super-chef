<template>
    <add-item-to-shopping-list @addItem="addItem" />
    <shopping-list :item="data" :single="true" @deleteValue="deleteValue" />
</template>

<script setup lang="ts">


const config = useRuntimeConfig();
const { BASE_URL } = config.public
const route = useRoute()


const { data, refresh } = await useLazyAsyncData<ShoppingList>(
    'getShoppingListById',
    () => $fetch(
        `shopping-list/get-by-id/${route.params.shoppingListId}`,
        {
            baseURL: BASE_URL
        }
    )
)


const deleteValue = (indexValue: number) => {
    data.value?.ingredients.splice(indexValue, 1);
    if (data.value?.ingredients.length === 0) {
        navigateTo('/shopping-list')
    }
}



const addItem = async (itemObject: any) => {
    await $fetch<ShoppingListItem>(`shopping-list/add-item/${route.params.shoppingListId}`, {
        baseURL: BASE_URL,
        method: 'PATCH',
        body: {
            name: itemObject.name,
            amount: itemObject.amount
        }
    })
    await refresh()
}
</script>