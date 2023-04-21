<template>
    <v-card :loading="pending">
        <v-card-text>
            <search-ingredient @change="insertShoppingListItem" />
            <show-shopping-list :shoppingList="shoppingList" @change="updateRecord" />
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
const client = useSupabaseClient<Database>();

const { data: shoppingList, refresh, pending } = await useAsyncData(async () => {
    const { data } = await client.from('ShoppingListItem').select(`*,ingredientId("*")`).order("isBought")
    return data
})


const insertShoppingListItem = async (id: number, amount: number) => {
    await client.from("ShoppingListItem").insert({ "shoppingListId": 1, ingredientId: id, amount }).select('*').single()
    await refresh()
}

const updateRecord = async () => {
    await refresh()
}

</script>