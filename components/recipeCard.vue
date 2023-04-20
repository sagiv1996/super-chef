<template>
    <v-card :title="recipe.name" :subtitle="recipe.userName || 'Not know'" min-width="400" hover elevation="10">
        <v-img :src="recipe.imageURL"></v-img>
        <v-chip-group class="ma-5">
            <v-chip label v-for="tag in recipe.tags" :ripple="false" :text="tag" />
        </v-chip-group>
        <v-card-text>
            <v-timeline>
                <v-timeline-item size="small" v-for="(step, index) in recipe.steps"
                    :dot-color="getColor(index, recipe.steps.length - 1)">
                    {{ step }}
                </v-timeline-item>
            </v-timeline>

        </v-card-text>


        <v-card-actions>
            <v-btn>Add for shopping list</v-btn>
            <v-spacer></v-spacer>

            <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>
                <v-list>
                    <!-- <v-list-item v-for="ingredient in recipe.ingredients">
                        <template v-slot:prepend>
                            <v-icon :icon="getIcon(ingredient.type)"></v-icon>
                        </template>
                        <v-list-item-title>{{ ingredient.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ ingredient.quantity }}</v-list-item-subtitle> -->
                    <!-- </v-list-item> -->
                </v-list>
            </div>
        </v-expand-transition>

        <v-divider />

    </v-card>
</template>
<script setup lang="ts">

interface Props {
    recipe: Recipe
}

const show = ref<boolean>(false)
const { recipe } = defineProps<Props>()
const getColor = (index: number, numOfSteps: number): string => {
    const colors = ['green-lighten-4',
        'light-green-lighten-4',
        'lime-lighten-4',
        'green-lighten-3',
        'light-green-lighten-3',
        'lime-lighten-3',
        'green-lighten-2',
        'light-green-lighten-2',
        'green-lighten-1',
        'green-darken-3',
        'green-darken-3']
    const percent: number = Math.floor((index / numOfSteps) * 10);

    return colors[percent]
}


const getIcon = (des: string) => {
    switch (des) {
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