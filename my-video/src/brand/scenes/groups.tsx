import { Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../lib/Backdrop";
import { Idle, Reveal, RiseReveal } from "../lib/Reveal";
import {
  calm,
  key,
  NEAR_BLACK,
  PALE_GREY,
  playful,
  PROP_SHADOW,
  setup,
} from "../lib/tokens";
import { Brain } from "../props/Brain";
import {
  BlueHospitalPhoto,
  PhotoCard,
  RedHospitalPhoto,
  TrustedSeal,
} from "../props/Cards";
import { CurvedArrow, DoctorPictogram, HospitalTile } from "../props/Icons";
import { StarBurst } from "../props/Stars";

/** Positions a scene's type block at its own height in frame. */
const Block: React.FC<{
  top: number;
  left?: number;
  centred?: boolean;
  children: React.ReactNode;
}> = ({ top, left = 64, centred = false, children }) => (
  <div
    style={{
      position: "absolute",
      top,
      left: centred ? 0 : left,
      right: centred ? 0 : undefined,
      textAlign: centred ? "center" : undefined,
    }}
  >
    {children}
  </div>
);

/** 1 - "Let's suppose you're not feeling well". Drifts up. */
export const G1NotWell: React.FC = () => (
  <SceneShell name="1 - Not feeling well" seed={0}>
    <Block top={380}>
      <Reveal
        name="Word - Lets suppose"
        start={0}
        drift="up"
        driftAmount={30}
        origin="0% 50%"
        style={setup(52)}
      >
        Let&rsquo;s suppose
      </Reveal>
      <div style={{ marginTop: 4 }}>
        <Reveal
          name="Word - youre"
          start={18}
          drift="up"
          driftAmount={25}
          origin="0% 50%"
          scaleFrom={1.44}
          blur={24}
          style={key(178)}
        >
          you&rsquo;re
        </Reveal>
      </div>
      <div style={{ marginTop: 16 }}>
        <Reveal
          name="Word - not feeling well"
          start={36}
          drift="up"
          driftAmount={20}
          origin="0% 50%"
          style={setup(48)}
        >
          not feeling well
        </Reveal>
      </div>
    </Block>
  </SceneShell>
);

/** 2 - "and need a Doctor", pictogram over tiled ghost words. Drifts right. */
export const G2Doctor: React.FC = () => (
  <SceneShell name="2 - Doctor" seed={3}>
    <Block top={250} centred>
      <Reveal
        name="Word - and need a"
        start={2}
        drift="right"
        driftAmount={24}
        style={setup(52)}
      >
        and need a
      </Reveal>
      <div style={{ marginTop: 2 }}>
        <Reveal
          name="Word - Doctor"
          start={16}
          drift="right"
          driftAmount={24}
          scaleFrom={1.44}
          blur={24}
          style={key(168)}
        >
          Doctor
        </Reveal>
      </div>

      <div style={{ position: "relative", height: 340, marginTop: 18 }}>
        <Reveal
          name="Ghost word tiles"
          start={26}
          drift="right"
          driftAmount={24}
          scaleFrom={1.12}
          blur={26}
          duration={12}
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            ...setup(118, PALE_GREY),
            fontWeight: 700,
            lineHeight: 1.02,
          }}
        >
          <div>Doctor Doctor</div>
          <div style={{ marginLeft: -70 }}>Doctor Doctor</div>
          <div style={{ marginLeft: 40 }}>Doctor Doctor</div>
        </Reveal>

        <RiseReveal
          name="Doctor pictogram"
          start={30}
          drift="right"
          driftAmount={24}
          rise={230}
          duration={22}
          style={{ position: "absolute", left: 254, top: 44 }}
        >
          <DoctorPictogram width={212} />
        </RiseReveal>
      </div>
    </Block>
  </SceneShell>
);

