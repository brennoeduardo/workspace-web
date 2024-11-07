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

        <!-- TODO - Criar função para redimensionar imagem -->

        <v-row v-if="imageUrl">
            <v-col cols="12" class="d-flex justify-center align-center">
                <v-avatar :image="imageUrl" size="250" />
            </v-col>
        </v-row>

    </base-components-modal>
</template>

<script lang="ts" setup>

import { UserAPI } from '~/server/User/user';

interface UserAvatarProps {
    modelValue: boolean;
}

// DEFINE

const emit = defineEmits(['update:image']);
const props = defineProps<UserAvatarProps>();
const showValue = defineModel<boolean>({ default: false });

// TOAST

const { $toast } = useNuxtApp();

// REFS

const image = ref<File | null>(null);
const imageUrl = ref<string>('');

// COMPUTED

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

// METHODS

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

const reset = () => {
    image.value = null;
    imageUrl.value = '';
};

// WATCHERS

watch(image, (newImage) => {

    const allowedFiles = ['image/jpeg', 'image/png', 'image/jpg'];

    if(newImage && !allowedFiles.includes(newImage.type)) {
        imageUrl.value = '';
        image.value = null;
        return $toast.error('Formato de imagem inválido');
    }

    if (!newImage) return imageUrl.value = ''

    const reader = new FileReader();

    reader.onerror = (e) => $toast.error(`Erro ao carregar imagem: ${e}`);
    reader.onload = (e) => imageUrl.value = e.target?.result as string;

    reader.readAsDataURL(newImage);
    
}, { immediate: true });

watch(() => props.modelValue, (value) => {
    if(!value) reset()
}, { immediate: true });

</script>

<style scoped>
.v-file-input {
    --v-theme-primary: #1976d2;
}
.v-btn {
    min-width: 90px;
}
</style>
