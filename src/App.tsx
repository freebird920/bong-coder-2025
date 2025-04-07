import {
  useCallback,
  useEffect as useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import * as PixiJs from "pixi.js";
const App = () => {
  // useRef()
  const canvasDivRef = useRef<HTMLDivElement>(null);

  // useMemo()
  const pixiApp = useMemo(() => new PixiJs.Application(), []);

  // useCallback
  const initPixi = useCallback(async () => {
    if (!canvasDivRef.current) return;
    await pixiApp.init({
      resizeTo: canvasDivRef.current,
      background: "#F0F0F0",
    });

    canvasDivRef.current.appendChild(pixiApp.canvas);

    const rectOne = new PixiJs.Graphics().rect(0, 0, 200, 200).fill(0xff0000);
    rectOne.on("pointertap", () => {
      alert("오 눌렸읍니다?!");
    });
    rectOne.eventMode = "dynamic";
    const rectTwo = new PixiJs.Graphics()
      .rect(200, 200, 200, 200)
      .fill(0x00ff00);
    rectTwo.on("pointertap", () => {
      alert("오 Wkddlspdyd눌렸읍니다?!");
    });
    rectTwo.eventMode = "dynamic";
    pixiApp.stage.addChild(rectOne, rectTwo);

    // // Load the bunny texture.
    // const texture = await PixiJs.Assets.load(
    //   "https://pixijs.com/assets/bunny.png"
    // );

    // // Create a new Sprite from an image path
    // const bunny = new PixiJs.Sprite(texture);

    // // Center the sprite's anchor point
    // bunny.anchor.set(0.5);

    // // Move the sprite to the center of the screen
    // bunny.x = pixiApp.screen.width / 2;
    // bunny.y = pixiApp.screen.height / 2;
    // // Add to stage
    // pixiApp.ticker.add((time) => {
    //   bunny.rotation += 0.001 * time.deltaTime;
    // });
    // pixiApp.stage.addChild(bunny);
  }, [pixiApp]);

  // useLayoutEffect
  useLayoutEffect(() => {
    initPixi();
  }, [initPixi]);

  return (
    <>
      <h3>Pixi.js 연습하기</h3>

      <div className="w-[800px] h-[600px]" ref={canvasDivRef}></div>
    </>
  );
};
export default App;
