export interface CurrentWeather {
  location: string;
  latitude: number;
  longitude: number;
  temperature: number;
  feels_like: number;
  humidity: number;
  rainfall: number;
  precipitation_probability: number;
  wind_speed: number;
  wind_direction: number;
  pressure: number;
  uv_index: number;
  condition: string;
  description: string;
  icon: string;
  is_day: boolean;
  timestamp: string;
}

export interface HourlyForecast {
  time: string;
  datetime: string;
  temperature: number;
  humidity: number;
  precipitation_probability: number;
  condition: string;
  icon: string;
  wind_speed: number;
}

export interface DailyForecast {
  date: string;
  day: string;
  temp_max: number;
  temp_min: number;
  condition: string;
  icon: string;
  precipitation_sum: number;
  precipitation_probability: number;
  wind_speed_max: number;
  uv_index_max: number;
}

export interface AgrometAdvisory {
  category: string;
  title: string;
  level: 'optimal' | 'warning' | 'critical' | 'info';
  advice: string;
}

export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  wind_speed: number;
  condition: string;
  description: string;
  icon: string;
  feels_like?: number;
  pressure?: number;
  uv_index?: number;
  latitude?: number;
  longitude?: number;
  timestamp?: string;
  current?: CurrentWeather;
  hourly?: HourlyForecast[];
  forecast?: DailyForecast[];
  advisories?: AgrometAdvisory[];
}

export interface WeatherForecast extends DailyForecast {}
