<template>

    <base-components-modal v-model="showModal" height="auto" width="500px" @close="showModal = false" :actions="actions">

        <v-row dense>
            
            <v-col cols="12">
                <v-text-field v-model="userValue.name" label="Nome" variant="outlined"/>
            </v-col>

            <v-col cols="12">
                <v-text-field v-model="userValue.email" label="Email" variant="outlined" />
            </v-col>

            <v-col cols="12" class="ma-n3 d-flex justify-end" >
                <v-checkbox v-model="changePassword" label="Alterar Senha" variant="outlined" />
            </v-col>

        </v-row>

        <v-row v-if="changePassword" dense>

            <v-col cols="12">
                <v-text-field
                v-model="userValue.password"
                :type="typePassword"
                label="Senha"
                variant="outlined"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="togglePassword"
                />
            </v-col>

            <v-col cols="12">
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

interface InfoUserProps {
    modelValue: boolean;
    user_id: number;
}

// EMITS

const emit = defineEmits(['update:user']);
const props = defineProps<InfoUserProps>();
const showModal = defineModel<boolean>({ default: false });

// TOAST

const { $toast } = useNuxtApp()

// COMPUTED 

const actions = computed<Actions[]>(() => [
    {
        icon: 'mdi-close',
        text: 'Fechar',
        click: () => showModal.value = false,
        color: 'red'
    },
    {
        icon: 'mdi-content-save',
        text: 'Salvar',
        click: save,
        color: 'green'
    }
]);

// REFS

const showPassword = ref(false);
const changePassword = ref(false);
const showConfirmPassword = ref(false);

const userValue = ref<IUser>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
});

const typePassword = computed(() => (showPassword.value ? 'text' : 'password'));
const typeConfirmPassword = computed(() => (showConfirmPassword.value ? 'text' : 'password'));

const togglePassword = () => showPassword.value = !showPassword.value;
const toggleConfirmPassword = () => showConfirmPassword.value = !showConfirmPassword.value;

const hasPasswords = computed(() => userValue.value.password !== '' && userValue.value.confirmPassword !== '');
const passwordsMatch = computed(() => userValue.value.password === userValue.value.confirmPassword);

const save = async () => {
    try {

        if(passwordsMatch.value && hasPasswords.value) return $toast.error('As senhas não coincidem');

        const response = await UserAPI.update(11, userValue.value);

        if(!response.success) return $toast.error('Erro ao salvar informações');

        $toast.success('Informações salvas com sucesso');
        showModal.value = false;
        
    } catch (error) {
        console.error(error);
        $toast.error('Erro ao salvar informações');
    }
};

const getUser = async () => {
    try {
        const { success, data } = await UserAPI.findOne(props.user_id);

        if(!success) throw new Error('Erro ao buscar usuário');

        userValue.value.name = data[0].name;
        userValue.value.email = data[0].email;

    } catch (error) {
        console.error(error);
        $toast.error('Erro ao buscar usuário');
    }
};

watch(() => props.modelValue, async (value) => {
    if(value) await getUser();
},{ immediate: true });

</script>
<style scoped></style>