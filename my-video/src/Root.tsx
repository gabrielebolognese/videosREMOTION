import "./index.css";
import "./video/fonts";
import "./brand/fonts";
import "./lib/fonts";
import "./dayzero/lib/fonts";
import "./agency/lib/fonts";
import "./offer/fonts";
import "./cafe/fonts";
import "./vocab/fonts";
import "./price/fonts";
import "./smart/fonts";
import "./grids/fonts";
import "./message/fonts";
import { Composition, Folder } from "remotion";
import { BrandingCarousel } from "./brand/Video";
import { ExpectationsShot } from "./brand/scenes/ExpectationsShot";
import { G1NotWell, G8Brain } from "./brand/scenes/groups";
import { OutroShot } from "./brand/scenes/OutroShot";
import { AgencyExplainer } from "./agency/AgencyExplainer";
import {
  DURATION as AG_DURATION,
  FPS as AG_FPS,
  HEIGHT as AG_HEIGHT,
  WIDTH as AG_WIDTH,
} from "./agency/lib/tokens";
import { DayZero } from "./dayzero/DayZero";
import {
  DURATION as DZ_DURATION,
  FPS as DZ_FPS,
  HEIGHT as DZ_HEIGHT,
  WIDTH as DZ_WIDTH,
} from "./dayzero/lib/tokens";
import { CafeStory } from "./cafe/CafeStory";
import {
  DURATION as CAFE_DURATION,
  FPS as CAFE_FPS,
  HEIGHT as CAFE_HEIGHT,
  SHOTS as CAFE_SHOTS,
  shotFrames as cafeShotFrames,
  WIDTH as CAFE_WIDTH,
} from "./cafe/lib/tokens";
import { S1Hero } from "./cafe/scenes/S1Hero";
import { S2Trio } from "./cafe/scenes/S2Trio";
import { S3Store } from "./cafe/scenes/S3Store";
import { S4Transit } from "./cafe/scenes/S4Transit";
import { S5Interior } from "./cafe/scenes/S5Interior";
import { S6Table } from "./cafe/scenes/S6Table";
import { S7Return } from "./cafe/scenes/S7Return";
import { S8Close } from "./cafe/scenes/S8Close";
import { GridsOpener, GridsShot } from "./grids/GridsOpener";
import {
  DURATION as GR_DURATION,
  FPS as GR_FPS,
  HEIGHT as GR_HEIGHT,
  SHOTS as GR_SHOTS,
  shotFrames as grShotFrames,
  WIDTH as GR_WIDTH,
} from "./grids/lib/tokens";
import { MESSAGE_SCENES, TheMessage } from "./message/TheMessage";
import {
  DURATION as MSG_DURATION,
  FPS as MSG_FPS,
  HEIGHT as MSG_HEIGHT,
  SHOTS as MSG_SHOTS,
  shotFrames as msgShotFrames,
  WIDTH as MSG_WIDTH,
} from "./message/lib/tokens";
import { HundredDays } from "./HundredDays";
import {
  VisualVocabulary,
  VOCAB_SCENES,
} from "./vocab/VisualVocabulary";
import {
  DURATION as VOCAB_DURATION,
  FPS as VOCAB_FPS,
  HEIGHT as VOCAB_HEIGHT,
  SHOTS as VOCAB_SHOTS,
  shotFrames as vocabShotFrames,
  WIDTH as VOCAB_WIDTH,
} from "./vocab/lib/tokens";
import { SmartMoves, SMART_SCENES } from "./smart/SmartMoves";
import {
  DURATION as SM_DURATION,
  FPS as SM_FPS,
  HEIGHT as SM_HEIGHT,
  SHOTS as SM_SHOTS,
  shotFrames as smartShotFrames,
  WIDTH as SM_WIDTH,
} from "./smart/lib/tokens";
import { PriceFraming, PRICE_SHOT_PREVIEWS } from "./price/PriceFraming";
import {
  DURATION as PRICE_DURATION,
  FPS as PRICE_FPS,
  HEIGHT as PRICE_HEIGHT,
  SHOTS as PRICE_SHOTS,
  shotFrames as priceShotFrames,
  WIDTH as PRICE_WIDTH,
} from "./price/lib/tokens";
import { Offer } from "./offer/Offer";
import {
  DURATION as OFFER_DURATION,
  FPS as OFFER_FPS,
  HEIGHT as OFFER_HEIGHT,
  SHOTS as OFFER_SHOTS,
  shotFrames as offerShotFrames,
  WIDTH as OFFER_WIDTH,
} from "./offer/lib/tokens";
import { S1Offer } from "./offer/scenes/S1Offer";
import { S2Health } from "./offer/scenes/S2Health";
import { S3Watch } from "./offer/scenes/S3Watch";
import { S4People } from "./offer/scenes/S4People";
import { S5Figure } from "./offer/scenes/S5Figure";
import { S6Money } from "./offer/scenes/S6Money";
import { S7Loved } from "./offer/scenes/S7Loved";
import { S8Peace } from "./offer/scenes/S8Peace";
import { DURATION, FPS, HEIGHT, WIDTH } from "./lib/tokens";
import { KineticReel } from "./video/Video";
import { S1aIdeas } from "./video/scenes/S1aIdeas";
import { S1bGrowth } from "./video/scenes/S1bGrowth";
import { S1cAudience } from "./video/scenes/S1cAudience";
import { S1dNoise } from "./video/scenes/S1dNoise";
import { S2aMoney } from "./video/scenes/S2aMoney";
import { S2bValue } from "./video/scenes/S2bValue";
import { S2cSocialgram } from "./video/scenes/S2cSocialgram";
import { S3aStrategy } from "./video/scenes/S3aStrategy";
import { S3bProfile } from "./video/scenes/S3bProfile";
import { S3cKeyboard } from "./video/scenes/S3cKeyboard";
import { S3dSmart } from "./video/scenes/S3dSmart";
import { S3eDm } from "./video/scenes/S3eDm";

