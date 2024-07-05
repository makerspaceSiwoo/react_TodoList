import React, {useRef, useState} from 'react'
import './App.css'
import TodoList from './components/TodoList';

function App() {

  // local storage와 데이터를 주고받을 arr
  const local = useRef([]);


  // local storage 저장 공간 생성
  if(window.localStorage.getItem("todolist") !== null){
    // 이미 있는 경우, json 문자열을 배열로 바꿔서 사용하기
    const arrString = window.localStorage.getItem("todolist");
    local.current = JSON.parse(arrString);
  }else{
    // 없을 경우, 새로운 배열을 todolist라는 이름으로 등록
    const arrString = JSON.stringify(local.current);
    window.localStorage.setItem("todolist", arrString);
  }
  


  return (
   
    <TodoList local={local}/>
   
  )
}

export default App
