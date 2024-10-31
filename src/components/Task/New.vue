<template>
    <v-col cols="6">
        <v-card height="58">
            <v-text-field 
                variant="solo" 
                class="random-sentence"
                v-model="task.description" 
                :placeholder="randomSentence()" 
                @keydown.enter="selectButton(0)"
            >
                <template #append-inner>
                    <v-btn 
                        v-for="(action, index) in actionsAppendInner" 
                        :key="action.icon" 
                        icon 
                        variant="plain" 
                        v-if="typing"
                        @click="selectButton(index)" 
                        :class="{ 'selected': selectedActionIndex === index }" 
                    >
                        <v-icon>{{ action.icon }}</v-icon>
                        <v-tooltip location="bottom" activator="parent">{{ action.tooltip }}</v-tooltip>
                    </v-btn>
                </template>
            </v-text-field> 
        </v-card>
    </v-col>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';

const actionsAppendInner = computed(() => [
    {
        icon: 'mdi-bookmark-outline',
        tooltip: 'Anotação',
    },
    {
        icon: 'mdi-calendar-check',
        tooltip: 'Tarefa',
    }
]);

const typing = ref(false);
const task_template = () => {
    return {
        description: null,
        type_id: null,
    }
};

const task = ref(task_template());
const selectedActionIndex = ref<number | null>(null); 

const taskSentence = [
    'Qual é a sua tarefa para hoje?',
    'Você tem um prazo específico para isso?',
    'Como você se sente sobre essa tarefa?',
    'Qual é o próximo passo?',
    'O que está te impedindo de avançar?',
    'Você precisa de ajuda com algo?',
    'Qual é o objetivo principal?',
    'Como você pretende começar?',
    'Você já definiu um prazo?',
    'Qual é a primeira coisa que você deve fazer?',
    'Quais recursos você precisa?',
    'Você tem alguma dúvida sobre a tarefa?',
    'Quem pode te ajudar nessa tarefa?',
    'Qual é a melhor maneira de abordar isso?',
    'Quais são os resultados esperados?',
    'O que pode ser feito para melhorar essa tarefa?'
];

const randomSentence = () => taskSentence[Math.floor(Math.random() * taskSentence.length)];

watch(() => task.value.description, (value: string | null) => { 
    typing.value = value !== null && value.length > 0;
}, { immediate: true });

const selectButton = (index: number) => selectedActionIndex.value = index; 
</script>

<style scoped>
.random-sentence {
    font-size: 1.2rem; 
    color: #4a4a4a; 
    margin-bottom: 1rem;
    border-left: 4px solid #ff6e6e;
    border-radius: 5px; 
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
    transition: transform 0.2s; 
}

.random-sentence:hover {
    transform: scale(1.02); 
}

.selected {
    background-color: #ff6e6e75; 
    color: white; 
}
</style>
