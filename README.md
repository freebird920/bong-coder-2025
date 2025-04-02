# 봉우리코더 2025
  ![alt text](./markdown/poster.png)

- [봉우리코더 2025](#봉우리코더-2025)
  - [React 프로젝트 생성](#react-프로젝트-생성)
  - [Cloudflare로 정적 페이지 배포](#cloudflare로-정적-페이지-배포)


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