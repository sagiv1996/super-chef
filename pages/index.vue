
<template>
    <template v-if="pending"><v-card-title title="Loading...." /></template>
    <template v-else-if="error"><v-card-title title="Error" /></template>
    <v-row v-else-if="recipes?.body">
        <v-col v-for="(recipe) in recipes.body">
            <recipe-card :recipe="recipe" />
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
const { data: recipes, pending, error } = await useAsyncData(
    () => queryContent<LoadRecipe>('/recipes').findOne()
)

</script>
