import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface InputProps {
 startIcon: IconDefinition;
 placeholder: string;
}

export const Input = ({ startIcon, placeholder }: InputProps) => {
 return (
  <div className="relative">
   <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">{startIcon && <FontAwesomeIcon icon={startIcon} />}</div>
   <input type="text" className="block w-full ps-9 p-1 rounded-md bg-gray-700 border-gray-600 placeholder-gray-400 text-white" placeholder={placeholder} />
  </div>
 );
};
