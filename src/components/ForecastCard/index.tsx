import { convertEpochToTime } from '../../utils/convertEpochToTime';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { Link } from 'react-router-dom';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AddedCity } from '../../types/addedCity';

interface ForecastCardProps {
  forecast: AddedCity;
  editModeEnabled: boolean;
  onClick: () => void;
}

export const ForecastCard = ({
  forecast,
  editModeEnabled,
  onClick
}: ForecastCardProps) => {
  const CardContent = (
    <>
      {editModeEnabled && (
        <div
          onClick={onClick}
          className="rounded-full bg-red size-5 flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faMinus} size="xs" />
        </div>
      )}
      <div className="w-full px-3 p-2 bg-blue rounded-xl my-3">
        <div
          className={`flex justify-between ${
            editModeEnabled ? 'h-12' : 'h-16'
          }`}
        >
          <div>
            <h2 className="font-semibold text-lg">
              {capitalizeFirstLetter(forecast.location)}
            </h2>
            <p className="font-normal text-base">
              {convertEpochToTime(forecast.Dt, true, false, forecast.timeZone)}
            </p>
          </div>
          <h2 className="text-4xl font-">
            {Math.round(forecast.temperature)}°
          </h2>
        </div>
        {!editModeEnabled && (
          <div className="flex justify-between">
            <p className="text-sm">{capitalizeFirstLetter(forecast.desc)}</p>
            <p className="text-sm">
              H: <span className="mr-2">{Math.round(forecast.HighTemp)}°</span>
              L: <span>{Math.round(forecast.LowTemp)}°</span>
            </p>
          </div>
        )}
      </div>
    </>
  );

  return editModeEnabled ? (
    <div className="flex items-center gap-3">{CardContent}</div>
  ) : (
    <Link className="flex items-center gap-3" to={`/weather/${location}`}>
      {CardContent}
    </Link>
  );
};
