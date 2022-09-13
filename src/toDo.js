import { useState, useEffect } from "react";
// 코드를 언제 실행할 지 선택하는 기능 useEffect
// State 자체를 수정하는 건 불가능하다
function App() {
  const [toDO, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => {
    setToDo(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDO === "") {
      return;
    }
    setToDo("");
    setToDos((currentArray) => [toDO, ...currentArray]);
  };
  console.log(toDos);
  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDO}
          type="text"
          placeholder="Write what to do..."
        ></input>
        <button>Add to do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
