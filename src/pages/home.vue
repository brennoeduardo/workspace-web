<template>
    
    <div class="d-flex justify-center flex-column align-center container-welcome">
        <div class="welcome-message ">
            {{ welcome }}
        </div>
        
        <tasks-new />
        
    </div>

    
    <climate />


</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { greeting } from '~/utils/greetings';

definePageMeta({
    layout: 'default'
});

const welcome = computed(() => `${greeting()}!`);
</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    padding: 0.5em 1em;
    font-size: 1.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
    font-family: 'Courier New', Courier, monospace;
    background-color: #333;
}

.climate-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.welcome-message {
    text-align: center;
    color: #f0f0f0;
    font-size: 1.5rem;
    font-family: 'Courier New', Courier, monospace;
    margin-top: 20px;
}


</style>
