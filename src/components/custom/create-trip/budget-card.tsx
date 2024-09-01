import useBorderAnimation from "../../../hook/use-border-animation";
import { cn } from "../../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { motion } from "framer-motion";

type Props = {
  id: string;
  title: string;
  description: string;
  icon: string;
  onOptionChange: (event: number) => void;
  value: number;
};

const BudgetOptionCard = ({
  title,
  description,
  icon,
  onOptionChange,
  id,
  value,
}: Props) => {
  const { animationRef, maskImageStyle } = useBorderAnimation();

  return (
    <Card
      onClick={() => onOptionChange(Number(id))}
      className={cn(
        "relative duration-300 cursor-pointer h-full w-full dark:bg-orange-900/20 bg-orange-50 rounded border-2",
        {
          "border-orange-400 dark:border-orange-600": value === Number(id),
          "border-orange-200 dark:border-orange-950": value !== Number(id),
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
      </CardContent>
    </Card>
  );
};

export default BudgetOptionCard;
