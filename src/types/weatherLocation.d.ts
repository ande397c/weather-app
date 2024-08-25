import { DailyForecast } from "./dailyForecast";
import { HourlyForecast } from "../types/HourlyForecast";

export interface WeatherLocation {
 current: {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  humidity: number;
  visibility: number;
  feels_like: number;
  pressure: number;
  weather: [
   {
    id: number;
    main: string;
    description: string;
    icon: string;
   }
  ];
 };
 daily: DailyForecast[];
 hourly: HourlyForecast[];
 lat: number;
 lon: number;
 timezone: string;
 timezoneOffset: number;
}
