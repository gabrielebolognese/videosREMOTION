import "./index.css";
import { MyComposition } from "./Composition";
import { SideBySideTwoComposition } from "./SideBySideTwo";
import { SideBySideThreeComposition } from "./SideBySideThree";
import { SideBySideFourComposition } from "./SideBySideFour";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <SideBySideTwoComposition />
      <SideBySideThreeComposition />
      <SideBySideFourComposition />
    </>
  );
};
