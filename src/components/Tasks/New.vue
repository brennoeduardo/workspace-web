<template>
    <v-col cols="6">
        <v-card height="auto">
            <v-text-field
                v-if="isAnnotation"
                variant="plain"
                class="random-sentence"
                v-model="task.another"
                :placeholder="randomSentence()"
            >

                <template #default>
                    <v-icon>    </v-icon>
                </template>

                <template #append-inner>
                    <v-btn
                        icon
                        variant="plain"
                        v-for="(action, index) in actionsAppendInner"
                        :key="index"
                        :color="action.color"
                        @click="action.click"
                    >
                        <v-icon>{{ action.icon }}</v-icon>
                        <v-tooltip location="bottom" activator="parent">{{ action.tooltip }}</v-tooltip>
                    </v-btn>
                </template>
            </v-text-field>

            <v-expand-transition>
                <v-col v-if="isTask">
                    <v-row class="pa-2">
                        <v-col cols="11">
                            <v-textarea
                                v-model="task.title"
                                placeholder="Título da Tarefa"
                                rows="1"
                                auto-grow
                                clearable
                            />
                        </v-col>
                        <v-col cols="1">
                            <v-btn icon="mdi-close" variant="plain" @click="task.type_id = 1" />
                            <v-tooltip activator="parent" text="Cancelar" />
                        </v-col>
                    </v-row>

                    <v-divider></v-divider>

                    <v-row class="pa-2 mt-3">
                        <v-col cols="12">
                            <v-textarea
                                v-model="task.description"
                                placeholder="Descrição da Tarefa"
                                rows="3"
                                auto-grow
                                clearable
                            />
                        </v-col>
                    </v-row>

                    <v-row class="pa-2 mt-3">

                        <v-col cols="9">
                            <v-text-field v-if="task.hasDeadline" type="date" v-model="task.deadline_date" />
                        </v-col>
                        <v-col cols="3">
                            <v-checkbox v-model="task.hasDeadline" label="Data Prazo" />
                        </v-col>


                    </v-row>

                    <v-row class="pa-2 mt-3">
                        <v-col cols="12">
                            <v-btn color="primary" @click="console.log(task)" block>Salvar</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-expand-transition>
        </v-card>
    </v-col>
</template>

<script lang="ts" setup>

interface ITask {
    title: string | null;
    type_id: number | null;
    another?: string | null;
    description: string | null;
    hasDeadline: boolean;
    deadline_date: string | null;
}

const typing = ref(false);

const task_template = (): ITask => ({
    type_id: 1,
    title: null,
    another: null,
    hasDeadline: false,
    description: null,
    deadline_date: null,
});

const task = ref(task_template());

const isTask = computed(() => task.value.type_id === 2);
const isAnnotation = computed(() => task.value.type_id === 1);

const actionsAppendInner = computed(() => [
    {
        color: 'yellow',
        tooltip: 'Anotação',
        icon: isAnnotation.value ? 'mdi-bookmark' : 'mdi-bookmark-outline',
        click: () => (task.value.type_id = 1),
    },
    {
        color: 'blue',
        tooltip: 'Tarefa',
        icon: isTask.value ? 'mdi-calendar-check' : 'mdi-calendar-blank',
        click: () => (task.value.type_id = 2),
    },
]);

const randomSentence = () => taskSentence[Math.floor(Math.random() * taskSentence.length)];

watch(() => task.value.another, (newValue) => {
    typing.value = typeof newValue === 'string' && newValue.length > 0;
}, { immediate: true });
</script>

<style scoped>
.random-sentence {
    font-size: 1.2rem;
    color: #4a4a4a;
    margin-bottom: 1rem;
    width: 100%;
    border-left: 4px solid #ff6e6e;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.selected {
    background-color: #ff6e6e75;
    color: white;
}
</style>
