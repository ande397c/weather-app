export interface HourlyForecast {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pop: number;
  pressure: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: [{ description: string; icon: string; id: number; main: string }];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}
