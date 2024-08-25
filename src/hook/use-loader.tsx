import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  return {
    isLoading,
    setIsLoading,
    Loader: ({
      width,
      height,
      color,
    }: {
      width?: string;
      height?: string;
      color?: string;
    }) => (
      <ThreeDots
        visible={true}
        height={height || "30"}
        width={width || "30"}
        color={color || "#fff"}
        radius="9"
        ariaLabel="three-dots-loading"
      />
    ),
  };
};

export default useLoader;
