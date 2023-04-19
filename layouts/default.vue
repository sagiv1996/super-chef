<template>
    <v-layout>
        <v-app-bar title="Application bar">
            <v-app-bar-nav-icon @click="drawer = !drawer" />
        </v-app-bar>
        <v-navigation-drawer v-model="drawer">
            <v-list>
                <v-list-item title="Navigation drawer"></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main style="min-height: 300px;">
            <slot> </slot>
        </v-main>
    </v-layout>
</template>
<script setup lang="ts">
const drawer = ref<boolean>();
</script>