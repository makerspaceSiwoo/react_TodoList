import { useState, useRef} from "react";

const TodoList = ({local}) => {

    const [todos , setTodos] = useState(local.current); // todo list 배열 - local
    const [newTodo, setnewTodo] = useState(""); // 작성자의 입력 값

    // change 이벤트 발생시마다 newTodo에 저장
    const inputChange = (e) => {
        setnewTodo(e.target.value);
    };

    // Add 버튼 클릭시 todos에 추가, local에도 추가
    const Add = () => {
        if(newTodo.trim() !== ""){
            setTodos([...todos, newTodo.trim()]);

            //local storage
            local.current = [...local.current, newTodo.trim()];
            localUpdate();
        }
        setnewTodo(""); // 초기화
    }

    const handleKeyPress = (event) => { // 엔터키 입력시 add
        if (event.key === 'Enter') {
          Add();
        }
      };


    // Delete 버튼 클릭시 필터링하여 다른 인덱스의 것만 남기기, local에도 지우기
    const Delete = (index) => {
        // 매개변수가 있는 함수는 콜백 함수로 불러야 한다. 안 그러면 렌더링이 계속 되어 버린다.
        console.log(todos);
        let newTodos = todos.filter(( _,i) => i !== index);
        // setTodos(todos.filter(( _,i) => i !== index));
        setTodos(newTodos);
        console.log(todos);
        console.log(newTodos); // 시점이??
        // 시점 분석 해보기


        //local 저장
        local.current = newTodos;
        localUpdate();
    }

    const localUpdate = () => {
        // return 전에 업데이트 된 local 배열 Local Stroage에 저장하기
        const arrString = JSON.stringify(local.current);
        window.localStorage.setItem("todolist", arrString);
    }
    

    return (
        <div className="todo-list">
            <h1>To-Do List</h1>
            <input type="text" onChange={(e) => {inputChange(e);}} onKeyDown={handleKeyPress} value={newTodo} placeholder="Add a new task"/>
            <button onClick={Add}>Add</button>
            <ul>
                {todos.map( (todo, index) => (
                    <li key={index}>{todo}
                        <button onClick={() => {Delete(index)}}>Delete</button>
                    </li>
                )
                )}
            </ul>
        </div>
    )
}

export default TodoList;