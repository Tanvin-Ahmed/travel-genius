import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-hero-bg bg-opacity-5 bg-cover bg-center h-[80vh] bg-no-repeat flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4 w-full h-full backdrop-blur-sm">
        <h1 className="md:text-5xl sm:text-4xl text-2xl font-bold text-center text-white">
          <span className="text-primary">
            Discover your next adventure with AI:
          </span>{" "}
          personalized itineraries at your fingertips.
        </h1>
        <p className="text-white">
          Your personal trip planner and travel curator, creating custom
          itineraries tailored to your interests and budget.
        </p>
        <Button onClick={() => navigate("/create-trip")}>
          Get started, it's free
        </Button>
      </div>
    </section>
  );
};

export default Hero;
