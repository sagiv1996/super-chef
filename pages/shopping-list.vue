<template>
    <search-ingredient @change="handleChange" />
    <show-shopping-list :shoppingList="shoppingList" />
</template>
<script setup lang="ts">
const client = useSupabaseClient<Database>();

const { data: shoppingList, refresh } = await useAsyncData(async () => {
    const { data } = await client.from('ShoppingListItem').select(`*,ingredientId("*")`)
    return data
})

const handleChange = async (id: number, amount: number) => {
    await client.from("ShoppingListItem").insert({ "shoppingListId": 1, ingredientId: id, amount }).select('*').single()
    await refresh()
}

</script>