/** 3 - "you see two Clinics", tiles drop in at the left. Drifts left. */
export const G3Clinics: React.FC = () => (
  <SceneShell name="3 - Clinics" seed={6}>
    <Block top={300}>
      <Reveal
        name="Word - you see two"
        start={2}
        drift="left"
        driftAmount={24}
        origin="0% 50%"
        style={setup(52)}
      >
        you see two
      </Reveal>
      <div style={{ marginTop: 4 }}>
        <Reveal
          name="Word - Clinics"
          start={14}
          drift="left"
          driftAmount={24}
          origin="0% 50%"
          scaleFrom={1.44}
          blur={24}
          style={key(150)}
        >
          Clinics
        </Reveal>
      </div>

      <div style={{ marginTop: 40 }}>
        <RiseReveal
          name="Hospital tile 1"
          start={20}
          drift="left"
          driftAmount={24}
          rise={-170}
          duration={16}
          blur={14}
          style={{ boxShadow: PROP_SHADOW, borderRadius: 36 }}
        >
          <HospitalTile size={150} />
        </RiseReveal>
      </div>
      <div style={{ marginTop: 24 }}>
        <RiseReveal
          name="Hospital tile 2"
          start={26}
          drift="left"
          driftAmount={24}
          rise={-170}
          duration={16}
          blur={14}
          style={{ boxShadow: PROP_SHADOW, borderRadius: 36 }}
        >
          <HospitalTile size={150} />
        </RiseReveal>
      </div>
    </Block>
  </SceneShell>
);

/** 4 - "one is bright red with Playful Fonts". Drifts up. */
export const G4Playful: React.FC = () => (
  <SceneShell name="4 - Playful Fonts" seed={9}>
    <Block top={330}>
      <Reveal
        name="Word - one is bright red with"
        start={2}
        drift="up"
        driftAmount={30}
        origin="0% 50%"
        style={setup(44)}
      >
        one is bright red with
      </Reveal>
      <div style={{ marginTop: 10 }}>
        <Reveal
          name="Word - Playful Fonts"
          start={15}
          drift="up"
          driftAmount={26}
          origin="0% 50%"
          scaleFrom={1.4}
          blur={22}
          style={playful(82)}
        >
          Playful Fonts
        </Reveal>
      </div>
      <div style={{ marginTop: 34 }}>
        <Reveal
          name="Red hospital card"
          start={27}
          drift="up"
          driftAmount={22}
          origin="0% 50%"
          scaleFrom={1.2}
          blur={22}
          duration={10}
        >
          <PhotoCard width={430} height={306}>
            <RedHospitalPhoto width={430} height={306} />
          </PhotoCard>
        </Reveal>
      </div>
    </Block>
  </SceneShell>
);

/** 5 - "the other is clean white with Calm Blue text". Drifts down. */
export const G5Calm: React.FC = () => (
  <SceneShell name="5 - Calm Blue text" seed={12}>
    <Block top={330}>
      <Reveal
        name="Word - the other is clean white with"
        start={2}
        drift="down"
        driftAmount={20}
        origin="0% 50%"
        style={setup(40)}
      >
        the other is clean white with
      </Reveal>
      <div style={{ marginTop: 10 }}>
        <Reveal
          name="Word - Calm Blue text"
          start={15}
          drift="down"
          driftAmount={25}
          origin="0% 50%"
          scaleFrom={1.4}
          blur={22}
          style={calm(72)}
        >
          Calm Blue text
        </Reveal>
      </div>
      <div style={{ marginTop: 34 }}>
        <Reveal
          name="Blue hospital card"
          start={27}
          drift="down"
          driftAmount={30}
          origin="0% 50%"
          scaleFrom={1.2}
          blur={22}
          duration={10}
        >
          <PhotoCard width={430} height={306}>
            <BlueHospitalPhoto width={430} height={306} />
          </PhotoCard>
        </Reveal>
      </div>
    </Block>
  </SceneShell>
);

