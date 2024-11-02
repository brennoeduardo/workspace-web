<template>

    <base-components-modal v-model="showModal" height="auto" width="500px" @close="showModal = false" :actions="actions">

        <v-row dense>
            
            <v-col cols="12">
                <v-text-field v-model="userValue.name" label="Nome" variant="outlined"/>
            </v-col>

            <v-col cols="12">
                <v-text-field v-model="userValue.email" label="Email" variant="outlined" />
            </v-col>

            <v-col cols="12">
                <v-checkbox v-model="changePassword" label="Alterar Senha" variant="outlined" />
            </v-col>

            <v-col v-if="changePassword" cols="12">
                <v-text-field
                v-model="userValue.password"
                :type="typePassword"
                label="Senha"
                variant="outlined"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="togglePassword"
                />
            </v-col>

            <v-col v-if="changePassword" cols="12">
                <v-text-field
                v-model="userValue.confirmPassword"
                :type="typeConfirmPassword"
                label="Confirmar Senha"
                variant="outlined"
                :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="toggleConfirmPassword"
                />
            </v-col>

        </v-row>

    </base-components-modal>

</template>
<script lang="ts" setup>
import { UserAPI } from '~/server/User/user';

interface User {
    name: string;
    email: string;
    password?: string;
    confirmPassword?: string;
}

interface InfoUserProps {
    modelValue: boolean;
    user: User;
}

const emit = defineEmits(['update:user']);

const props = defineProps<InfoUserProps>();

const showModal = defineModel<boolean>({ default: false });

const { $toast } = useNuxtApp()

const userValue = computed({
    get: () => props.user,
    set: (value) => emit('update:user', value)
});

const actions = computed(() => [
    {
        icon: 'mdi-content-save',
        click: save,
        color: 'green'
    }
]);

const changePassword = ref(false);

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const typePassword = computed(() => (showPassword.value ? 'text' : 'password'));
const typeConfirmPassword = computed(() => (showConfirmPassword.value ? 'text' : 'password'));

const togglePassword = () => showPassword.value = !showPassword.value;
const toggleConfirmPassword = () => showConfirmPassword.value = !showConfirmPassword.value;

const passwordsMatch = computed(() => userValue.value.password === userValue.value.confirmPassword);

const save = async () => {
    try {

        if(passwordsMatch.value) return $toast.error('As senhas não coincidem');

        const response = await UserAPI.update(11, userValue.value);

        if(!response.success) return $toast.error('Erro ao salvar informações');

        $toast.success('Informações salvas com sucesso');
        showModal.value = false;
        
    } catch (error) {
        console.error(error);
        $toast.error('Erro ao salvar informações');
    }
};


</script>
<style scoped></style>