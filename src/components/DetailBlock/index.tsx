import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface DetailBlockProps {
 children: React.ReactNode;
 text: string | undefined;
 icon?: IconDefinition;
 includeBorder?: boolean;
}

export const DetailBlock = ({ children, text, icon, includeBorder }: DetailBlockProps) => {
 return (
  <div className="bg-slate-500 rounded-lg mt-4 p-2">
   <p className={includeBorder ? "border-b border-teal-600 pb-1" : `pb-1`}>
    {icon && <FontAwesomeIcon icon={icon} size="xs" />} {text}
   </p>
   {children}
  </div>
 );
};
