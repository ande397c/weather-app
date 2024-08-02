import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface MainLayoutProps {
 children: React.ReactNode;
 showFooter?: boolean;
}

export const MainLayout = ({ children, showFooter = false }: MainLayoutProps) => {
 return (
  <>
   <section className="m-4 text-white h-screen">{children}</section>
   {showFooter && (
    <footer className="fixed bottom-0 w-full h-12 flex items-center justify-end pr-4 bg-zinc-700">
     <Link to="/" className="">
     <div className="flex justify-end text-white">
      <FontAwesomeIcon icon={faBars} size="xl"/>
     </div>
     </Link>
    </footer>
   )}
  </>
 );
};
