import { faBars, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface MainLayoutProps {
 children: React.ReactNode;
 showFooter?: boolean;
 showError?: boolean;
}

export const MainLayout = ({ children, showFooter = false, showError = false }: MainLayoutProps) => {
 const ErrorContent = (
  <div>
   <h2 className="text-2xl text-white text-center">Error occured</h2>
   <div className="flex justify-center mt-4 mb-2">
    <FontAwesomeIcon icon={faCircleExclamation} size="3x" />
   </div>
   <p className="text-center text-gray-500">Please go back</p>
  </div>
 );
 
 return (
  <>
   <section className="m-4 text-white h-screen">{showError ? ErrorContent : children}</section>
   {showFooter && (
    <footer className="fixed bottom-0 w-full h-12 flex items-center justify-end pr-4 bg-zinc-700">
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
