import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const NavbarTop = () => {
  return (
    <>
      <div className="p-6">
        <Button asChild>
        <Link to='/' className="bg-violet-800 text-white hover:bg-violet-800 hover:text-white !text-4xl !font-bold h-12 w-12 !rounded-full flex justify-center items-center">S</Link>
        
        </Button>
        
      </div>
    </>
  );
};
export default NavbarTop;
