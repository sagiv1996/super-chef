<template>
    <v-combobox :items="ingredients || []" item-title="name" item-value="name" v-model.lazy="ingredient"
        v-model:search.lazy="filter" :loading="pending" :return-object="false" label="Add item"
        @update:modelValue="handlerChange" :rules="[required]" clearable prepend-inner-icon="mdi-magnify"
        placeholder="For example: Tuna">
    </v-combobox>
</template>


<script setup lang="ts">
const emit = defineEmits(['changeItem'])
const config = useRuntimeConfig();
const { BASE_URL } = config.public

const ingredient = ref<string>()
const filter = ref<string>('')
const limit = 3;
const required = (value: string) => !!value || 'Required.'
const { data: ingredients, pending } = await useFetch<IngredientInterface[]>(`/ingredient`, {
    baseURL: BASE_URL,
    query: {
        limit,
        name: filter
    },
    immediate: true,
    watch: [filter]
})

const handlerChange = () => {
    emit("changeItem", ingredient.value)
}

</script>