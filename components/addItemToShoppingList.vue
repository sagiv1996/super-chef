<template>
    <v-row>
        <v-col cols="9">
            <search-ingredient @changeItem="(val: string) => ingredient = val" />
        </v-col>
        <v-col cols="2">
            <v-text-field type="number" label="Amount" v-model.number="amount" prepend-inner-icon="mdi-minus"
                append-inner-icon="mdi-plus" @click:append-inner="amount++" @click:prepend-inner="decrement" min="1">
            </v-text-field>
        </v-col>
        <v-col cols="1">
            <v-btn @click="handleSubmit">submit</v-btn>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
const emit = defineEmits(['addItem'])
const amount = ref<number>(1);
const ingredient = ref<string>()
const decrement = () => {
    if (amount.value > 1) {
        amount.value--
    }
}



const handleSubmit = async () => {
    emit('addItem', { amount: amount.value, name: ingredient.value })
}








</script>

<style>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
}
</style>