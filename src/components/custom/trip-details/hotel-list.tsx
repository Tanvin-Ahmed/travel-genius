import { AIResponse } from "../../../types";
import HotelCard from "./hotel-card";

type Props = {
  data?: AIResponse;
};

const HotelList = ({ data }: Props) => {
  return (
    <div className="space-y-5">
      <h2 className="font-bold text-xl md:text-3xl sm:text-2xl">Hotels</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.hotels?.map((hotel, index) => (
          <HotelCard key={index} data={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelList;