const CAFE_SCENES = [
  S1Hero,
  S2Trio,
  S3Store,
  S4Transit,
  S5Interior,
  S6Table,
  S7Return,
  S8Close,
];

const OFFER_SCENES = [
  S1Offer,
  S2Health,
  S3Watch,
  S4People,
  S5Figure,
  S6Money,
  S7Loved,
  S8Peace,
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TheMessage"
        component={TheMessage}
        durationInFrames={MSG_DURATION}
        fps={MSG_FPS}
        width={MSG_WIDTH}
        height={MSG_HEIGHT}
      />

      <Folder name="Message-shots">
        {MSG_SHOTS.map((shot, i) => (
          <Composition
            key={shot.id}
            id={shot.id}
            component={MESSAGE_SCENES[i]}
            durationInFrames={msgShotFrames(shot.from, shot.to)}
            fps={MSG_FPS}
            width={MSG_WIDTH}
            height={MSG_HEIGHT}
          />
        ))}
      </Folder>

      <Composition
        id="PriceFraming"
        component={PriceFraming}
        durationInFrames={PRICE_DURATION}
        fps={PRICE_FPS}
        width={PRICE_WIDTH}
        height={PRICE_HEIGHT}
      />

      <Folder name="Price-shots">
        {PRICE_SHOTS.map((shot, i) => (
          <Composition
            key={shot.id}
            id={shot.id}
            component={PRICE_SHOT_PREVIEWS[i]}
            durationInFrames={priceShotFrames(i)}
            fps={PRICE_FPS}
            width={PRICE_WIDTH}
            height={PRICE_HEIGHT}
          />
        ))}
      </Folder>

      <Composition
        id="Grids"
        component={GridsOpener}
        durationInFrames={GR_DURATION}
        fps={GR_FPS}
        width={GR_WIDTH}
        height={GR_HEIGHT}
      />

      <Folder name="Grids-shots">
        {GR_SHOTS.map((shot) => (
          <Composition
            key={shot.id}
            id={shot.id}
            component={GridsShot}
            defaultProps={{ from: shot.from }}
            durationInFrames={grShotFrames(shot.from, shot.to)}
            fps={GR_FPS}
            width={GR_WIDTH}
            height={GR_HEIGHT}
          />
        ))}
      </Folder>

      <Composition
        id="SmartMoves"
        component={SmartMoves}
        durationInFrames={SM_DURATION}
        fps={SM_FPS}
        width={SM_WIDTH}
        height={SM_HEIGHT}
      />

      <Folder name="Smart-shots">
        {SM_SHOTS.map((shot, i) => (
          <Composition
            key={shot.id}
            id={shot.id}
            component={SMART_SCENES[i]}
            durationInFrames={smartShotFrames(shot.from, shot.to)}
            fps={SM_FPS}
            width={SM_WIDTH}
            height={SM_HEIGHT}
          />
        ))}
      </Folder>

      <Composition
        id="VisualVocabulary"
        component={VisualVocabulary}
        durationInFrames={VOCAB_DURATION}
        fps={VOCAB_FPS}
        width={VOCAB_WIDTH}
        height={VOCAB_HEIGHT}
      />

      <Folder name="Vocab-shots">
        {VOCAB_SHOTS.map((shot, i) => (
          <Composition
            key={shot.id}
            id={shot.id}
            component={VOCAB_SCENES[i]}
            durationInFrames={vocabShotFrames(shot.from, shot.to)}
            fps={VOCAB_FPS}
            width={VOCAB_WIDTH}
            height={VOCAB_HEIGHT}
          />
        ))}
      </Folder>

      <Composition
        id="CafeStory"
        component={CafeStory}
        durationInFrames={CAFE_DURATION}
        fps={CAFE_FPS}
        width={CAFE_WIDTH}
        height={CAFE_HEIGHT}
      />

      <Folder name="Cafe-shots">
        {CAFE_SHOTS.map((shot, i) => (
          <Composition
            key={shot.id}
            id={shot.id}
            component={CAFE_SCENES[i]}
            durationInFrames={cafeShotFrames(shot.from, shot.to)}
            fps={CAFE_FPS}
            width={CAFE_WIDTH}
            height={CAFE_HEIGHT}
          />
        ))}
      </Folder>

      <Composition
        id="TheOffer"
        component={Offer}
        durationInFrames={OFFER_DURATION}
        fps={OFFER_FPS}
        width={OFFER_WIDTH}
        height={OFFER_HEIGHT}
      />

      <Folder name="Offer-shots">
        {OFFER_SHOTS.map((shot, i) => (
          <Composition
            key={shot.id}
            id={shot.id}
            component={OFFER_SCENES[i]}
            durationInFrames={offerShotFrames(shot.from, shot.to)}
            fps={OFFER_FPS}
            width={OFFER_WIDTH}
            height={OFFER_HEIGHT}
          />
        ))}
      </Folder>

      <Composition
        id="AgencyExplainer"
        component={AgencyExplainer}
        durationInFrames={AG_DURATION}
        fps={AG_FPS}
        width={AG_WIDTH}
        height={AG_HEIGHT}
      />

      <Composition
        id="DayZero"
        component={DayZero}
        durationInFrames={DZ_DURATION}
        fps={DZ_FPS}
        width={DZ_WIDTH}
        height={DZ_HEIGHT}
      />

      <Composition
        id="HundredDays"
        component={HundredDays}
        durationInFrames={DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      <Composition
        id="BrandingCarousel"
        component={BrandingCarousel}
        durationInFrames={711}
        fps={30}
        width={720}
        height={1280}
      />

      <Folder name="Branding-shots">
        <Composition
          id="Brand-A-Opening"
          component={G1NotWell}
          durationInFrames={60}
          fps={30}
          width={720}
          height={1280}
        />
        <Composition
          id="Brand-B-Brain"
          component={G8Brain}
          durationInFrames={104}
          fps={30}
          width={720}
          height={1280}
        />
        <Composition
          id="Brand-C-Expectations"
          component={ExpectationsShot}
          durationInFrames={87}
          fps={30}
          width={720}
          height={1280}
        />
        <Composition
          id="Brand-D-Outro"
          component={OutroShot}
          durationInFrames={101}
          fps={30}
          width={720}
          height={1280}
        />
      </Folder>

      <Composition
        id="SocialReel"
        component={KineticReel}
        durationInFrames={534}
        fps={30}
        width={720}
        height={1280}
      />

      <Folder name="Shots">
        <Composition
          id="S1a-Ideas"
          component={S1aIdeas}
          durationInFrames={42}
          fps={30}
          width={720}
          height={1280}
        />
        <Composition
          id="S1b-Growth"
          component={S1bGrowth}
          durationInFrames={54}
          fps={30}
          width={720}
          height={1280}
        />
        <Composition
          id="S1c-Audience"
          component={S1cAudience}
          durationInFrames={51}
          fps={30}
          width={720}
          height={1280}
        />
        <Composition
          id="S1d-Noise"
          component={S1dNoise}
          durationInFrames={33}
          fps={30}
          width={720}
          height={1280}
        />
        <Composition
          id="S2a-Money"
          component={S2aMoney}
          durationInFrames={45}
          fps={30}
          width={720}
          height={1280}
        />
        <Composition
          id="S2b-Value"
          component={S2bValue}
          durationInFrames={63}
          fps={30}
          width={720}
          height={1280}
        />
        <Composition
          id="S2c-Socialgram"
          component={S2cSocialgram}
          durationInFrames={72}
          fps={30}
          width={720}
          height={1280}
        />
        <Composition
          id="S3a-Strategy"
          component={S3aStrategy}
          durationInFrames={24}
          fps={30}
          width={720}
          height={1280}
        />
        <Composition
          id="S3b-Profile"
          component={S3bProfile}
          durationInFrames={42}
          fps={30}
          width={720}
          height={1280}
        />
        <Composition
          id="S3c-Keyboard"
          component={S3cKeyboard}
          durationInFrames={42}
          fps={30}
          width={720}
          height={1280}
        />
        <Composition
          id="S3d-Smart"
          component={S3dSmart}
          durationInFrames={24}
          fps={30}
          width={720}
          height={1280}
        />
        <Composition
          id="S3e-DM"
          component={S3eDm}
          durationInFrames={42}
          fps={30}
          width={720}
          height={1280}
        />
      </Folder>
    </>
  );
};
