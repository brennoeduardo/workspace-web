<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer 
                v-model="drawer" 
                :rail="rail" 
                expand-on-hover 
                elevation="3"
                @mouseenter="handleMouseEnter" 
                @mouseleave="handleMouseLeave"
                color="primary"
                mobile
                class="leftbar"
            >
                <div class="avatar-container">

                    <v-avatar 
                        :image="user.image" 
                        :size="avatarSize" 
                        :class="avatarClass" 
                    />
                    
                    <v-btn 
                        icon="mdi-pencil" 
                        @click="editAvatar" 
                        size="35px" 
                        class="button-edit-avatar" 
                        v-if="!rail" 
                    />

                </div>

                <v-card class="px-5 pb-3 mt-2" @click="toggleDetails" v-if="!rail" dark>
                    <v-row class="user-info">
                        <v-col>
                            <p class="user-name">{{ user.name }}</p>
                            <p class="user-email">{{ user.email }}</p>
                            <v-icon v-if="!showDetails" size="14">mdi-chevron-down</v-icon>
                            <v-icon size="14" v-else>mdi-chevron-up</v-icon>
                        </v-col>
                    </v-row>
                    <v-expand-transition>
                        <v-row v-if="showDetails" class="user-info">
                            <v-col>
                                <v-divider></v-divider>
                                <v-btn @click.stop="showModal.infoUser = true" width="100%" variant="plain">
                                    <v-icon start>mdi-cog</v-icon>
                                    Configurações
                                </v-btn>
                                <v-divider></v-divider>
                                <v-btn @click.stop="console.log('informações')" width="100%" variant="plain">
                                    <v-icon start>mdi-information</v-icon>
                                    Informações
                                </v-btn>
                                <v-divider></v-divider>
                            </v-col>
                        </v-row>
                    </v-expand-transition>
                    
                </v-card>

                <profile-info v-model="showModal.infoUser" v-model:user="user" />
                <profile-avatar v-model="showModal.avatarUser" @update:image="updateAvatar" />

                <v-divider />

                <v-row class="buttons-footer">
                    <v-divider />
                    <v-btn v-for="action in actions" :key="action.icon" @click="action.click" :icon="action.icon"
                        variant="plain" :color="action.color" />
                </v-row>

            </v-navigation-drawer>
        </v-layout>
    </v-card>
</template>

<script lang="ts" setup>

import { useTheme } from 'vuetify';
import { AuthAPI } from '~/server/User/auth';
import { UserAPI } from '~/server/User/user';

const rail = ref(true);
const drawer = ref(true);
const theme = useTheme();
const showDetails = ref(false);

const router = useRouter();

const user = ref({
    name: 'Brenno Eduardo',
    email: 'brennobesc@gmail.com',
    image: '',
});

const showModal = ref({
    infoUser: false,
    avatarUser: false,
});

const avatarClass = computed(() => ({
    'avatar-light': theme.global.current.value.dark,
    'avatar-dark': !theme.global.current.value.dark,
}));

const avatarSize = computed(() => (rail.value ? 40 : 100));

const actions = computed(() => [
    {
        icon: theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent',
        click: toggleTheme,
        color: theme.global.current.value.dark ? 'yellow' : 'blue',
        tooltip: 'Trocar tema',
    },
    {
        icon: 'mdi-logout',
        click: logout,
        color: 'red',
        tooltip: 'Sair',
    },
]);


const logout = async () => {
    await AuthAPI.logout();
    await router.push('/');
};

const editAvatar = () => showModal.value.avatarUser = true;

const toggleDetails = () => showDetails.value = !showDetails.value;

const handleMouseEnter = () => rail.value = false;

const handleMouseLeave = () => {rail.value = true; showDetails.value = false};

const toggleTheme = () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';

const updateAvatar = async (url: string | null = null) => {

    if (!url) {
        const { data } = await UserAPI.getAvatar(11);
        user.value.image = data;
    }

    else user.value.image = url;
};


onBeforeMount(async () => {
    await updateAvatar();
});
</script>

<style scoped>

.leftbar {
    z-index: 2;
    transition: width 0.3s ease;
}

.avatar-light {
    border: 3px solid #fff;
}

.avatar-dark {
    border: 3px solid #333;
}

.button-edit-avatar {
    position: absolute;
    top: 5.5em;
    right: 4.5em;
}

.avatar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    padding: 10px;
}

.avatar {
    margin: 10px auto;
    transition: transform 0.3s ease;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.avatar-container:hover .avatar {
    transform: scale(1.05);
}

.user-info {
    margin-top: 10px;
    text-align: center;
}

.user-name {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin: 0;
}

.user-email {
    font-size: 14px;
    color: #666;
    margin: 0;
}

.buttons-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-bottom: 10px;
}
</style>