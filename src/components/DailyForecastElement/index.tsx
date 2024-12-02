import { convertEpochToDate } from '../../utils/convertEpochToDate';

interface DailyForecastElementProps {
  len: number;
  i: number;
  epoch: number;
  weatherIcon: string;
  weatherDesc: string;
  tempLow: number;
  tempHigh: number;
}

export const DailyForecastElement = ({
  len,
  i,
  epoch,
  weatherIcon,
  weatherDesc,
  tempLow,
  tempHigh
}: DailyForecastElementProps) => {
  return (
    <div
      className={`flex items-center justify-between ${
        len - 1 !== i && 'border-b border-white/40 py-1'
      } `}
    >
      <p className="w-7">{convertEpochToDate(epoch)}</p>
      <div className="size-10">
        <img
          src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          alt={weatherDesc}
        />
      </div>
      <p className="text-gray-400">L:{Math.round(tempLow)}°</p>
      <p className="text-white">H:{Math.round(tempHigh)}°</p>
    </div>
  );
};
