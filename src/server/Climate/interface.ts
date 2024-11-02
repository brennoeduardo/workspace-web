export interface Position {
    coords: {
        latitude: number;
        longitude: number;
    };
    timestamp: number;
}

export interface Weather {
    description: string;
    icon: string;
    main: string;
}

export interface WeatherData {
    name: string;
    main: {
        temp: number;
        temp_max: number;
        temp_min: number;
    };
    weather: Array<Weather>
}