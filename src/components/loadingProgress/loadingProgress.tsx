import { FunctionComponent } from "react";
import { Progress, ProgressProps } from "@chakra-ui/react";

export interface LoadingProgressProps extends Pick<ProgressProps, "size"> {
  progress?: number;
  loading?: boolean;
}

export const LoadingProgress: FunctionComponent<LoadingProgressProps> = ({
  progress,
  size,
  loading,
}) => {
  if (!loading) {
    return null;
  }

  return (
    <Progress
      value={progress}
      isIndeterminate={!progress}
      size={size}
      hasStripe={true}
    />
  );
};

export default LoadingProgress;
