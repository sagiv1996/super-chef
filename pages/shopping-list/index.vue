<template>
    <v-btn position="fixed" location="bottom right" @click="dialog = true" icon>
        <v-icon>mdi-plus</v-icon>
        <v-tooltip activator="parent">Click me to create a new shopping list</v-tooltip>
    </v-btn>
    <v-dialog v-model="dialog" width="350">
        <v-card>
            <v-card-text>
                <create-shopping-list />
            </v-card-text>
        </v-card>
    </v-dialog>
    <v-row>
        <v-col v-for="(shoppingList) in shoppingLists">
            <shopping-list-progress-linear :shoppingList="shoppingList" @deleteList="refresh" />
        </v-col>

    </v-row>
</template>

<script setup lang="ts">

const config = useRuntimeConfig();
const route = useRoute()
const { BASE_URL } = config.public

const { data: shoppingLists, pending, error, refresh } = await useAsyncData<ShoppingListInterface[]>(
    'getShoppingListsByOwnerId',
    () => $fetch(
        'shopping-list/Sagiv',
        {
            baseURL: BASE_URL
        }
    )
)


const dialog = ref<boolean>(!shoppingLists.value?.length || route.query.new === 'true')
</script>