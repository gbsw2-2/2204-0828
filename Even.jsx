import { useEffect } from "react";

function Even() {
  useEffect(() => {
    return () => {
      console.log("Even 컴포언트 엄마운트");
    };
  },[]);

  return <div>현재 카운트는 짝수입니다.</div>
}

export default Even;