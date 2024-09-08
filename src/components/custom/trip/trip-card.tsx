import { Trip } from "../../../types";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import placeholder from "../../../assets/banner.png";
import { SelectBudgetOptions } from "../../../constant/options";
import { Button } from "../../ui/button";
import { BASE_PHOTO_URL, getPlacePhotos } from "../../../service/GlobalImgAPI";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  data?: Trip;
};

const TripCard = ({ data }: Props) => {
  const navigate = useNavigate();
  const [photoURL, setPhotoURL] = useState("");

  const fetchPhotoUrl = useMemo(
    () => async () => {
      if (!data?.userSelection?.location?.label) return;

      const paramData = {
        textQuery: data?.userSelection?.location?.label,
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
    [data?.userSelection?.location?.label]
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
    <Card className="flex flex-col bg-orange-50 dark:bg-orange-900/10">
      <CardHeader className="flex-1">
        <img
          src={photoURL ?? placeholder}
          alt=""
          className="object-cover h-[180px] w-full rounded"
        />
        <CardTitle className="text-[20px]">
          {data?.userSelection?.location?.label}
        </CardTitle>
        <CardDescription>
          <span>
            {data?.userSelection?.day} days trip with{" "}
            {
              SelectBudgetOptions.find(
                (t) => t.id === data?.userSelection?.traveler
              )?.title
            }{" "}
            budget.
          </span>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => navigate(`/trips/${data?.id}`)}
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TripCard;
