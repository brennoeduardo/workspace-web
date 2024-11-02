<template>
    <v-card class="pa-5" max-width="500px" elevation="10" location="center">
        <v-row no-gutters class="pa-3" justify="center">
            <v-col cols="12">


                <v-card-title class="text-center">
                    {{ show.register ? 'Cadastro' : 'Entrar' }}
                </v-card-title>

                <v-form v-model="isValid">
                    <v-text-field v-if="show.register" v-model="user.name" label="Nome" prepend-inner-icon="mdi-account"
                        color="teal" :rules="[requiredRule]" />

                    <v-text-field v-model="user.email" label="E-mail" prepend-inner-icon="mdi-email" type="email"
                        color="teal" :rules="[requiredRule, emailRule]" />

                    <v-text-field v-model="user.password" label="Senha" prepend-inner-icon="mdi-lock" type="password"
                        color="teal" :rules="[requiredRule, passwordRule]" />

                    <v-text-field v-if="show.register" v-model="confirmPassword" label="Confirme sua senha"
                        prepend-inner-icon="mdi-lock" type="password" color="teal" :rules="[confirmPasswordRule]" />

                    <!-- <v-card-text class="text-end mt-1" v-if="!show.register">
                        Esqueceu sua senha?
                    </v-card-text> -->
                </v-form>

                <v-btn width="100%" color="teal" class="text-uppercase mt-4" :disabled="!isValid || isLoading"
                    @click="handleSubmit">
                    {{ show.register ? 'Cadastrar' : 'Entrar' }}
                </v-btn>

                <v-card-text class="text-center mt-4 text-click" @click="toggleRegister">
                    {{ show.register ? 'Já tenho uma conta' : 'Cadastrar-se' }}
                </v-card-text>
            </v-col>
        </v-row>

        <v-row no-gutters class="pa-3" justify="center" v-if="show.confirmation">
            <v-col cols="12">
                <v-card-text>
                    Código de verificação enviado para <strong>{{ user.email }}</strong>
                </v-card-text>

                <v-text-field v-model="user.confirmation_code" label="Código de verificação"
                    prepend-inner-icon="mdi-lock" color="teal" :rules="[requiredRule]" />

                <v-btn width="100%" color="teal" class="text-uppercase" :disabled="isLoading" @click="confirm">
                    Confirmar
                </v-btn>

                <v-btn width="100%" color="teal" class="text-uppercase" :disabled="isLoading"
                    @click="resendConfirmationCode">
                    Reenviar código
                </v-btn>

                <v-btn width="100%" color="teal" class="text-uppercase" :disabled="isLoading"
                    @click="cancelConfirmation">
                    Voltar
                </v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useNuxtApp } from '#app';
import { UserAPI } from '~/server/user/user';
import { AuthAPI } from '~/server/user/auth';

const { $toast } = useNuxtApp();

const router = useRouter();

const show = reactive({
    register: false,
    confirmation: false,
});

const user = reactive({
    name: '',
    email: '',
    password: '',
    confirmation_code: '',
});

const confirmPassword = ref('');
const isLoading = ref(false);
const isValid = ref(false);

const requiredRule = (v: string) => !!v || 'Este campo é obrigatório';
const emailRule = (v: string) => /.+@.+\..+/.test(v) || 'E-mail inválido';
const passwordRule = (v: string) => v.length >= 6 || 'A senha deve ter pelo menos 6 caracteres';
const confirmPasswordRule = (v: string) => v === confirmPassword.value || 'As senhas não conferem';

async function handleSubmit() {

    if (isLoading.value) return;
    isLoading.value = true;

    try {

        if (show.register) return await register();

        await login();

    } finally {
        isLoading.value = false;
    }
}

async function register() {
    try {

        const { success } = await UserAPI.create(user);

        if (!success) {
            $toast.error('Erro ao cadastrar usuário');
            return;
        }

        $toast.success('Usuário cadastrado com sucesso');
        show.confirmation = true;

    } catch (error) {
        $toast.error('Erro ao cadastrar usuário');
    }
}

async function login() {
    try {
        const response = await AuthAPI.login(user);

        if (!response.success) return $toast.error(response.message || 'Erro ao fazer login');

        const decodedToken = decode(response.token);

        if (!decodedToken.confirmed) {
            show.confirmation = true;
            return $toast.error('Usuário não confirmado');
        }

        $toast.success('Login realizado com sucesso');
        localStorage.setItem('user', JSON.stringify(decodedToken.user));  
        router.push('/home');

    } catch (error) {
        $toast.error('Erro ao logar usuário');
        console.error(error);
    }
}

async function confirm() {
    try {

        const { success } = await AuthAPI.confirmCode(user.email, user.confirmation_code);

        if (!success) {
            $toast.error('Erro ao confirmar usuário');
            return;
        } 
        
        $toast.success('Usuário confirmado com sucesso');
        show.confirmation = false;
            
        toggleRegister();

    } catch (error) {
        $toast.error('Erro ao confirmar usuário');
    }
}

async function resendConfirmationCode() {
    $toast.info(`Código reenviado para ${user.email}`);
}

function cancelConfirmation() {
    show.confirmation = false;
}

function toggleRegister() {
    show.register = !show.register;
    resetForm();
}

function resetForm() {
    user.name = '';
    user.email = '';
    user.password = '';
    user.confirmation_code = '';
    confirmPassword.value = '';
}

const { checkAuthentication } = useUserAuth();

onBeforeMount(async () => {
    const user = await checkAuthentication();

    if (user) router.push('/home');
});

</script>

<style scoped>
.text-center {
    text-align: center;
}

a {
    font-size: 14px;
    font-weight: 500;
    color: white;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.text-click {
    cursor: pointer;
}

</style>