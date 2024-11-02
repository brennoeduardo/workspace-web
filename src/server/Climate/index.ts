import type { Position, WeatherData } from "./interface";

const { $config } = useNuxtApp()

const OPENWEATHERMAP_API_KEY = $config.public.OPENWEATHERMAP_API_KEY;
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getCurrentPosition = async (): Promise<Position> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const fetchWeatherData = async (url: string): Promise<WeatherData> => {

    const response = await fetch(url);

    if (!response.ok) throw new Error('Erro ao obter dados da API de clima');

    return response.json();
};

export const getTemperature = async (city?: string): Promise<WeatherData> => {
    try {

        let url: string;

        if (city) url = `${WEATHER_API_BASE_URL}?q=${city}&appid=${OPENWEATHERMAP_API_KEY}&units=metric&lang=pt_br`;

        else {
            const { coords } = await getCurrentPosition();

            console.log({
                latitude: coords.latitude,
                longitude: coords.longitude,
                token: OPENWEATHERMAP_API_KEY
            })

            url = `${WEATHER_API_BASE_URL}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${OPENWEATHERMAP_API_KEY}&units=metric&lang=pt_br`;
        }

        const weatherData = await fetchWeatherData(url);

        console.log(weatherData);

        return {
            name: weatherData.name,
            main: {
                temp: weatherData.main.temp,
                temp_max: weatherData.main.temp_max,
                temp_min: weatherData.main.temp_min
            },
            weather: weatherData.weather
        }
       

    } catch (error) {
        console.error(error);
        throw new Error('Erro ao obter a temperatura');
    }
};
