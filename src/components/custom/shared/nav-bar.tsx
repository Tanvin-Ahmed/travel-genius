import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import CustomAvatar from "../../custom/shared/custom-avatar";
import { ModeToggle } from "../../ui/mode-toggle";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth-context";
import logo from "../../../assets/logo.png";
import { GalleryVerticalEnd, LogIn, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-sm bg-orange-900/20">
      <nav className="container mx-auto p-2 flex justify-between items-center">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <CustomAvatar src={logo} alt="SH" />
          <h1 className="font-bold sm:text-2xl sm:block hidden">
            <span className="text-primary">Travel</span> Genius
          </h1>
          <h1 className="font-bold text-2xl sm:hidden block">
            <span className="text-primary">T</span>G
          </h1>
        </div>
        <div className="flex justify-center items-center gap-3">
          {/* for large screen */}
          <div className="flex justify-center items-center gap-2">
            {user?.token || user?.email ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size={"icon"}
                    className="rounded-full p-0 flex justify-center items-center"
                  >
                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        className="block rounded-full h-8 w-8 object-cover"
                        alt=""
                      />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Button
                        className="w-full flex justify-start gap-2"
                        variant={"ghost"}
                        onClick={() => navigate("/trips")}
                      >
                        <GalleryVerticalEnd className="h-5 w-5" />
                        Trip history
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button
                        className="w-full flex justify-start gap-2"
                        variant={"destructive"}
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                      >
                        <LogOut className="h-5 w-5" /> Logout
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  className="sm:block hidden"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  className="flex sm:hidden justify-center items-center"
                  size={"icon"}
                  onClick={() => navigate("/login")}
                >
                  <LogIn />
                </Button>
              </>
            )}
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
