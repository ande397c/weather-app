import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EmptyMessage = () => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl text-white text-center">No cities added</h2>
      <div className="flex justify-center mt-4 mb-2">
        <FontAwesomeIcon icon={faLocationDot} size="3x" />
      </div>
      <p className="text-center text-lightGrey">
        Search for a city to add it to your list{' '}
      </p>
    </div>
  );
};
