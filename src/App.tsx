import {
  useCallback,
  useEffect as useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as PixiJs from "pixi.js";
const App = () => {
  // useRef()
  const canvasDivRef = useRef<HTMLDivElement>(null);
  const [rectsState, setRectsRef] = useState<PixiJs.Graphics[]>([]);

  // useState
  const [rectIndex, setRectIndex] = useState(0);

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
    setRectsRef([...rectsState, rectOne, rectTwo]);
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

    // eslint 삭제(rectsState를 의존성 배열에 넣으라는 메시지를 비활성화)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pixiApp]);
  // useLayoutEffect
  useLayoutEffect(() => {
    initPixi();
  }, [initPixi]);
  // 키보드 이벤트 핸들러 추가: 화살표 키에 따라서 rectOne 이동
  useLayoutEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 사각형이 아직 생성되지 않았다면 무시
      if (rectsState.length === 0) return;

      // 한 번의 키 입력마다 이동할 픽셀 양
      const speed = 10;

      switch (event.key) {
        case "ArrowUp":
          rectsState[rectIndex].y -= speed;
          break;
        case "ArrowDown":
          rectsState[rectIndex].y += speed;
          break;
        case "ArrowLeft":
          rectsState[rectIndex].x -= speed;
          break;
        case "ArrowRight":
          rectsState[rectIndex].x += speed;
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [rectsState, rectIndex]);
  return (
    <>
      <h2>Pixi.js 연습하기</h2>
      <section className="select-none">
        <h3>사각형 선택창</h3>
        <ul className="space-y-2">
          {rectsState.map((_, index) => {
            return (
              <li
                className={`${
                  index === rectIndex ? "font-bold bg-amber-500/20" : ""
                } border-2 rounded-md p-2 text-center`}
                key={`rect-ref-${index}`}
                onClick={() => {
                  setRectIndex(index);
                }}
              >
                {index}
              </li>
            );
          })}
        </ul>
        <div></div>
      </section>
      <div className="w-[800px] h-[600px]" ref={canvasDivRef}></div>
    </>
  );
};
export default App;
