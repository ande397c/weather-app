import { FutureForecast } from "../types/futureForecast";
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
  weather: [
   {
    id: number;
    main: string;
    description: string;
    icon: string;
   }
  ];
 };
 daily: FutureForecast[];
 hourly: HourlyForecast[];
 lat: number;
 lon: number;
 timezone: string;
 timezoneOffset: number;
}
