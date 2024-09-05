import useBorderAnimation from "../../../hook/use-border-animation";
import { cn } from "../../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { motion } from "framer-motion";

type Props = {
  id: number;
  title: string;
  description: string;
  icon: string;
  people?: string;
  onOptionChange: (event: number) => void;
  value: number;
};

const SelectOptionCard = ({
  title,
  description,
  icon,
  onOptionChange,
  id,
  value,
  people,
}: Props) => {
  const { animationRef, maskImageStyle } = useBorderAnimation();

  return (
    <Card
      onClick={() => onOptionChange(id)}
      className={cn(
        "relative duration-300 cursor-pointer h-full w-full dark:bg-orange-900/20 bg-orange-50 rounded border-2",
        {
          "border-orange-400 bg-orange-300 dark:border-orange-600 dark:bg-orange-500":
            value === id,
          "border-orange-200 dark:border-orange-950": value !== id,
        }
      )}
    >
      <motion.div
        className="absolute inset-0 border-2 border-orange-400 rounded -z-10"
        style={{
          WebkitMaskImage: maskImageStyle,
          maskImage: maskImageStyle,
        }}
        ref={animationRef}
      />
      <CardHeader>
        <CardTitle>
          {icon} {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
        {people ? <small>{people}</small> : null}
      </CardContent>
    </Card>
  );
};

export default SelectOptionCard;
