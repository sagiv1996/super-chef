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
const route = useRoute()
const { data: recipes, pending, error, refresh } = await useAsyncData<RecipeInterface[]>(
    () => $fetch(
        'recipe',
        {
            baseURL: BASE_URL,
            body: {

            }
        }
    )
)
</script>