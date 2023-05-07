
<template>
    <v-combobox :items="ingredients || []" item-title="name" item-value="_id" v-model.lazy="ingredient"
        v-model:search.lazy="filter" :loading="pending">
    </v-combobox>
</template>


<script setup lang="ts">

interface Ingredient {
    _id: string
    name: string
}

const config = useRuntimeConfig();
const { BASE_URL } = config.public

const ingredient = ref<Ingredient>()
const filter = ref<string>('')
const limit = 3;
const { data: ingredients, pending } = await useFetch<Ingredient[]>(`/ingredient`, {
    baseURL: BASE_URL,
    query: {
        limit,
        name: filter
    },
    immediate: true,
    watch: [filter]
})


</script>