import {
  CSSProperties,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import * as PixiJs from "pixi.js"; // 깃헙에서 복ㅂ ㅌ

const App = () => {
  const canvasDivRef = useRef<HTMLDivElement>(null);

  // 님이쓰세요
  const pixiApp = useMemo(() => {
    return new PixiJs.Application();
  }, []);
  const canvasDivStyle = useMemo<CSSProperties>(() => {
    return {
      // backgroundColor:"red",
      width: 800,
      height: 600,
    };
  }, []);

  const initPixi = useCallback(async () => {
    if (!canvasDivRef.current) return;
    await pixiApp.init({
      resizeTo: canvasDivRef.current,
      background: "#F0F0F0",
    });
    canvasDivRef.current.appendChild(pixiApp.canvas);
  }, [pixiApp]);

  // 함수 만들기 (고트)
  const addRect = useCallback(() => {
    const rect = new PixiJs.Graphics().rect(0, 0, 200, 200).fill(0xff0000);
    rect.x = 100;
    rect.y = 200;
    rect.label = "정우진짱";
    pixiApp.stage.addChild(rect);
  }, [pixiApp.stage]);

  const moveRect = useCallback(() => {

    const rectRef = pixiApp.stage.getChildByLabel("정우진짱");

    if (!rectRef) return;
    rectRef.y = rectRef.y + 50;
    rectRef.x += 100;
  }, [pixiApp.stage]);

  useLayoutEffect(() => {
    initPixi();
  }, [initPixi]);

  return (
    <>
      <h2>pixi.js와 함께 심쿵 ♥</h2>
      <div ref={canvasDivRef} style={canvasDivStyle}></div>
      <button onClick={addRect}>사각형딸깍</button>
      <button onClick={moveRect}>움짂딸깍</button>
    </>
  );
};
export default App;
