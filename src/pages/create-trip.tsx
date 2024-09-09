import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Card, CardContent } from "../components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Button } from "../components/ui/button";
import { Option } from "react-google-places-autocomplete/build/types";
import { Input } from "../components/ui/input";
import {
  SelectBudgetOptions,
  SelectTravelListOptions,
} from "../constant/options";
import SelectOptionCard from "../components/custom/create-trip/select-option-card";
import { chatSession, prompt } from "../service/AIModel";
import useLoader from "../hook/use-loader";
import { AIResponse } from "../types";
import { saveTrip } from "../firebase/db-action";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useToast } from "../hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { correctJsonSyntax } from "../utils/JSON-syntax-correction";

const optionSchema = z.object({
  label: z.string(),
  value: z.any(),
});

const formSchema = z.object({
  location: optionSchema.refine((val) => val !== null, {
    message: "Location must be selected.",
  }),
  day: z.string().min(1, {
    message: "Please select how many days you want to fixed for trip.",
  }),
  budget: z.number({ message: "Please select your budget range." }),
  traveler: z.number({ message: "Please select your travel partner." }),
});

export type CreateTripUserInput = z.infer<typeof formSchema>;

const CreateTripPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useContext(AuthContext);
  const { Loader, isLoading, setIsLoading } = useLoader();

  const form = useForm<CreateTripUserInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: 1,
      traveler: 1,
    },
  });

  const onSubmit = async (values: CreateTripUserInput) => {
    try {
      setIsLoading(true);

      const budget = SelectBudgetOptions.find(
        (select) => select.id === values.budget
      )?.title;
      const traveler = SelectTravelListOptions.find(
        (select) => select.id === values.traveler
      )?.people;

      if (!budget || !traveler) {
        setIsLoading(false);
        return;
      }

      const info = { ...values, budget, traveler };

      const FINAL_PROMPT = prompt
        .replace("{location}", info.location.label)
        .replace("{day}", info.day.toString())
        .replace("{traveler}", info.traveler)
        .replace("{budget}", info.budget)
        .replace("{day}", info.day.toString());

      const result = await chatSession.sendMessage(FINAL_PROMPT);

      const text = result.response.text();

      if (!text.trim()) {
        throw new Error("No response coming form AI!");
      }

      const CorrectJsonString = correctJsonSyntax(text.trim());

      if (!CorrectJsonString) throw new Error("Invalid JSON string!");

      const response = JSON.parse(CorrectJsonString) as AIResponse;

      if (user?.email) {
        const docId = await saveTrip(response, user.email, values);
        navigate(`/trips/${docId}`);
      } else {
        throw new Error("User email is required!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error!",
        description: error?.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-primary font-bold sm:text-4xl text-2xl">
          Tell us your travel preferences 🌍
        </h1>
        <p>
          Just provide some basic information and our trip planner will generate
          a customized itinerary based on your preferences.
        </p>
      </div>
      <Card className="py-6">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      What is destination of choice?{" "}
                      <span className="text-red-500 text-lg">*</span>
                    </FormLabel>
                    <FormControl>
                      <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                          value: field.value as Option,
                          onChange: (value) => field.onChange(value),
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      How many days are you planning your trip?{" "}
                      <span className="text-red-500 text-lg">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex.3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is your budget?</FormLabel>
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                      {SelectBudgetOptions.map((option) => (
                        <SelectOptionCard
                          key={option.id}
                          {...option}
                          onOptionChange={field.onChange}
                          value={field.value}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="traveler"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Who do you plan on traveling with on your next adventure?
                    </FormLabel>
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                      {SelectTravelListOptions.map((option) => (
                        <SelectOptionCard
                          key={option.id}
                          {...option}
                          onOptionChange={field.onChange}
                          value={field.value}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader /> : "Generate Trip"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default CreateTripPage;
