<template>
    <header class="header">
        {{ welcome }}
    </header>

    <v-row justify="center" >
        <task-new />
    </v-row>

</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { greeting } from '~/utils/greetings';

const user = userAuth();

definePageMeta({
    layout: 'default'
})

const name = user?.name.split(' ')[0];

const welcome = computed(() => `${greeting()}, ${name}!`);
</script>

<style scoped>
.header {
    background: linear-gradient(135deg, #ff6e6e, #3b3fbb); 
    color: white; 
    padding: 0.5em; 
    text-align: center; 
    font-size: 1.5rem; 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); 
    margin-bottom: 20px; 
    font-family: 'Courier New', Courier, monospace;
    
}
</style>
