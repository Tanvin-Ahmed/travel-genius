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

const optionSchema = z.object({
  label: z.string(),
  value: z.any(),
});

const formSchema = z.object({
  location: optionSchema.refine((val) => val !== null, {
    message: "Location must be selected.",
  }),
});

const CreateTripPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-primary font-bold sm:text-4xl text-2xl">
          Tell us your travel preferences
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
                    <FormLabel>What is destination of choice?</FormLabel>
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
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default CreateTripPage;
