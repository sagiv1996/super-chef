<template>
    <v-form @submit="a">
        <v-combobox @update:search="findData" :items="items" item-title="name" no-filter :loading="loading" clearable
            append-inner-icon="mdi-plus" @click:clear="value = ''" v-model="value" :hide-no-data="false"
            @keyup.enter="addValue" @click:append-inner="addValue">
            <template v-slot:no-data v-if="value.length > 2">
                <v-list-item>
                    <v-list-item-title>
                        No results matching "<strong>{{ value }}</strong>". Press <kbd>enter</kbd> to create
                        a new one
                    </v-list-item-title>
                </v-list-item>
            </template>
            <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :title="item.raw.name" :subtitle="item.raw.type"
                    prepend-icon="mdi-home"></v-list-item>
            </template>
        </v-combobox>

    </v-form>
</template>
<script setup lang="ts">
const client = useSupabaseClient<Database>();


let items = ref<Ingredient[]>()
let loading = ref<boolean>()
let value = ref<string>('')


const addValue = async () => {
    await client.from("Ingredient").insert({ name: value.value })
    value.value = ''
    items.value = []

}
const a = () => {
    console.log(a)
}
const findData = async (str: string) => {
    if (str.length < 3) return
    loading.value = true
    const { data } = await client.from('Ingredient').select("*").like('name', `%${str}%`)
    items.value = data as Ingredient[]
    loading.value = false
}

</script>
