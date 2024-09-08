import { Hotel } from "../../../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import map from "../../../assets/google-map.svg";
import Rating from "../shared/rating";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { useEffect, useMemo, useState } from "react";
import { BASE_PHOTO_URL, getPlacePhotos } from "../../../service/GlobalImgAPI";
import placeholder from "../../../assets/banner.png";

type Props = {
  data?: Hotel;
};

const HotelCard = ({ data }: Props) => {
  const [photoURL, setPhotoURL] = useState("");

  const fetchPhotoUrl = useMemo(
    () => async () => {
      if (!data?.hotelName) return;

      const paramData = {
        textQuery: data?.hotelName,
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
    [data?.hotelName]
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
          src={photoURL ? photoURL : placeholder}
          alt=""
          className="w-full h-[180px] rounded object-cover"
        />
        <CardTitle className="text-xl">{data?.hotelName}</CardTitle>
        {data?.rating && Number(data?.rating) ? (
          <Rating rating={Number(data?.rating)} />
        ) : null}
        <CardDescription className="space-y-2">
          <span className="block">📌 {data?.hotelAddress}</span>
          <span className="block">💰 {data?.price}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p>{data?.description}</p>
      </CardContent>
      <CardFooter>
        <Link
          to={`https://www.google.com/maps/search/?api=1&query=${data?.hotelName}, ${data?.hotelAddress}`}
          target="_blank"
          className="w-full"
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

export default HotelCard;
