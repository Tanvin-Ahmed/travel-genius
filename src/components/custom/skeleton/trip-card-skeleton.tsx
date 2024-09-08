import { Skeleton } from "../../ui/skeleton";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";

const TripCardSkeleton = () => {
  return (
    <Card className="flex flex-col dark:bg-orange-900/10">
      <CardHeader className="flex-1">
        <Skeleton className="h-[125px] w-[250px] rounded" />
        <CardTitle>
          <Skeleton className="h-6 w-full" />
        </CardTitle>
        <CardDescription>
          <span>
            <Skeleton className="h-3 w-[50%]" />
          </span>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Skeleton className="h-10 w-full rounded" />
      </CardFooter>
    </Card>
  );
};

export default TripCardSkeleton;
