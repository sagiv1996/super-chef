<template>
    <v-form ref="form" @submit.prevent="handleSubmit">
        <v-row>
            <v-col cols="12" sm="9">
                <search-ingredient @changeItem="(val: string) => ingredient = val" />
            </v-col>
            <v-col cols="8" sm="2">
                <v-text-field type="number" label="Amount" v-model.number="amount" prepend-inner-icon="mdi-minus"
                    append-inner-icon="mdi-plus" @click:append-inner="amount++" @click:prepend-inner="decrement" min="1"
                    :rules="[rules.isRequired, rules.isGreaterThan0]">
                </v-text-field>
            </v-col>
            <v-col cols="4" sm="1">
                <v-btn type="submit" size="x-large">submit</v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<script setup lang="ts">
const emit = defineEmits(['addItem'])
const amount = ref<number>(1);
const ingredient = ref<string>()
const form = ref()
const decrement = () => {
    if (amount.value > 1) {
        amount.value--
    }
}


const rules = {
    isRequired: (value: string) => !!value || 'Required.',
    isGreaterThan0: (value: number) => value > 0 || 'The minimum value is 1'
}


const handleSubmit = async () => {
    const { valid } = await form.value.validate();
    if (valid) {
        emit('addItem', { amount: amount.value, name: ingredient.value })
        await form.value.reset();
    }
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