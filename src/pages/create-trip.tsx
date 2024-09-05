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

const CreateTripPage = () => {
  const { Loader, isLoading, setIsLoading } = useLoader();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: 1,
      traveler: 1,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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

      console.log(result.response.text());
    } catch (error) {
      console.log(error);
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
