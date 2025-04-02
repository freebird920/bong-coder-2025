# 봉우리코더 2025
  ![alt text](./markdown/poster.png)

- [봉우리코더 2025](#봉우리코더-2025)
  - [React 프로젝트 생성](#react-프로젝트-생성)
  - [Cloudflare로 정적 페이지 배포](#cloudflare로-정적-페이지-배포)
  - [React 프로젝트 구조 뜯어보기](#react-프로젝트-구조-뜯어보기)
  - [index.html](#indexhtml)


## React 프로젝트 생성

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


## Cloudflare로 정적 페이지 배포
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

## React 프로젝트 구조 뜯어보기
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

## index.html 
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