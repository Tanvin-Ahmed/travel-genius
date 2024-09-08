import { Link, useNavigate } from "react-router-dom";
import { Dock, DockIcon } from "../../magicui/dock";
import CustomAvatar from "./custom-avatar";
import github from "../../../assets/social/github.svg";
import linkedin from "../../../assets/social/linkedin.svg";
import facebook from "../../../assets/social/facebook.svg";
import portfolio from "../../../assets/social/portfolio.png";
import logo from "../../../assets/logo.png";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-orange-50 dark:bg-orange-900/10 mt-20">
      <div className="container mx-auto p-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <CustomAvatar src={logo} alt="SH" />
            <h1 className="font-bold sm:text-2xl text-xl">
              <span className="text-primary">Travel</span> Genius
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold">Follow</h1>
            <div className="relative -mt-10">
              <Dock direction="middle">
                <DockIcon>
                  <Link to={"https://github.com/Tanvin-Ahmed"} target="_blank">
                    <CustomAvatar
                      src={github}
                      alt="github"
                      className="bg-white h-6 w-6"
                    />
                  </Link>
                </DockIcon>
                <DockIcon>
                  <Link
                    to={"https://www.linkedin.com/in/tanvinbd"}
                    target="_blank"
                  >
                    <CustomAvatar
                      src={linkedin}
                      alt="linkedin"
                      className="h-6 w-6"
                    />
                  </Link>
                </DockIcon>
                <DockIcon>
                  <Link
                    to={"https://www.facebook.com/tanvinahmed.touhid"}
                    target="_blank"
                  >
                    <CustomAvatar
                      src={facebook}
                      alt="facebook"
                      className="h-6 w-6"
                    />
                  </Link>
                </DockIcon>
                <DockIcon>
                  <Link to={"https://tanvin-ahmed.web.app/"} target="_blank">
                    <CustomAvatar
                      src={portfolio}
                      alt="portfolio"
                      className="h-6 w-6"
                    />
                  </Link>
                </DockIcon>
              </Dock>
            </div>
          </div>
          <small>
            &copy; {new Date().getFullYear()} by A. N. M. Tanvin Ahmed. All
            rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
