export interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  location: string;
}

export interface WeatherForecast {
  date: string;
  temperature: number;
  condition: string;
}
