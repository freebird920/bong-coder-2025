const App = () => {
  const 내이름: string = "무리무리";
  // 내이름 =123'
  let 내나이: number;
  내나이 = 345;
  내나이 = 22;
  function 내나이불러줘(){
    console.log(내나이)
  }
  return (
    <>
      <h1>{내이름}</h1>
      <h2>내나이: {내나이}</h2>
      <button onClick={내나이불러줘}>눌리면 나이 말해주는 버튼</button>
    </>
  );
};
export default App;
