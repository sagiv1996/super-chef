<template>
    <v-container fill-height>
        <v-layout>
            <v-app-bar title="Application bar">
                <v-app-bar-nav-icon @click="drawer = !drawer" />
            </v-app-bar>
            <v-navigation-drawer v-model="drawer">
                <v-list>
                    <v-list-item title="Navigation drawer"></v-list-item>
                </v-list>

                <template v-slot:append>
                    <div class="pa-2">
                        <v-switch v-model="darkMode" @change="toggleTheme" true-icon="mdi-weather-night"
                            label="Select theme" false-icon="mdi-brightness-6" />
                    </div>
                </template>
            </v-navigation-drawer>

            <v-main style="min-height: 300px;">

                <slot> </slot>
            </v-main>
        </v-layout>
    </v-container>
</template>
<script setup lang="ts">
import { useTheme } from 'vuetify'
const darkMode = ref<boolean>(true);
const drawer = ref<boolean>();
const theme = useTheme()


const toggleTheme = () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
</script>