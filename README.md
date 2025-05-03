# [봉우리코더 2025](https://github.com/freebird920/bong-coder-2025)

  ![alt text](./markdown/poster.png)
[**예제 보기**(https://bong-coder-2025.pages.dev/)](https://bong-coder-2025.pages.dev/)

- [봉우리코더 2025](#봉우리코더-2025)
  - [1차시](#1차시)
    - [React 프로젝트 생성](#react-프로젝트-생성)
    - [Cloudflare로 정적 페이지 배포](#cloudflare로-정적-페이지-배포)
    - [React 프로젝트 구조 뜯어보기](#react-프로젝트-구조-뜯어보기)
    - [index.html](#indexhtml)
    - [main.tsx](#maintsx)
    - [실습 기본 세팅](#실습-기본-세팅)
  - [외부 라이브러리 활용하기](#외부-라이브러리-활용하기)
    - [외부 라이브러리란?](#외부-라이브러리란)
    - [tailwindcss](#tailwindcss)
      - [설치법](#설치법)
    - [Pixi.js](#pixijs)
      - [Pixi.js란?](#pixijs란)
      - [설치와 세팅](#설치와-세팅)
      - [기본적인 렌더링 하기](#기본적인-렌더링-하기)
      - [사각형 추가하는 함수 만들기](#사각형-추가하는-함수-만들기)
      - [`PixiJs.Application` 클래스를 활용하여 사각형 움직이기](#pixijsapplication-클래스를-활용하여-사각형-움직이기)

## 1차시

### React 프로젝트 생성

1. vscode 실행
2. [파일] - [폴더열기]로 프로젝트 폴더를 연다.
3. <kbd>ctrl</kbd> + <kbd>`</kbd>를 눌려서 터미널을 연다.
4.

    ```bash
      npm create vite@latest
    ```

   를 입력하고 실행한다.
5. `Project name:`에 적절한 프로젝트 명을 입력한다.
6.

    ```bash
    ◇  Select a framework:
    │  ○ Vanilla
    │  ○ Vue
    │  ● React # 이거 선택
    ```

1.

   ```bash
    ◆  Select a variant:
    │  ○ TypeScript
    │  ● TypeScript + SWC # 이거 선택
   ```

1. [파일]-[폴더열기]로 방금 만든 프로젝트 폴더를 연다.

### Cloudflare로 정적 페이지 배포

```bash
https://dash.cloudflare.com/
```

- [Workers & Pages] - [Workers & Pages] 선택
- <kbd>Create</kbd> 버튼 클릭
- <kbd>Pages</kbd> 탭 클릭
- <kbd>Connect to Git</kbd> 버튼 클릭
- Github에 로그인 했으면 <kbd>Add account</kbd>클릭
- [Select a repository]에서 내 프로젝트 클릭
- <kbd>Begin setup</kbd>클릭
- [Framework preset]에서 <kbd>React(Vite)</kbd>선택. 잘 안되는거 같으면 <kbd>Qwik</kbd>선택
- <kbd>Save and Deploy</kbd>
- 기다리면 됨. 근데 처음 하면 상당한 시간 기다려야 제대로 배포되는 듯 함. 아무튼 기다려보세요!

### React 프로젝트 구조 뜯어보기

- ./
  - node_modules
  - public
  - src
    - assets
    - ~~App.css~~ 삭제합니다.
    - **App.tsx** 여기에 애플리케이션 내용 들어갑니다.
    - **index.css** `css`파일입니다. main.tsx에서 import합니다. 지금은 일단 내용 다 비웁니다.
    - **main.tsx** 내 웹애플리케이션에 들어가서 `index.html`이 실행되면 이 코드가 제일 먼저 실행됩니다.
  - **index.html** 내 웹애플리케이션의 가장 상위에서 실행되는 파일입니다. `<meta>`태그 등은 여기에서 수정합니다.
  - package.json

### index.html

**index.html**파일을 열어보면 아래와 같은 코드가 입력되어 있습니다. 대충 살펴보겠습니다.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- `<link rel="icon">` 웹사이트의 아이콘

    ```html
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    ```

- `<title>` 웹 사이트의 타이틀 내 맘대로 바꿔도 됩니다. 멋진 이름을 지어주십쇼.

    ```html
    <!-- Before -->
        <title>Vite + React + TS</title>
    <!-- After -->
        <title>천재들이 다니는 명문 울산중앙중학교에서 제일 가는 리액트 프로그래밍 프로그램(엔트리봇 없음)을 남몰래 수강하는 비밀 프로그래머가 되었습니다.</title>
    ```

### main.tsx

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- `import` 문

  ```tsx
    import { StrictMode } from 'react'
    import { createRoot } from 'react-dom/client'
    import './index.css'
    import App from './App.tsx'
  ```

  - React 라이브러리
  - css
  - React 컴포넌트(`App.tsx`)
  - 등을 불러 오는 구문
- `createRoot()` 함수

  ```tsx
  createRoot(document.getElementById('root')!)
  ```

  - `crateRoot()`는 React 애플리케이션을 DOM(Document Object Model)에 마운트 하기 위한 루트 컨테이너를 새롭게 생성하는 함수
  - 쉽게 말해서 React로 만든거 렌더링할 컨테이너 설정하는 거라고 보면 됨
  - 그럼 그 `root`는 어디에? 아까 봤던 `index.html`의 `<body>`태그 안에 `<div id="root"></div>` 여기에 있음!!

    ```html
      <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
      </body>
    ```

  - `document.getElementById('root')` 이게 바로 `id`가 `root`인 요소란 뜻임.
  - 해석하면 React 애플리케이션 만들어 넣을 박스 지정할건데 이 박스는 `id`가 `root`인 html 요소로 할거다! 라는 뜻
  - `.render()`함수는 createRoot로 만들어지는 객체에 내장된 함수로 안에 들어 있는 ReactComponent를 렌더링 하는 함수임.

    ```tsx
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    ```

- 정리하면 `main.tsx`는
  - `import`문을 통해 필요한 외부 파일을 불러오고
  - `createRoot()`로 리액트 요소를 렌더링할 `root`컨테이너를 만들고 이 `root`에 내장된 `render()`함수로 렌더링할 리액트 컴포넌트를 지정해줌.

### 실습 기본 세팅

- `App.css` 파일 삭제
- `index.css` 파일은 두고 안에 내용만 싹 다 지워
- `App.tsx`는 아래와 같이 씀

  ```tsx
  const App = ()=>{
    return (
      <></>
    )
  }
  ```

## 외부 라이브러리 활용하기

### 외부 라이브러리란?

- Javascript(또는 Typescript)의 외부 library는 다른 사람이 만든 일종의 코드 묶음과 같은 개념이다. 복잡하거나 자주 쓰는 기능들을 누군가가 잘 만들어 놓았다면 그 코드 또는 기능을 어디선가 받아와서 쓰는 개념이다.
- 우리가 지금 사용하는 react.js도 일종의 외부 라이브러리이다. react.js와 같이 애플리케이션의 기본적인 뼈대를 만드는 라이브러리를 **프레임워크**라고 부른다.

### tailwindcss

- tailwindcss는 css 유틸리티클래스로 직접 css나 html 태그의 `style` 속성을 건드리는 대신 `tailwindcss`가 미리 정의 해둔 html 태그의 `class`(typescript는 `classname`)를 이용해 스타일을 편집할 수 있도록 하는 css 유틸리티 클래스 라이브러리
- css `style`과 tailwindcss `class` 사용법 비교
  - style

    ```tsx
    const App = ()=>{
      return (
        <div style={{color: "red"}}>스타일<div/>
      )
    }
    export default App;
    ```

  - tailwind

    ```tsx
    const App = ()=>{
      return (
        <div className="text-red-500">스타일<div/>
      )
    }
    export default App;
    ```

#### 설치법

- terminal에 아래 문구 입력하여 설치

  ```bash
  npm install tailwindcss @tailwindcss/vite
  ```

- `./vite.config.ts` 파일의 내용을 아래 내용으로 변경

  ```bash
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react-swc";
  import tailwindcss from "@tailwindcss/vite";

  // https://vite.dev/config/
  export default defineConfig({
    plugins: [react(), tailwindcss()],
  });
  ```

- `./src/index.css` 가장 윗 줄에 아래 문구 추가

  ```css
  @import "tailwindcss";
  ```

### Pixi.js

#### Pixi.js란?

- javascript 2D 그래픽 라이브러리.
- html의 `<canvas>`와 바닐라 javascript로 까다롭게 구현해야 하는 그래픽 구현을 편리하게 구현할 수 있도록 도와준다.
- 기본적으로 WebGL을 사용하여 GPU 가속을 활용, 빠르고 효율적인 렌더링을 제공한다.

#### 설치와 세팅

- 설치 스크립트

  ```bash
  npm install pixi.js
  ```

- `./src/main.tsx`에서 `StrictMode` 끄기
  React.js의 `StrictMode`는 `useEffect` 훅과 같이 sideeffect가 발생할 수 있는 메서드를 두 번 호출하기 때문에 여기에서는 끄고 사용한다.
  <kbd>ctrl</kbd> + <kbd>/</kbd>를 이용해서 아래와 같이 `StrictMode`와 관련된 부분은 주석처리 한다. (지워도 됨)

  ```jsx
  // ./src/main.tsx

  // import { StrictMode } from "react";
  import { createRoot } from "react-dom/client";
  import "./index.css";
  import App from "./App.tsx";

  createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <App />
    // </StrictMode>,
  );
  ```

#### 기본적인 렌더링 하기

- `./src/App.tsx` 뼈대 만들기

  ```jsx
  // ./src/App.tsx
  import {useRef} from "react";
  const App = ()=>{
    const canvasDivRef = useRef<HTMLDivElement>(null);
    return (
      <>
        <div ref={canvasDivRef}></div>
      </>
      )
  }
  export default App;
  ```

  - `useRef` 훅을 이용해서 `canvasDivRef`라는 이름의 `<div>` ref를 만든다.
  - `<div ref={canvasDivRef}></div>`와 같이 참조할 `<div>` 태그에 `ref={canvasDivRef}` 위에서 만든 `useRef` 이름을 붙여준다.

- `useMemo` 훅 활용하기

  ```jsx
  // ./src/App.tsx
  import {useRef, useMemo} from "react";
  import * as PixiJs from "pixi.js";

  const App = ()=>{
    const canvasDivRef = useRef<HTMLDivElement>(null);
    // pixiJs의 Application 객체를 메모이제이션 한다.
    const pixiApp = useMemo(() => new PixiJs.Application(), []);
    // useMemo를 사용하여 canvasDiv의 style을 메모이제이션한다.
    const canvasDivStyle = useMemo<CSSProperties>(() => {
      return { width: 800, height: 600 };
    }, []);
    return (
      <>
        <div ref={canvasDivRef} style={canvasDivStyle}></div>
      </>
      )
  }
  export default App;
  ```

  - React는 컴포넌트가 리렌더링 될 때마다(그러니까 화면이 업데이트 될 때 마다) 컴포넌트 함수(여기서는 `App()`)를 매 번 실행함.
  - 그래서 `App()` 안에 있는 모든 함수도 매 렌더링 마다 실행됨.
  - `useMemo`는 React에서 제공하는 훅 중 하나로, 비싼 계산을 캐싱(메모이제이션)하여 성능 최적화를 도와주는 역할을 합니다. 컴포넌트가 렌더링될 때마다 반복되는 복잡한 연산을 매번 실행하는 대신, 의존성 배열에 명시된 값들이 변경되지 않으면 이전에 계산된 결과를 재사용합니다.
  - 그냥 대충 `useMemo`안에 있으면 리렌더링 되더라도 이전 값 기억한다는 뜻.
  - 여기에서는 컴포넌트가 리렌더링될 때마다 Pixi.js Application 인스턴스가 재생성되는 것을 방지하기 위해서 사용됨.

- `useCallback()` 훅으로 canvas 초기화 함수 만들기

  ```jsx
  const initPixi = useCallback(
    // useCallback에 저장하여 싱행할 함수
    async ()=>{ // async를 써서 비동기 함수로 만든다.

      // 1. canvasDivRef.current에 대한 null 체크
      if (!canvasDivRef.current) return; // canvasDivRef.current는 null일 수도 있으므로, null이 아님을 확실하게 체크하기 위한 if문을 작성한다. null 일 경우 함수 바로 종료함

      // 2. pixiApp.init()
      // pixiApp을 초기화 하는 함수
      // 함수의 파라미터로 초기화 옵션 객체를 넣는다.
      await pixiApp.init( // await를 사용해서 비동기 함수의 동작이 끝나면 다음줄을 실행하도록 한다.
        // 초기화 옵션 객체 
        {
          resizeTo: canvasDivRef.current, // canvasDivRef 사이즈로 사이즈 지정한다는 뜻.
          background: "#F0F0F0", // 희끄무리한 회색으로 배경 색깔 지정한다는 뜻
        }
        // 초기화 옵션 객체 끝
      ); // await pixiApp.init() 끝.

      // 3. canvasDivRef 안에 canvas 삽입하기 
      canvasDivRef.current.appendChild(pixiApp.canvas);
      // canvasDivRef.current <= return()에 있는 <div ref={canvasDivRef}>
      // .appendChild(pixiApp.canvas)는
      // <div ref={canvasDivRef}>pixiApp.canvas</div> 이렇게 만든다는 뜻.

    }, 
    // useCallback의 의존성 배열 부분
    [pixiApp] // pixiApp 이라는 값이 변경되면 이 함수는 다시 만들어짐
    )
  ```

  - `useCallback()`은  `useMemo()`와 비슷한 개념이다. `App()` 함수가 실행되어 렌더링 될 때마다 `App()` 안에 있는 함수도 새롭게 생성되는데, `useCallback()`은 이러한 불필요한 생성을 막는 훅이다.

- useLayoutEffect 사용하기
  - useLayoutEffect의 콜백 함수는 React가 DOM 업데이트를 마친 직후, 브라우저가 화면을 갱신하기 전에 실행된다.(즉 화면 띄우고 처리함) **useEffct**는 일단 화면 한 번 띄우고 처리한다는 차이가 있음.
  -

    ```tsx
    // useLayoutEffect
    useLayoutEffect(() => {
      initPixi();
    }, [initPixi]);
    ```

#### 사각형 추가하는 함수 만들기

- `useCallback` 훅 활용하여 `addRect()`함수 만들기
- `pixi.Js.Graphics` 클래스 사용법

  ```tsx
  // 만들 rect를 설정하는 변수
  const width:number = 100;
  const height:number = 100;
  const color:number = 0xff0000; // 빨간색 

  // pixi.Js.Graphics 클래스 생성
  const rect = new PixiJs.Graphics()
    .rect(0, 0, width, height) // 사각형을 만드는 메서드 rect(x, y, width, height)
    .fill(color); // 색칠하는 메서드 fill(color<number>)
  
  // 좌표 설정
  rect.x = 100; // rect의 x 좌표
  rect.y = 100; // rect의 y 좌표

  // label 추가
  rect.label = "myRect"; // rect를 식별할 수 있는 label 추가 

  // stage에 만든 객체 추가.
  pixiApp.stage.addChild(rect);
  ```

- **연습문제** `useCallback()` 훅을 사용하여 사각형을 만드는 **(가)** <u>addRect() 함수를 완성하시오</u> **(나)** <u>addRect() 함수를 실행하는 버튼을 만드시오.</u>
- **심화문제** *연습문제*에서 완성한 함수와 `useState()` 훅을 응용하여 `rectIndex` state(number 타입 state, 초기값을 0으로 설정)를 만들고 label을 현재 `rectIndex`로 설정한 다음 rectIndex를 1 증가 시키는 `addRect()` 함수를 완성하시오.

#### `PixiJs.Application` 클래스를 활용하여 사각형 움직이기

- 위 연습문제에서 만든 사각형을 움직여 보겠다.
- `pixiApp.stage.getChildByLabel()`을 활용하여 사각형 참조 얻기.

  ```tsx
  const rectRef = pixiApp.stage.getChildByLabel("라벨이름"); // rectRef에 "라벨이름"이라는 라벨을 가진 사각형의 참조를 저장한다.
  ```

- `rectRef` 참조를 이용해 좌표 변경하기

  ```tsx
  const rate:number = 10 // 한 번에 움직일 픽셀 정의 
  const rectRef = pixiApp.stage.getChildByLabel("라벨이름"); 
  
  // 좌표 이동
  rectRef.x = rectRef.x + rate;
  rectRef.y += rate; // 왼쪽에 있는 변수 값에 오른쪽에 있는 값을 더한 다음에 왼쪽 변수에 저장한다는 뜻, 즉 위와 동일한 의미이다.  
  ```

- **연습문제** `useCallback()` 훅을 이용하여 아래 조건에 따라 `moveRect(label:string, x:number, y:number)` 함수를 완성하시오.
  - *조건1.* 함수의 **파라미터**는 `label:string`, `x:number`, `y:number`로 *label*은 이동시킬 사각형의 label, *x*는 x축으로 이동할 픽셀 수, *y*는 y축으로 이동할 픽셀 수를 의미한다.
  - *조건2.* `pixiApp.stage.getChildByLabel(label)`에서 label을 찾지 못할 경우 null 또는 undefine,false 값을 반환한다. 이 경우 `console.log()`로 오류 메시지를 콘솔 창에 띄우고, 함수를 즉시 `return`하는 로직을 추가하시오.
- **심화문제** `pixiApp.stage.children`은 stage에 있는 child를 담고 있는 배열이다. *연습문제*에서 만든 `moveRect()` 함수와 `Array.forEach()`구문을 활용하여 `console.log()`로 각 child의 label을 콘솔에 출력한 다음, *x축*으로 `10px`씩 이동 시키시오.
