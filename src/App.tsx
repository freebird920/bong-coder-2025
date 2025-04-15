import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as PixiJs from "pixi.js";
const App = () => {
  // useRef()
  const canvasDivRef = useRef<HTMLDivElement>(null);
  const rectsRef = useRef<PixiJs.Graphics[]>([]);
  // useState
  const [, setForceRender] = useState({});
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
    pixiApp.stage.sortableChildren = true;

    canvasDivRef.current.appendChild(pixiApp.canvas);

    const rectOne = new PixiJs.Graphics();
    rectOne.rect(0, 0, 200, 200);
    rectOne.fill(0xff0000);
    rectsRef.current.push(rectOne);
    const rectTwo = new PixiJs.Graphics()
      .rect(200, 200, 200, 200)
      .fill(0x00ff00);
    rectsRef.current.push(rectTwo);

    rectOne.on("pointertap", () => {
      alert("오 눌렸읍니다?!");
    });
    // setRectsRef([...rectsState, ]);

    rectOne.eventMode = "dynamic";
    rectTwo.on("pointertap", () => {
      alert("오 Wkddlspdyd눌렸읍니다?!");
    });
    rectTwo.eventMode = "dynamic";

    pixiApp.stage.addChild(rectOne, rectTwo);
    setForceRender({});
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
  }, [pixiApp]);
  const getSecureRandomNumber = useCallback((max: number) => {
    // 32비트 정수 하나를 저장할 배열 생성
    const array = new Uint32Array(1);
    // 암호학적으로 안전한 난수를 배열에 채운다.
    window.crypto.getRandomValues(array);
    // 0 ~ 2³²-1 (4294967295) 사이의 값을 0~1 사이의 실수로 변환
    const fraction = array[0] / 4294967296; // 4294967296는 2^32
    // 이 실수를 0~100 범위로 조정하여 정수로 변환 (0부터 100까지 포함)
    return Math.floor(fraction * (max + 1));
  }, []);
  const addRect = useCallback(() => {
    const rect = new PixiJs.Graphics()
      .rect(
        getSecureRandomNumber(800),
        getSecureRandomNumber(600),
        getSecureRandomNumber(255),
        getSecureRandomNumber(255)
      )
      .fill(getSecureRandomNumber(0xffffff));
    rect.eventMode = "dynamic";
    rectsRef.current.push(rect);
    setForceRender({});
    pixiApp.stage.addChild(rect);
  }, [pixiApp.stage, getSecureRandomNumber]);
  // useLayoutEffect
  useLayoutEffect(() => {
    initPixi();
  }, [initPixi]);
  // 키보드 이벤트 핸들러 추가: 화살표 키에 따라서 rectOne 이동
  useLayoutEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 사각형이 아직 생성되지 않았다면 무시
      if (rectsRef.current.length === 0) return;
      // 한 번의 키 입력마다 이동할 픽셀 양
      const speed = 10;
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          rectsRef.current[rectIndex].y -= speed;
          break;
        case "ArrowDown":
          event.preventDefault();
          rectsRef.current[rectIndex].y += speed;
          break;
        case "ArrowLeft":
          event.preventDefault();
          rectsRef.current[rectIndex].x -= speed;
          break;
        case "ArrowRight":
          event.preventDefault();
          rectsRef.current[rectIndex].x += speed;
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [rectsRef, rectIndex]);
  return (
    <>
      <h2>Pixi.js 연습하기</h2>
      <div className="w-[800px] h-[600px]" ref={canvasDivRef}></div>
      <section className="select-none">
        <h3>사각형 선택창</h3>
        <form></form>
        <button className="border-2 rounded-md p-2" onClick={addRect}>
          눌리면 사각형 새로 생기는 ㅂㅌ입니다?!
        </button>
        <ul className="space-y-2">
          {rectsRef.current.map((_, index) => {
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
    </>
  );
};
export default App;
