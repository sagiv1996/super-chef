<template>
    {{ data }}
    <v-btn @click="u">Click!</v-btn>
</template>
<script setup>
const client = useSupabaseClient();
const { data } = await useAsyncData('note', async () => {
    return await client.from('note').select('*')
})
const u = async () => {
    console.log("A")
    const a = await client.from('note').insert({ 'title': "Bela bela" })
    console.log({ a })
};
</script>