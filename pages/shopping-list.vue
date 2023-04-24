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
const user = useSupabaseUser()

// definePageMeta({
//     middleware: 'auth'
// })

const { data: shoppingList, refresh, pending } = await useAsyncData(async () => {
    const { data } = await client.from('shopping_list_item').select(`*,ingredient_id("*")`)
    return data
})


const insertShoppingListItem = async (id: number, amount: number) => {
    const userId = user.value?.id
    if (userId) {
        try {
            await client.from("shopping_list_item").insert({ "shopping_list_id": 1, ingredient_id: id, amount }).select('*').single()
        } catch (e) {
            console.log({ e })
        }

        await refresh()
    }

}

const updateRecord = async () => {
    await refresh()
}

</script>