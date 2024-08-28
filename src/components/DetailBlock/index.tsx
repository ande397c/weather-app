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
  <div className="bg-blue rounded-lg mt-4 p-2">
   <p className={includeBorder ? "border-b border-white/40 pb-1 sticky top-0 bg-blue" : `pb-1`}>
    {icon && <FontAwesomeIcon icon={icon} size="xs" />} {text}
   </p>
   {children}
  </div>
 );
};
