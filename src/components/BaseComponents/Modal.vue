<template>

    <v-dialog v-model="showValue" :width="width" :height="height" opacity="0">
        <v-card>
            <v-card-title>
                <span class="title">{{ title }}</span>
                <v-spacer></v-spacer>
                <v-row justify="end">
                    <v-btn class="pa-5" icon="mdi-close" @click="showValue = false" variant="plain" color="red"/>
                </v-row>
            </v-card-title>
            <v-card-text>
                <slot />
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-row>
                    <v-btn 
                        variant="plain" 
                        :text="action.text"
                        :key="action.icon" 
                        @click="action.click" 
                        :color="action.color"
                        v-for="action in actions" 
                    />
                </v-row>
            </v-card-actions>

        </v-card>        
    </v-dialog>


</template>

<script lang="ts" setup>

interface Actions {
    text: string
    icon: string
    click: () => void
    color: string
}

interface ModalProps {
    modelValue: boolean
    width?: string
    height?: string
    title?: string
    actions?: Actions[]
}

const props = withDefaults(defineProps<ModalProps>(), {
    width: '500px',
    height: '500px',
})

const showValue = defineModel<boolean>()

</script>