import { ROUTES } from "@/routes/paths";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default function AuthSection({ children }) {
  return (
    /** Fondo texturizado */
    <div className="min-h-[calc(100vh)] w-full bg-parch flex items-center justify-center p-4 py-8 relative">
      <Link
        to={ROUTES.HOME}
        className="absolute top-7 left-7 p-2 cursor-pointer hover:left-5 transition-all duration-300"
      >
        <IoIosArrowBack size={22} />
      </Link>
      <div className="absolute inset-0 bg-parch bg-[url('https://www.transparenttextures.com/patterns/black-mamba.png')] bg-center opacity-50 pointer-events-none" />

      {children}
    </div>
  );
}
