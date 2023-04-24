<template>
    <v-card :loading="pending || loading">
        <v-card-title>
            Shopping list
        </v-card-title>
        <v-card-text>

            {{ ingredients }}
        </v-card-text>
        <v-card-action>
            <v-btn @click="addProduct">Add product</v-btn>
        </v-card-action>
    </v-card>
</template>

<script setup lang="ts">

const client = useSupabaseClient<Database>();

let loading = ref<boolean>(false)

const { data: ingredients, refresh, pending } = await useAsyncData(async () => {
    const { data } = await client.from('ingredient').select('*')
    return data as Ingredient[]
})

const addProduct = async () => {
    loading.value = true
    await client.from('ingredient').insert({
        name: 'name', type: 'type', tags: [
            "A", "B", "c"
        ]
    })
    loading.value = false
    await refresh()
}



</script>
