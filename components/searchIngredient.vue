<template>
    <v-combobox @update:search="loadIngredients" :items="ingredients" item-title="name" no-filter :loading="loading"
        clearable item-value="id" @change="handleChange" append-inner-icon="mdi-plus" v-model="ingredient"
        :hide-no-data="false" @keyup.enter="insertIngredient" @click:append-inner="insertIngredient">
        <template v-slot:no-data v-if="typeof ingredient === 'string' && ingredient.length > 2">
            <v-list-item>
                <v-list-item-title>
                    No results matching "<strong>{{ ingredient }}</strong>". Press <kbd>enter</kbd> to create
                    a new one
                </v-list-item-title>
            </v-list-item>
        </template>
        <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :title="item.raw.name" :subtitle="item.raw.type + getIconByType(item.raw.type)"
                :prepend-icon="getIconByType(item.raw.type)" />
        </template>
    </v-combobox>
</template>
<script setup lang="ts">
const emit = defineEmits<{
    (e: 'select', ingredient: Ingredient): void
}>()
const client = useSupabaseClient<Database>();


const ingredients = ref<Ingredient[]>([])
const loading = ref<boolean>()
const ingredient = ref<Ingredient | string>()

const handleChange = () => {
    if (ingredient && typeof ingredient.value === 'object')
        emit('select', ingredient.value)
}
const insertIngredient = async () => {
    const { data } = await client.from("Ingredient").insert({ name: ingredient.value }).select("*").single()
    ingredient.value = data as Ingredient
    handleChange()
    ingredient.value = undefined
    ingredients.value = []
}

const loadIngredients = async (str: string) => {
    if (str.length < 3) return
    loading.value = true
    const { data } = await client.from('Ingredient').select("*").like('name', `%${str}%`)
    ingredients.value = data as Ingredient[]
    loading.value = false
}




const getIconByType = (type: string) => {
    switch (type) {
        case 'Baking':
            return 'mdi-baguette'
        case 'Meat':
            return 'mdi-food-steak'
        case 'Drinks':
            return 'mdi-cup'
        case 'Condiments':
            return 'mdi-shaker'
        case 'Produce':
            return 'mdi-fruit-pineapple'
        case 'Dairy':
            return 'mdi-cheese'
        case 'Misc':
            return 'mdi-mushroom'
        default:
            return ''
    }

}
</script>
