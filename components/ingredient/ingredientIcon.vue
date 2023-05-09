<template>
    <v-icon :color="getColor" :icon="getIcon"></v-icon>
</template>

<script setup lang="ts">

const { category } = defineProps({
    category: {
        type: String,
        default: 'default',
    },
});

interface Category {
    color: string;
    icon: string;
}

const categories: Record<string, Category> = {
    Meat: {
        color: 'red-darken-4',
        icon: 'mdi-food-steak',
    },
    FruitsAndVegetables: {
        color: 'red',
        icon: 'mdi-food-apple',
    },
    Fish: {
        color: 'blue',
        icon: 'mdi-fish',
    },
    Bakery: {
        color: 'yellow',
        icon: 'mdi-baguette',
    },
    default: {
        color: 'green',
        icon: 'mdi-search-web',
    },
};

const getIcon = categories[category].icon;
const getColor = categories[category].color;
</script>
