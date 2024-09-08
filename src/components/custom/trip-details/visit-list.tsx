import { AIResponse } from "../../../types";
import PlaceToVisit from "./place-to-visit";

type Props = {
  data?: AIResponse;
};

const VisitList = ({ data }: Props) => {
  return (
    <div className="space-y-8">
      <h2 className="font-bold text-xl md:text-3xl sm:text-2xl">
        Place to visit
      </h2>
      <div className="space-y-5">
        {data?.itinerary
          ? Object.keys(data?.itinerary)
              ?.reverse()
              ?.map((key) => (
                <div key={key} className="space-y-5">
                  <h3 className="font-semibold text-lg md:text-2xl sm:text-xl">
                    Day <span>{key.split("day")[1]}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {data?.itinerary && data?.itinerary[key].morning ? (
                      <PlaceToVisit
                        data={data?.itinerary[key].morning}
                        timeToVisit={"Morning"}
                      />
                    ) : null}
                    {data?.itinerary && data?.itinerary[key].afternoon ? (
                      <PlaceToVisit
                        data={data?.itinerary[key].afternoon}
                        timeToVisit={"Afternoon"}
                      />
                    ) : null}
                    {data?.itinerary && data?.itinerary[key].evening ? (
                      <PlaceToVisit
                        data={data?.itinerary[key].evening}
                        timeToVisit={"Evening"}
                      />
                    ) : null}
                  </div>
                </div>
              ))
          : null}
      </div>
    </div>
  );
};

export default VisitList;
