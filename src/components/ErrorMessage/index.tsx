import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ErrorMessage = () => {
    return (
      <div className="mt-10">
        <h2 className="text-2xl text-white text-center">An error occured</h2>
        <div className="flex justify-center mt-4 mb-2">
          <FontAwesomeIcon icon={faCircleExclamation} size="3x" />
        </div>
        <p className="text-center text-lightGrey">
          Could not load data. Please try again
        </p>
      </div>
    );
}