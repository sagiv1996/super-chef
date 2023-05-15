<template>
    <v-container fill-height>
        <v-layout>
            <v-app-bar title="Application bar">
                <v-app-bar-nav-icon @click="drawer = !drawer" />
            </v-app-bar>
            <v-navigation-drawer v-model="drawer">
                <v-list nav>
                    <v-list-item v-for="route in routes" :title="route.title" :to="route.path"
                        :prepend-icon="route.icon"></v-list-item>
                </v-list>

                <template v-slot:append>
                    <div class="pa-2">
                        <v-switch v-model="darkMode" @change="toggleTheme" true-icon="mdi-weather-night"
                            label="Select theme" false-icon="mdi-brightness-6" />
                    </div>
                </template>
            </v-navigation-drawer>

            <v-main style="min-height: 300px;">
                {{ shoppingLists.items }}

                <slot> </slot>
            </v-main>
        </v-layout>
    </v-container>
</template>
<script setup lang="ts">
import { useTheme } from 'vuetify'
const shoppingLists = useShoppingList()
const darkMode = ref<boolean>(true);
const drawer = ref<boolean>();
const theme = useTheme()

const toggleTheme = () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'

const routes = [
    { path: '/', icon: "mdi-home", title: "Home page" },
    { path: '/shopping-list', icon: 'mdi-list-box', title: 'My shopping list' }

]

const { data } = useAsyncData(async () => {
    await shoppingLists.loadShoppingLists()
})
</script>