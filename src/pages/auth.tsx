import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { singInWithGoogle } from "../firebase/google-auth";
import useLoader from "../hook/use-loader";
import { useToast } from "../hooks/use-toast";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isLoading, setIsLoading, Loader } = useLoader();

  const { login } = useContext(AuthContext);

  const from = location.state?.from?.pathname || "/";

  const handleSingIn = async () => {
    try {
      setIsLoading(true);

      const userData = await singInWithGoogle();

      login(userData);
      toast({
        title: "Success! 🎉",
        description: "Welcome to Travel Genius!",
      });
      navigate(from);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorMessage, errorCode);

      toast({
        title: "Authentication Error! ❌",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="h-[85vh] w-full flex justify-center items-center">
      <Button onClick={handleSingIn} disabled={isLoading}>
        <img src="./google.svg" alt="google" className="w-5 h-5 mr-2" />
        SingIn with Google {isLoading ? <Loader /> : null}
      </Button>
    </section>
  );
};

export default Auth;
