<template>
    <v-form @submit.prevent="handleSubmit">
        <v-row>
            <v-col cols="12" sm="9">
                <v-combobox :items="ingredients" item-title="name" v-model:search="filter" variant="outlined"
                    menu-icon="mdi-playlist-edit" @update:search="refresh" :rules="[rules.required]"
                    label="Add row to Shopping List" clearable :loading="pending" item-value="id" @change="handleChange"
                    @keyup.enter="handleSubmit" v-model="ingredient">
                    <template v-slot:item="{ props, item }">
                        <v-list-item v-bind="props" :title="item.raw.name" :subtitle="item.raw.type"
                            :prepend-icon="mapIcon[item.raw.type] || 'mdi-null'" />
                    </template>
                </v-combobox>
            </v-col>
            <v-col cols="9" sm="2">
                <v-text-field prepend-inner-icon="mdi-minus" label="Amount" variant="outlined" clearable
                    :rules="[rules.bigThan0, rules.smallThan11, rules.required]" @click:append-inner="increment"
                    @click:prepend-inner="decrement" v-model.number="amount" append-inner-icon="mdi-plus">
                </v-text-field>
            </v-col>
            <v-col cols="3" sm="1">
                <v-btn type="submit" variant="outlined" height="56">
                    <v-icon>mdi-send-check-outline</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>


<script setup>

const emit = defineEmits(["change"])


const client = useSupabaseClient()
const filter = ref()
const ingredient = ref();
const amount = ref(1);

const decrement = () => {
    if (amount.value > 1)
        amount.value--
}
const increment = () => {
    if (amount.value < 10)
        amount.value++
}
const rules = {
    required: value => !!value || 'Required.',
    bigThan0: value => value > 0 || 'Min value is 1',
    smallThan11: value => value < 11 || 'Max value is 10'
}

const handleSubmit = async (event) => {
    const { valid } = await event
    if (!valid) return
    if (!ingredients.value.length) {
        const keys = Object.keys(mapIcon);
        const type = keys[keys.length * Math.random() << 0]
        const newIngredientRecord = await insertIngredient(ingredient.value, type)
        emit('change', newIngredientRecord.id, amount.value)
    }
    else {
        emit('change', ingredient.value.id, amount.value)
    }



}

const insertIngredient = async (name, type) => {
    const { status, data } = await client.from("Ingredient").insert({ name, type }).select('id', 'type', 'name').single()
    if (status === 201) {
        return data
    }
    alert("Error")

}
const { data: ingredients, refresh, pending } = await useAsyncData(async () => {
    const { data } = await client.from('Ingredient').select('id, name, type').like('name', `%${filter.value}%`).limit(5).order('name')
    return data


})


const mapIcon = { "Baking": "mdi-baguette", "Meat": "mdi-food-steak", "Drinks": "mdi-cup", "Condiments": "mdi-shaker", "Produce": "mdi-fruit-pineapple", "Dairy": "mdi-cheese", "Misc": "mdi-mushroom" }

</script>
