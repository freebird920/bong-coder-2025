import {
  useCallback,
  useEffect as useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import * as PixiJs from "pixi.js";
const App = () => {
  const canvasDivRef = useRef<HTMLDivElement>(null);
  const pixiApp = useMemo(() => new PixiJs.Application(), []);
  const initPixi = useCallback(async () => {
    if (!canvasDivRef.current) return;
    await pixiApp.init({
      resizeTo: canvasDivRef.current,
      background: "#F0F0F0",
    });

    canvasDivRef.current.appendChild(pixiApp.canvas);
    // Load the bunny texture.
    const texture = await PixiJs.Assets.load(
      "https://pixijs.com/assets/bunny.png"
    );

    // Create a new Sprite from an image path
    const bunny = new PixiJs.Sprite(texture);

    // Center the sprite's anchor point
    bunny.anchor.set(0.5);

    // Move the sprite to the center of the screen
    bunny.x = pixiApp.screen.width / 2;
    bunny.y = pixiApp.screen.height / 2;
    // Add to stage
    pixiApp.ticker.add((time) => {
      bunny.rotation += 0.001 * time.deltaTime;
    });
    pixiApp.stage.addChild(bunny);
  }, [pixiApp]);

  useLayoutEffect(() => {
    initPixi();
  }, [initPixi]);
  return (
    <>
      <h3>Pixi.js 연습하기</h3>
      <div ref={canvasDivRef}></div>
    </>
  );
};
export default App;
