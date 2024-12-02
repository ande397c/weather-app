import { HourlyForecastElement } from '../../../components/HourlyForecastElement';
import { WeatherLocation } from '../../../types/weatherLocation';

interface HourlyForecastListProps {
  weatherData: WeatherLocation | undefined;
}

export const HourlyForecastList = ({
  weatherData
}: HourlyForecastListProps) => {
  return (
    weatherData &&
    weatherData.hourly.map((hour, i) => (
      <HourlyForecastElement
        key={i}
        epoch={hour.dt}
        timezone={weatherData.timezone}
        weatherIcon={hour.weather[0].icon}
        weatherDesc={hour.weather[0].main}
        temp={hour.temp}
      />
    ))
  );
};
