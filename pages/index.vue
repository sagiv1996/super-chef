
<template>
    <v-card title="Hello" />
    {{ data.body }}
</template>
<script setup>
const { data } = await useAsyncData('recipes', () => queryContent('/recipes').findOne())
</script>
