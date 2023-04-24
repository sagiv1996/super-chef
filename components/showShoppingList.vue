<template>
    <v-list select-strategy="classic">
        <v-list-item v-for="shoppingListItem in shoppingList" :title="shoppingListItem.ingredient_id.name"
            active-class="text-decoration-line-through" :value="shoppingListItem.id" :subtitle="shoppingListItem.amount"
            :active="shoppingListItem.isBought" @change="handleChange(shoppingListItem)">
            <template v-slot:prepend="{ isActive }">
                <v-icon :icon="getIconByType(shoppingListItem.ingredient_id.type)"></v-icon>
            </template>
            <template v-slot:append="{ isActive }">
                <v-list-item-action end>
                    <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                </v-list-item-action>
            </template>
        </v-list-item>
    </v-list>
</template>




<script setup>
const client = useSupabaseClient()

const emit = defineEmits(["change"])

defineProps({
    shoppingList: {
        type: [Object],
    }
})


const getIconByType = (type) => {
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


const handleChange = async (shoppingListItem) => {
    shoppingListItem.isBought = !shoppingListItem.isBought
    await client.from('shopping_list_item').update({ isBought: shoppingListItem.isBought }).eq('id', shoppingListItem.id)
    emit('change')
}
</script>


<!-- 
<script setup lang="ts">
interface Props {
    shoppingList: any[]
}
const client = useSupabaseClient()

const { shoppingList } = defineProps<Props>()


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


const handleChange = async (shoppingListItem: any) => {
    const {data} = await client.from('ShoppingListItem').update("isBought, true")
    console.log({ shoppingListItem });
}
</script> -->