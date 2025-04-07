# [봉우리코더 2025](https://github.com/freebird920/bong-coder-2025)
  ![alt text](./markdown/poster.png)

- [봉우리코더 2025](#봉우리코더-2025)
  - [1차시](#1차시)
    - [React 프로젝트 생성](#react-프로젝트-생성)
    - [Cloudflare로 정적 페이지 배포](#cloudflare로-정적-페이지-배포)
    - [React 프로젝트 구조 뜯어보기](#react-프로젝트-구조-뜯어보기)
    - [index.html](#indexhtml)
    - [main.tsx](#maintsx)
    - [실습 기본 세팅](#실습-기본-세팅)
  - [Pixi.js](#pixijs)
    - [외부 라이브러리](#외부-라이브러리)
    - [Pixi.js란?](#pixijs란)

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
7. 
   ```bash
    ◆  Select a variant:
    │  ○ TypeScript
    │  ● TypeScript + SWC # 이거 선택
   ```
8. [파일]-[폴더열기]로 방금 만든 프로젝트 폴더를 연다.




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



## Pixi.js 

### 외부 라이브러리
- Javascript(또는 Typescript)의 외부 library는 다른 사람이 만든 일종의 코드 묶음과 같은 개념이다. 복잡하거나 자주 쓰는 기능들을 누군가가 잘 만들어 놓았다면 그 코드 또는 기능을 어디선가 받아와서 쓰는 개념이다. 
- 우리가 지금 사용하는 react.js도 일종의 외부 라이브러리이다. react.js와 같이 애플리케이션의 기본적인 뼈대를 만드는 라이브러리를 **프레임워크**라고 부른다.

### Pixi.js란?
- javascript 2D 그래픽 라이브러리.
- html의 `<canvas>`와 바닐라 javascript로 까다롭게 구현해야 하는 그래픽 구현을 편리하게 구현할 수 있도록 도와준다.
- 기본적으로 WebGL을 사용하여 GPU 가속을 활용, 빠르고 효율적인 렌더링을 제공한다.