import { Place } from "../../../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import Rating from "../shared/rating";
import { Link } from "react-router-dom";
import map from "../../../assets/google-map.svg";
import { Button } from "../../ui/button";
import { useEffect, useMemo, useState } from "react";
import { BASE_PHOTO_URL, getPlacePhotos } from "../../../service/GlobalImgAPI";
import placeholder from "../../../assets/banner.png";

type Props = {
  data?: Place;
  timeToVisit: "Morning" | "Afternoon" | "Evening";
};

const PlaceToVisit = ({ data, timeToVisit }: Props) => {
  const [photoURL, setPhotoURL] = useState("");

  const fetchPhotoUrl = useMemo(
    () => async () => {
      if (!data?.placeName) return;

      const paramData = {
        textQuery: data?.placeName,
      };
      const { data: result } = await getPlacePhotos(paramData);

      const photoURL = BASE_PHOTO_URL.replace(
        "{name}",
        result?.places[0]?.photos[1]?.name
      )
        .replace("{height}", "300")
        .replace("{width}", "400");

      return photoURL;
    },
    [data?.placeName]
  );

  useEffect(() => {
    const getPhotoUrl = async () => {
      const url = await fetchPhotoUrl();
      if (url) {
        setPhotoURL(url);
      }
    };

    getPhotoUrl();
  }, [fetchPhotoUrl]);

  return (
    <Card className="bg-orange-50 dark:bg-orange-900/10 flex flex-col">
      <CardHeader>
        <img
          src={photoURL ?? placeholder}
          alt=""
          className="h-[180px] w-full object-cover rounded"
        />
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
        <small className="block font-bold mt-2">Transport options</small>
        <div className="flex justify-between items-start flex-wrap gap-3">
          {data?.transport?.map((transport, index) => (
            <div
              key={index}
              className="shadow p-2 rounded-lg dark:shadow-orange-900/50 flex items-center gap-4 flex-wrap"
            >
              <small className="font-semibold text-nowrap">
                🚌 {transport.mode}
              </small>
              <small className="text-nowrap">💴 {transport.cost}</small>
              <small className="text-nowrap">⌛ {transport.time}</small>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <small className="block">
          ⏲️ Best time to Travel: {data?.timeTravel}
        </small>
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
