import { Button } from "../components/ui/button";
import { singInWithGoogle } from "../firebase/google-auth";
import useLoader from "../hook/use-loader";
import { useToast } from "../hooks/use-toast";

const Auth = () => {
  const { toast } = useToast();
  const { isLoading, setIsLoading, Loader } = useLoader();

  const handleSingIn = async () => {
    try {
      setIsLoading(true);

      const userData = await singInWithGoogle();

      // store token in local storage
      localStorage.setItem("auth-token", JSON.stringify(userData.token));
      toast({
        title: "Success! 🎉",
        description: "Welcome to Travel Genius!",
      });
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
