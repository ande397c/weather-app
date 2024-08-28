import { faBars, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface MainLayoutProps {
 children: React.ReactNode;
 showFooter?: boolean;
 showError?: boolean;
}

export const MainLayout = ({ children, showFooter = false, showError = false }: MainLayoutProps) => {
 const ErrorMessage = (
  <div className="mt-10">
   <h2 className="text-2xl text-white text-center">Error occured</h2>
   <div className="flex justify-center mt-4 mb-2">
    <FontAwesomeIcon icon={faCircleExclamation} size="3x" />
   </div>
   <p className="text-center text-gray-500">Could not load data or the city is invalid</p>
  </div>
 );
 
 return (
  <>
   <section className={`${showError ? 'h-screen' : 'h-full'} m-4 text-white `}>{showError ? ErrorMessage : children}</section>
   {showFooter && (
    <footer className="sticky bottom-0 w-full bg-blue h-12 flex items-center justify-end pr-4 border-t border-white/40">
     <Link to="/" className="">
      <div className="flex justify-end text-white">
       <FontAwesomeIcon icon={faBars} size="xl" />
      </div>
     </Link>
    </footer>
   )}
  </>
 );
};
