import { useCallback, useEffect, useRef } from "react";
import * as PixiJs from "pixi.js";
const App = () => {
  const canvasDivRef = useRef<HTMLDivElement>(null);
  const initPixi = useCallback(async () => {
    if (!canvasDivRef.current) return;
    const pixiApp = new PixiJs.Application();
    canvasDivRef.current.appendChild(pixiApp.canvas);
    const texture = await PixiJs.Assets.load(
      "https://pixijs.com/assets/bunny.png"
    );
    // Create a bunny Sprite
    const bunny = new PixiJs.Sprite(texture);

    // Center the sprite's anchor point
    bunny.anchor.set(0.5);

    // Move the sprite to the center of the screen
    bunny.x = pixiApp.screen.width / 2;
    bunny.y = pixiApp.screen.height / 2;

    pixiApp.stage.addChild(bunny);

    // Listen for animate update
    pixiApp.ticker.add((time) => {
      // Just for fun, let's rotate mr rabbit a little.
      // * Delta is 1 if running at 100% performance *
      // * Creates frame-independent transformation *
      bunny.rotation += 0.1 * time.deltaTime;
    });
    await pixiApp.init({
      resizeTo: canvasDivRef.current,
    });
  }, []);
  useEffect(() => {
    initPixi();
  }, [initPixi]);
  return (
    <>
      <h3>Pixi.js 연습하기</h3>
      <div className="" ref={canvasDivRef}></div>
    </>
  );
};
export default App;