/** 6 - "you trust one Instantly", TRUSTED seal stamps the card. Drifts right. */
export const G6Instantly: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneShell name="6 - Instantly" seed={15}>
      <Block top={190}>
        <Reveal
          name="Word - you trust one"
          start={2}
          drift="right"
          driftAmount={24}
          origin="0% 50%"
          style={setup(46)}
        >
          you trust one
        </Reveal>
        <div style={{ marginTop: 6 }}>
          <Reveal
            name="Word - Instantly"
            start={14}
            drift="right"
            driftAmount={24}
            origin="0% 50%"
            scaleFrom={1.44}
            blur={24}
            ghost="#CBC9C6"
            color={NEAR_BLACK}
            style={key(112)}
          >
            Instantly &mdash;
          </Reveal>
        </div>

        <div style={{ position: "relative", width: 410, marginTop: 34 }}>
          <Reveal
            name="Blue clinic card"
            start={20}
            drift="right"
            driftAmount={24}
            origin="0% 50%"
            scaleFrom={1.2}
            blur={22}
            duration={10}
          >
            <PhotoCard width={410} height={292}>
              <BlueHospitalPhoto width={410} height={292} />
            </PhotoCard>
          </Reveal>

          <Idle
            name="TRUSTED seal"
            start={30}
            drift="right"
            amount={24}
            style={{ position: "absolute", right: -54, bottom: -46 }}
          >
            <Interactive.Div
              name="TRUSTED seal stamp"
              style={{
                transformOrigin: "50% 50%",
                opacity: interpolate(frame, [30, 31], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                rotate: interpolate(frame, [30, 33], ["-22deg", "-9deg"], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.out(Easing.quad),
                }),
                scale: interpolate(frame, [30, 33], [1.95, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.out(Easing.quad),
                  output: "perceptual-scale",
                }),
                filter: `drop-shadow(0 10px 18px rgba(20,20,20,0.22))`,
              }}
            >
              <TrustedSeal size={168} />
            </Interactive.Div>
          </Idle>
        </div>
      </Block>
    </SceneShell>
  );
};

/** 7 - "Without a word Spoken", star burst drifts through. Drifts up. */
export const G7Spoken: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneShell name="7 - Spoken" seed={18}>
      <Interactive.Div
        name="Drifting star burst"
        style={{
          position: "absolute",
          left: -80,
          top: 550,
          filter: "blur(7px)",
          opacity: 0.5,
          rotate: interpolate(frame, [0, 76], ["-8deg", "16deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
          }),
          translate: interpolate(
            frame,
            [0, 76],
            ["0px 300px", "0px -150px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.3, 0, 0.5, 1),
            },
          ),
        }}
      >
        <StarBurst size={330} spikes={8} />
      </Interactive.Div>

      <Block top={400} centred>
        <Reveal
          name="Word - Without a word"
          start={2}
          drift="up"
          driftAmount={28}
          style={setup(48, NEAR_BLACK)}
        >
          Without a word
        </Reveal>
        <div style={{ marginTop: 4 }}>
          <Reveal
            name="Word - Spoken"
            start={16}
            drift="up"
            driftAmount={23}
            scaleFrom={1.44}
            blur={24}
            style={key(170)}
          >
            Spoken
          </Reveal>
        </div>
      </Block>
    </SceneShell>
  );
};

