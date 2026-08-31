import { AbsoluteFill, Series } from "remotion";
import { S1aIdeas } from "./scenes/S1aIdeas";
import { S1bGrowth } from "./scenes/S1bGrowth";
import { S1cAudience } from "./scenes/S1cAudience";
import { S1dNoise } from "./scenes/S1dNoise";
import { S2aMoney } from "./scenes/S2aMoney";
import { S2bValue } from "./scenes/S2bValue";
import { S2cSocialgram } from "./scenes/S2cSocialgram";
import { S3aStrategy } from "./scenes/S3aStrategy";
import { S3bProfile } from "./scenes/S3bProfile";
import { S3cKeyboard } from "./scenes/S3cKeyboard";
import { S3dSmart } from "./scenes/S3dSmart";
import { S3eDm } from "./scenes/S3eDm";

/**
 * 17.8s silent 9:16 kinetic typography reel. Twelve hard cuts, no dissolves,
 * no audio track. 30fps, so 534 frames total.
 */
export const KineticReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Series>
        <Series.Sequence durationInFrames={42} name="1A - Ideas">
          <S1aIdeas />
        </Series.Sequence>
        <Series.Sequence durationInFrames={54} name="1B - Growth">
          <S1bGrowth />
        </Series.Sequence>
        <Series.Sequence durationInFrames={51} name="1C - Audience">
          <S1cAudience />
        </Series.Sequence>
        <Series.Sequence durationInFrames={33} name="1D - Noise">
          <S1dNoise />
        </Series.Sequence>

        <Series.Sequence durationInFrames={45} name="2A - Money">
          <S2aMoney />
        </Series.Sequence>
        <Series.Sequence durationInFrames={63} name="2B - Value">
          <S2bValue />
        </Series.Sequence>
        <Series.Sequence durationInFrames={72} name="2C - Socialgram">
          <S2cSocialgram />
        </Series.Sequence>

        <Series.Sequence durationInFrames={24} name="3A - Strategy">
          <S3aStrategy />
        </Series.Sequence>
        <Series.Sequence durationInFrames={42} name="3B - Profile">
          <S3bProfile />
        </Series.Sequence>
        <Series.Sequence durationInFrames={42} name="3C - Keyboard">
          <S3cKeyboard />
        </Series.Sequence>
        <Series.Sequence durationInFrames={24} name="3D - Smart">
          <S3dSmart />
        </Series.Sequence>
        <Series.Sequence durationInFrames={42} name="3E - DM">
          <S3eDm />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
