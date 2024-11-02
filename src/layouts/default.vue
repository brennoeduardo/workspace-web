<template>
    <div class="app">
        
        <layout-leftbar v-model="leftbar" :drawer="leftbar" @mouseover="leftbar = true" @mouseleave="leftbar = false"/>
        
        <slot/>

    </div>
</template>

<script lang="ts" setup>

const leftbar = ref(false)

</script>

<style scoped>

.app{
    position: relative;
    min-height: 100vh;
    transition: background-color 0.3s;
}

</style>