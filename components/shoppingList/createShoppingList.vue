<template>
    <v-form ref="form" @submit.prevent="handleSubmit">
        <v-text-field label="List name" :rules=[required] v-model="listName"></v-text-field>
        <v-btn type="submit">Create</v-btn>
    </v-form>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const { BASE_URL } = config.public

const form = ref()
const listName = ref<string>()
const required = (value: string) => !!value || 'Required.'


const handleSubmit = async () => {
    const { valid } = await form.value.validate();
    if (valid) {
        const response = await $fetch<ShoppingList>('/shopping-list', {
            method: 'POST',
            baseURL: BASE_URL,
            body: {
                name: listName.value,
                ownerId: 'Sagiv'
            }
        })
        navigateTo(`/shopping-list/${response._id}`)
    }
}
</script>