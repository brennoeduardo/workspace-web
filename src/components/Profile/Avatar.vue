<template>
    <base-components-modal
        v-model="showValue"
        max-width="500"
        height="auto"
        :actions="actions"
        @close="showValue = false"
    >

        <v-card-title class="text-h6 font-weight-medium text-center">
            Alterar Avatar
        </v-card-title>
        <v-card-subtitle class="text-body-2 text-center mb-3">
            Selecione uma imagem para atualizar seu avatar.
        </v-card-subtitle>

        <v-col cols="12">
            <v-file-input 
                v-model="image" 
                label="Selecione uma imagem"
                prepend-icon=""
                prepend-inner-icon="mdi-image"
                variant="outlined" 
                accept="image/*"
                show-size
                class="mb-4"
            />
        </v-col>

    </base-components-modal>
</template>

<script lang="ts" setup>
import { UserAPI } from '~/server/User/user';

interface UserAvatarProps {
    modelValue: boolean;
}

const emit = defineEmits(['update:image']);

const props = defineProps<UserAvatarProps>();

const showValue = defineModel<boolean>({ default: false });

const { $toast } = useNuxtApp();

const image = ref<File | null>(null);

const actions = computed(() => [
    {
        text: 'Cancelar',
        icon: 'mdi-close',
        click: () => (showValue.value = false),
        color: 'red',
        tooltip: 'Cancelar'
    },
    {
        text: 'Salvar',
        icon: 'mdi-check',
        click: () => save(),
        color: 'green',
        tooltip: 'Salvar'
    },
]);

const save = async () => {
    try {
        if (!image.value) return $toast.error('Selecione uma imagem');

        const formData = new FormData();
        formData.append('image', image.value as Blob);

        const response = await UserAPI.updateAvatar(11, formData);

        if (!response.success) return $toast.error('Erro ao salvar avatar');

        $toast.success('Avatar alterado com sucesso');
        emit('update:image', response.url);

        showValue.value = false;
    } catch (error) {
        console.error(error);
        $toast.error('Erro ao salvar avatar');
    }
};
</script>

<style scoped>
.v-file-input {
    --v-theme-primary: #1976d2;
}
.v-btn {
    min-width: 90px;
}
</style>
