import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface InputProps {
 startIcon: IconDefinition;
 placeholder: string;
 value?: string;
 onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
 onClick?: () => void;
 onSubmit?: () => void;
}

export const Input = ({ startIcon, placeholder, onChange, onSubmit }: InputProps) => {
 return (
  <form onSubmit={onSubmit} className="flex justify-center items-center gap-3 group transition-all">
   <div className="relative w-full">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">{startIcon && <FontAwesomeIcon icon={startIcon} color="#9898A0" />}</div>
    <input onChange={onChange} type="text" className="block w-full ps-9 p-1 rounded-md bg-darkGrey border-gray-600 placeholder-lightGrey text-white" placeholder={placeholder} />
   </div>
   {/* <button onClick={onClick} className="group-focus-within:w-20 group-focus-within:block hidden">
    Cancel
   </button> */}
  </form>
 );
};
