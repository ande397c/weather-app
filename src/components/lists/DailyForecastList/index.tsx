import { DailyForecastElement } from '../../../components/DailyForecastElement';
import { WeatherLocation } from '../../../types/weatherLocation';

interface DailyForecastListProps {
  weatherData: WeatherLocation | undefined;
}

export const DailyForecastList = ({ weatherData }: DailyForecastListProps) => {
  return (
    weatherData &&
    weatherData.daily.map((day, i, { length }) => (
      <DailyForecastElement
        key={i}
        len={length}
        i={i}
        epoch={day.dt}
        weatherIcon={day.weather[0].icon}
        weatherDesc={day.weather[0].main}
        tempLow={day.temp.min}
        tempHigh={day.temp.max}
      />
    ))
  );
};
