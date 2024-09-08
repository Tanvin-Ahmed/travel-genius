import {
  SelectBudgetOptions,
  SelectTravelListOptions,
} from "../../../constant/options";
import { Trip } from "../../../types";
import { useEffect, useMemo, useState } from "react";
import { BASE_PHOTO_URL, getPlacePhotos } from "../../../service/GlobalImgAPI";
import placeholder from "../../../assets/banner.png";

type Props = {
  data?: Trip;
};

const Info = ({ data }: Props) => {
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
        .replace("{height}", "400")
        .replace("{width}", "1000");

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
    <div className="space-y-10">
      <img
        src={photoURL ? photoURL : placeholder}
        alt="banner"
        className="w-full max-h-[400px] object-cover rounded-md"
      />
      <div className="space-y-4">
        <h1 className="font-bold text-2xl md:text-4xl sm:text-3xl">
          {data?.userSelection?.location?.label}
        </h1>
        <div className="flex gap-4 flex-wrap">
          <p className="flex justify-center items-center gap-1 py-1 px-3 rounded-3xl text-xs md:text-sm bg-orange-100 dark:bg-orange-500">
            🗓️ {data?.userSelection?.day} days
          </p>
          <p className="flex justify-center items-center gap-1 py-1 px-3 rounded-3xl text-xs md:text-sm bg-orange-100 dark:bg-orange-500">
            {data?.userSelection?.budget ? (
              <>
                {
                  SelectBudgetOptions.find(
                    (t) => t.id === data?.userSelection?.traveler
                  )?.icon
                }{" "}
                {
                  SelectBudgetOptions.find(
                    (t) => t.id === data?.userSelection?.traveler
                  )?.title
                }
              </>
            ) : null}{" "}
            budget
          </p>
          <p className="flex justify-center items-center gap-1 py-1 px-3 rounded-3xl text-xs md:text-sm bg-orange-100 dark:bg-orange-500">
            {data?.userSelection?.traveler ? (
              <>
                {
                  SelectTravelListOptions.find(
                    (t) => t.id === data?.userSelection?.traveler
                  )?.icon
                }{" "}
                {
                  SelectTravelListOptions.find(
                    (t) => t.id === data?.userSelection?.traveler
                  )?.title
                }
              </>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
