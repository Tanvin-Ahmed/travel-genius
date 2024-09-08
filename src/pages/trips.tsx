import { useContext, useEffect, useMemo, useState } from "react";
import { Trip } from "../types";
import { getAllTrips } from "../firebase/db-action";
import { AuthContext } from "../context/auth-context";
import { Map } from "lucide-react";
import TripCard from "../components/custom/trip/trip-card";
import useLoader from "../hook/use-loader";
import TripCardSkeleton from "../components/custom/skeleton/trip-card-skeleton";

const Trips = () => {
  const { user } = useContext(AuthContext);
  const [trips, setTrips] = useState<Trip[]>([]);
  const { isLoading, setIsLoading } = useLoader();

  const fetchTripList = useMemo(
    () => async () => {
      if (!user?.email) return;
      setIsLoading(true);
      const data = await getAllTrips(user.email);
      setIsLoading(false);
      return data;
    },
    [user?.email, setIsLoading]
  );

  useEffect(() => {
    if (!user?.email) return;
    const getTripList = async () => {
      const data = await fetchTripList();
      if (data) {
        setTrips(data ?? []);
      }
    };

    getTripList();
  }, [user?.email, fetchTripList]);

  return (
    <section className="min-h-screen max-h-full">
      {isLoading ? (
        <div className="space-y-10">
          <h1 className="font-bold text-2xl sm:text-3xl">My Trips</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3].map(() => (
              <TripCardSkeleton />
            ))}
          </div>
        </div>
      ) : !trips.length ? (
        <div className="flex flex-col justify-center items-center mt-20">
          <Map className="h-20 w-20 text-orange-300 dark:text-orange-900/90" />
          <p className="text-orange-300 dark:text-orange-900/90 font-semibold">
            No Trip created yet!
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          <h1 className="font-bold text-2xl sm:text-3xl">My Trips</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {trips.map((trip) => (
              <TripCard key={trip.id} data={trip} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Trips;
