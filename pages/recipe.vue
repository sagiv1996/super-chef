<template>
    <v-row>
        <v-col v-for="recipe in recipes">
            <recipe-card :recipe="recipe" />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">

const config = useRuntimeConfig();
const { BASE_URL } = config.public

const { data: recipes, pending, error, refresh } = await useAsyncData<Recipe[]>(
    () => $fetch(
        'recipe',
        {
            baseURL: BASE_URL
        }
    )
)
</script>