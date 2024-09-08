import { useLoaderData } from "react-router-dom";
import { Trip } from "../types";
import Info from "../components/custom/trip-details/info";
import HotelList from "../components/custom/trip-details/hotel-list";
import VisitList from "../components/custom/trip-details/visit-list";

const TripDetails = () => {
  const data = useLoaderData() as Trip;

  return (
    <section className="min-h-screen max-h-full">
      {data ? (
        <div className="space-y-10">
          <Info data={data} />
          <HotelList data={data.tripData} />
          <VisitList data={data.tripData} />
        </div>
      ) : (
        <div className="mt-20 flex flex-col justify-center items-center">
          <h1 className="text-2xl">404</h1>
          <small className="text-muted-foreground">No Trip found!</small>
        </div>
      )}
    </section>
  );
};

export default TripDetails;
