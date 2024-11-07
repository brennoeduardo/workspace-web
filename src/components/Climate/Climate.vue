<template>
    <v-card max-width="195" :elevation="0" color="transparent" class="card-container">

        <v-card-title class="text-h6 font-weight-medium text-center pa-0">
            {{ weatherData.name }}
        </v-card-title>

        <v-card-subtitle class="text-body-2 text-center pa-0 mb-2">
            {{ formatString(weatherData.weather[0].description) }}
        </v-card-subtitle>

        <v-card-text class="text-center d-flex justify-center pa-0">
            <v-img
                :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
                width="60"
                height="60"
                alt="Weather Icon"
            />
        </v-card-text>

        <v-card-text class="text-center pa-0">
            <div class="current-temp text-h5 font-weight-medium mb-1">
                {{ Math.round(weatherData.main.temp) }}°C
            </div>
        </v-card-text>

        <v-card-actions class="justify-end ">

            <div class="temp-range text-caption">
                Mín: {{ Math.round(weatherData.main.temp_min) }}°C | Máx: {{ Math.round(weatherData.main.temp_max) }}°C
            </div>

            <v-menu
                v-model="menu"
                activator="parent"
                width="30%"
                location="left"
                :close-on-content-click="false"
            >

                <template v-slot:activator="{ isActive }">
                    <v-btn v-on="isActive" icon="mdi-magnify" variant="text" size="small" />
                </template>

                    <v-text-field
                        v-model="city"
                        variant="outlined"
                        placeholder="Buscar cidade"
                        append-inner-icon="mdi-refresh"
                        @keyup.enter="findTemperature(city);"
                        @click:append-inner="findTemperature(city);"
                    >

                    </v-text-field>

            </v-menu>

            <v-tooltip text="Buscar outra região" activator="parent" location="top" />

        </v-card-actions>
    </v-card>
</template>

<script lang="ts" setup>
import { getTemperature } from '~/server/Climate';
import type { WeatherData } from '~/server/Climate/interface';

const { $toast } = useNuxtApp();

const weatherData = ref<WeatherData>({
    name: '',
    weather: [{ description: '', icon: '', main: '' }],
    main: { temp: 0, temp_max: 0, temp_min: 0 }
});

const city = ref<string>('');
const menu = ref<boolean>(false);

const formatString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const findTemperature = async (region: string) => {

    if(!region || region === '') return $toast.warn("Digite o nome de uma cidade");

    weatherData.value = await getTemperature(region);

    menu.value = false;
    city.value = '';

}

onMounted(async () => {
    weatherData.value = await getTemperature();
});
</script>

<style scoped>
.current-temp {
    color: #1976D2;
}
.temp-range {
    color: #757575;
}

.card-container {
    position: absolute;
    right: 0;
    bottom: 0;

    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 1;
}


</style>
