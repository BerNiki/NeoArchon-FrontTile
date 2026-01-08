import { Application, extend, useTick } from "@pixi/react";
import { Assets, Container, Graphics, Sprite, Texture, Ticker } from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { keyboard } from "./keyboardCapture";

extend({
  Container,
  Sprite,
  Graphics,
});

export const Battle = () => {
  const [texture, setTexture] = useState<Texture | undefined>(undefined);

  useEffect(() => {
    Assets.load("https://pixijs.com/assets/bunny.png").then((t) =>
      setTexture(t as Texture)
    );
  }, []);

  const drawCallback = useCallback((graphics: Graphics) => {
    graphics.clear();
    graphics.setFillStyle({ color: "red" });
    graphics.rect(0, 0, 100, 100);
    graphics.fill();
  }, []);

  const RotatingSprite = ({ texture }: { texture?: Texture }) => {
    const spriteRef = useRef<Sprite>(null);
    const tiltPhaseRef = useRef(0);
    const baseRotationRef = useRef(0);

    const leftArrow = useRef(keyboard("ArrowLeft")).current;
    const rightArrow = useRef(keyboard("ArrowRight")).current;
    const upArrow = useRef(keyboard("ArrowUp")).current;
    const downArrow = useRef(keyboard("ArrowDown")).current;

    const SPEED = 3;
    const MAX_TILT = 0.09;
    const TILT_SPEED = 0.4;

    useTick((delta) => {
      const sprite = spriteRef.current;
      if (!sprite) return;

      let moving = false;

      if (leftArrow.isDown) {
        sprite.x -= SPEED * delta.deltaTime;
        moving = true;
      }
      if (rightArrow.isDown) {
        sprite.x += SPEED * delta.deltaTime;
        moving = true;
      }
      if (upArrow.isDown) {
        sprite.y -= SPEED * delta.deltaTime;
        moving = true;
      }
      if (downArrow.isDown) {
        sprite.y += SPEED * delta.deltaTime;
        moving = true;
      }

      if (moving) {
        tiltPhaseRef.current += TILT_SPEED * delta.deltaTime;

        const wobble = Math.sin(tiltPhaseRef.current) * MAX_TILT;

        sprite.rotation = baseRotationRef.current + wobble;
      } else {
        sprite.rotation += (baseRotationRef.current - sprite.rotation) * 0.15;

        tiltPhaseRef.current *= 0.9;
      }
    });

    return (
      <pixiSprite
        ref={spriteRef}
        anchor={0.5}
        texture={texture}
        eventMode="dynamic"
        x={300}
        y={200}
      />
    );
  };

  return (
    <Application>
      <pixiContainer x={100} y={100} eventMode="static">
        {Array.from({ length: 25 }).map((_, i) => (
          <pixiSprite
            key={i}
            texture={texture}
            x={(i % 5) * 40}
            y={Math.floor(i / 5) * 40}
          />
        ))}
        <RotatingSprite texture={texture} />
        <pixiSprite
          anchor={{ x: 1.5, y: 0.5 }}
          texture={texture}
          eventMode="dynamic"
        />
        <pixiGraphics position={{ x: 250, y: 50 }} draw={drawCallback} />
      </pixiContainer>
    </Application>
  );
};
