import { Place } from "../../../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import logo from "../../../assets/logo.png";
import Rating from "../shared/rating";
import { Link } from "react-router-dom";
import map from "../../../assets/google-map.svg";
import { Button } from "../../ui/button";

type Props = {
  data?: Place;
  timeToVisit: "Morning" | "Afternoon" | "Evening";
};

const PlaceToVisit = ({ data, timeToVisit }: Props) => {
  return (
    <Card className="bg-orange-50 dark:bg-orange-900/10 flex flex-col">
      <CardHeader>
        <img src={logo} alt="" className="h-full w-full object-cover" />
        <CardTitle className="text-xl">{data?.placeName}</CardTitle>
        <div className="flex justify-between items-center flex-wrap gap-2">
          {data?.rating && Number(data?.rating) ? (
            <Rating rating={Number(data?.rating)} />
          ) : null}
          <small className="inline-block p-1 px-2 text-orange-300 font-bold rounded-3xl shadow dark:shadow-orange-900/50">
            {timeToVisit}
          </small>
        </div>
        <CardDescription>{data?.placeDetails}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <small className="block">
          ⏲️ Best time to Travel: {data?.timeTravel}
        </small>
        <small className="block font-bold mt-2">Transport options</small>
        <div className="flex justify-between items-start flex-wrap gap-3">
          {data?.transport?.map((transport, index) => (
            <div
              key={index}
              className="shadow p-2 rounded-lg dark:shadow-orange-900/50"
            >
              <small className="font-semibold block">🚌 {transport.mode}</small>
              <small className="block">💴 {transport.cost}</small>
              <small className="block">⌛ {transport.time}</small>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link
          to={`https://www.google.com/maps/search/?api=1&query=${data?.placeName}`}
          target="_blank"
          className="w-full block mt-5"
        >
          <Button className="w-full" variant={"outline"}>
            <img src={map} alt="map" className="h-5 w-5" />
            Location
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PlaceToVisit;
