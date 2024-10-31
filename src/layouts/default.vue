<template>
    <div class="app">
        
        <Leftbar v-model="leftbar" :drawer="leftbar" @mouseover="leftbar = true" @mouseleave="leftbar = false"/>
        
        <slot/>

        <v-btn @click="toggleTheme" :icon="icon" variant="plain" :color="color" class="button-toggle-theme"/>

    </div>
</template>

<script lang="ts" setup>

import { useTheme } from 'vuetify'

const theme = useTheme()

const leftbar = ref(false)

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const icon = computed(() => theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent')
const color = computed(() => theme.global.current.value.dark ? 'yellow' : 'blue')


</script>

<style scoped>
.button-toggle-theme{
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 999;
}

.app{
    position: relative;
    min-height: 100vh;
    transition: background-color 0.3s;
}

</style>