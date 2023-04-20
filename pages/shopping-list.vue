<template>
    <search-ingredient @select="selected" />
    <show-shopping-list :shoppingList="shoppingList" />
</template>
<script setup lang="ts">
const client = useSupabaseClient<Database>();

const { data: shoppingList, refresh, pending } = await useAsyncData(async () => {
    const { data } = await client.from('ShoppingListItem').select(`*,ingredientId("*")`)
    return data
})

const selected = async (shoppingListItem: any) => {
    await client.from("ShoppingListItem").insert({ "shoppingListId": 1, ingredientId: shoppingListItem.id, amount: 1 })
    await refresh()
}

</script>