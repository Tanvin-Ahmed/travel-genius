import { Menu } from "lucide-react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import CustomAvatar from "../../custom/shared/custom-avatar";
import { ModeToggle } from "../../ui/mode-toggle";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-sm bg-orange-900/20">
      <nav className="container mx-auto p-2 flex justify-between items-center">
        <div onClick={() => navigate("/")} className="flex items-center gap-2">
          <CustomAvatar src="./logo.png" alt="SH" />
          <h1 className="font-bold sm:text-2xl text-xl">
            <span className="text-primary">Travel</span> Genius
          </h1>
        </div>
        <div className="flex justify-center items-center gap-3">
          {/* for large screen */}
          <div className="sm:flex hidden justify-center items-center gap-2">
            <Button>Sign up</Button>
            <Button variant={"outline"}>Login</Button>
            <ModeToggle />
          </div>
          {/* for small device */}
          <div className="sm:hidden block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <a href={"/sign-in"} className="w-full">
                      <Button className="w-full">Sign In</Button>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href={"/sign-up"} className="w-full">
                      <Button className="w-full" variant={"outline"}>
                        Sing Up
                      </Button>
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <ModeToggle />
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