/** 8 - "Because Your Brian read visual". Drifts down. */
export const G8Brain: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneShell name="8 - Brian" seed={21}>
      <Block top={190} centred>
        <Reveal
          name="Word - Because Your"
          start={2}
          drift="down"
          driftAmount={18}
          style={{ ...setup(48, NEAR_BLACK), fontWeight: 500 }}
        >
          Because Your
        </Reveal>
        <div style={{ marginTop: 2 }}>
          <Reveal
            name="Word - Brian"
            start={14}
            drift="down"
            driftAmount={22}
            scaleFrom={1.46}
            blur={26}
            style={key(190)}
          >
            Brian
          </Reveal>
        </div>

        <div style={{ marginTop: 10, height: 336 }}>
          <RiseReveal
            name="Anatomical brain"
            start={24}
            drift="down"
            driftAmount={26}
            rise={220}
            duration={26}
            blur={22}
            style={{
              filter: "drop-shadow(0 26px 30px rgba(20,20,20,0.18))",
              rotate: `${(Math.sin(frame / 62) * 2.4).toFixed(3)}deg`,
            }}
          >
            <Brain width={410} />
          </RiseReveal>
        </div>

        <Reveal
          name="Word - read visual"
          start={54}
          drift="down"
          driftAmount={30}
          style={setup(96)}
        >
          read visual
        </Reveal>
        <div style={{ marginTop: 12 }}>
          <Reveal
            name="Word - before logic kicks in"
            start={68}
            drift="down"
            driftAmount={34}
            scaleFrom={1.28}
            blur={12}
            style={setup(32, NEAR_BLACK)}
          >
            before logic kicks in.
          </Reveal>
        </div>
      </Block>
    </SceneShell>
  );
};

/** 9 - "that's Visual Vocabulary." Drifts left. */
export const G9Vocabulary: React.FC = () => (
  <SceneShell name="9 - Visual Vocabulary" seed={24}>
    <Block top={360}>
      <Reveal
        name="Word - thats"
        start={2}
        drift="left"
        driftAmount={24}
        origin="0% 50%"
        style={setup(48, NEAR_BLACK)}
      >
        that&rsquo;s
      </Reveal>
      <div style={{ marginTop: 4 }}>
        <Reveal
          name="Word - Visual"
          start={14}
          drift="left"
          driftAmount={24}
          origin="0% 50%"
          scaleFrom={1.44}
          blur={24}
          style={key(165)}
        >
          Visual
        </Reveal>
      </div>
      <div style={{ marginTop: 18 }}>
        <Reveal
          name="Word - Vocabulary"
          start={26}
          drift="left"
          driftAmount={24}
          origin="0% 50%"
          scaleFrom={1.38}
          blur={22}
          style={setup(108)}
        >
          Vocabulary.
        </Reveal>
      </div>
    </Block>
  </SceneShell>
);

/** 10 - "Design doesn't decorate Brands". Drifts right. */
export const G10Design: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneShell name="10 - Design doesnt decorate" seed={27}>
      <Block top={220}>
        <Reveal
          name="Word - Design"
          start={2}
          drift="right"
          driftAmount={24}
          origin="0% 50%"
          scaleFrom={1.44}
          blur={24}
          style={key(160)}
        >
          Design
        </Reveal>
        <div style={{ marginTop: 12 }}>
          <Reveal
            name="Word - doesnt decorate"
            start={14}
            drift="right"
            driftAmount={24}
            origin="0% 50%"
            style={setup(64)}
          >
            doesn&rsquo;t decorate
          </Reveal>
        </div>
      </Block>

      <Idle
        name="Hand drawn arrow"
        start={26}
        drift="right"
        amount={24}
        style={{ position: "absolute", left: 236, top: 470 }}
      >
        <CurvedArrow
          width={176}
          progress={interpolate(frame, [26, 42], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.quad),
          })}
        />
      </Idle>

      <Interactive.Div
        name="Word - Brands"
        style={{
          position: "absolute",
          left: 240,
          top: 592,
          translate: interpolate(frame, [36, 73], ["0px 0px", "62px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
          }),
        }}
      >
        <Reveal
          name="Brands reveal"
          start={36}
          drift="right"
          driftAmount={24}
          origin="0% 50%"
          scaleFrom={1.4}
          blur={24}
          style={setup(165)}
        >
          Brands
        </Reveal>
      </Interactive.Div>
    </SceneShell>
  );
};
