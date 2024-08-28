import { useRef, useEffect, useState } from "react";
import Viewer from "./components/Viewer";
import Controller from "./components/Controller"
import Even from "./components/Even";
import "./App.css"

const App = () => {
  // 상태 만들기 useState
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  //레퍼런스 변수
  const didMountRef = useRef(false);

  const handleSetCount = (value) => {
    setCount(count + value)
  }

  const handleSetText = (e) => {
    setText(e.target.value);
  }
  
  // 컴포넌트 생애주기 중 업데이트가 발생하는 3가지 조건중 상태변수가 변경될 때
  // 상태변수 count text  스테이스 값이 변경될 때 컴포넌트 업데이트 발생
  // 이때useEffect를 이용해서 콜백함수 실행 -> 현재는 콜백함수가 콘솔에 출력하기
  useEffect(() => {
    console.log(`상태 업데이트 : ${count} ${text}`);
  }, [count, text]) // 의존성 배열 (여러개 가능)

  //==============================================================================================================

  // 의존성 배열이 존재하지 않을 시에는 라이프 사이클 중 업데이트에 해당하는 이벤트가 발생하면 실행됨 (스테이트 업데이트 프랍스 업데이트 부로 컴포넌트 리렌더링)
  useEffect(() => {
    console.log('컴포넌트 마운트');
  },[])

  //==============================================================================================================

  //컴포넌트가 마운트될떄 didMountRef가 false이면 콘솔에 출력하지 않음
  //컴포넌트가 업데이트 될떄 didMountRef가 true면 콘솔에 출력

  //==============================================================================================================

  // 주석 요약
  // 1.컴포넌트 생애주기 에서 업데이트에 포함되는 3가지의 경우 useEffect 안에 있는 함수가 작동한다.
  // 2.위 경우는 의존성 배열인 스테이트가 업데이트 되는 경우 작동하며, 의존성 배열이 존재하지 않을 경우 모든 렌더링 상황에서 작동한다.
  // 2-1.하지만 의존성 배열을 아예적지 않는게 아닌, 빈배열을 넘길 경우 마운트 될시에만 작동하며 그뒤로는 작동하지 않는다.
  // 3.useRef으로 만든 변수는 레퍼런스 변수라고 부르며 특정 상황에서 사용할 수있다.

  useEffect(() => {
    if(!didMountRef.current){
      didMountRef.current = true;
      return;
    } else {
      console.log('컴포넌트 업데이트');
    }
  })

  //==============================================================================================================

  // 마운트 상황에서 한번 불리고 setInterval 로인해 업데이트(제렌더링)상황이 되어서 다시 작동한다. 그로 인해 이것은 무한반복 된다.
  // 
  useEffect(() => {
    const intervalID = setInterval(() => {
      console.log("1초 지남");
    }, 1000);
    return () => {
      console.log("클린업");
      clearInterval(intervalID);
    };
  });


  return (
    <div className="counter-container">
      <h1>Simple Counter</h1>
      <section>
        <input type="text" value={text} onChange={handleSetText} className="count-input"></input>
      </section>
      <section>
        {/* props : 부모컴포넌트에서 자식컴포넌트에게 보내주는 데이터*/}
          <Viewer count={count}/>
          {count % 2 === 0 && <Even />}
      </section>
      <section>
        { /* props " 부모컴포넌트에서 자식컴포넘트에서 보내주는 함수*/}
        <Controller handleSetCount={handleSetCount}/>
      </section>
    </div>
  );
}

export default App;
