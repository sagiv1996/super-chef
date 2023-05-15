<template>
    <v-card :title="recipe.name" :subtitle="recipe.ownerId" :text="recipe.description">
        <v-img :src="recipe.imageURL" height="250" cover />
        <v-chip-group class="ma-5">
            <v-chip label v-for="tag in recipe.tags" :text="tag" />
        </v-chip-group>
        <v-card-actions>
            <v-btn>Add for shopping list</v-btn>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="show" group multiple>
                <v-btn value="steps">
                    steps
                </v-btn>
                <v-btn value="ingredients">
                    ingredients
                </v-btn>
            </v-btn-toggle>
        </v-card-actions>
        <v-expand-transition>
            <div v-show="show.length">
                <v-divider />
                <v-chip-group v-show="show.includes('ingredients')">
                    <v-chip v-for="ingredient in recipe.ingredients" :text="ingredient.ingredient.name"
                        :to="`?category=${ingredient.ingredient.category}`">
                        <template v-slot:prepend>
                            <ingredient-icon :category="ingredient.ingredient.category"
                                :text="ingredient.ingredient.name" />
                        </template>
                    </v-chip>
                </v-chip-group>
                <v-timeline v-show="show.includes('steps')">
                    <v-timeline-item size="small" v-for="(step, index) in recipe.steps"
                        :dot-color="getColor(index, recipe.steps.length - 1)">
                        {{ step }}
                    </v-timeline-item>
                </v-timeline>
            </div>

        </v-expand-transition>

    </v-card>
</template>
<script setup lang="ts">

interface Props {
    recipe: RecipeInterface
}

const show = ref<string[]>([])
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


</script>