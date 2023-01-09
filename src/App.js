import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuidv4 from "uuid/dist/v4"
import "./App.css";
const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    let storedTodos;
    if(localStorage.getItem(LOCAL_STORAGE_KEY)) {
       storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    }
    if (storedTodos) {
      setTodos(storedTodos)
    }
  }, [])

  function toggletodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo (e) {
      const name  = todoNameRef.current.value
      if(name === '') return
      setTodos(prevTodos => {
        return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
      })
      todoNameRef.current.value = null

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...todos, {id: uuidv4(), name: name, complete: false}]))
  }
  function handleClearTodos() {
    const newTodos = todos.filter(todo=> !todo.complete) 
    setTodos(newTodos)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...newTodos]))
  }
  return (
    <>
    <div className="appContainer">
      <h1 className='appTitle'>Task List app!</h1>
      <TodoList  todos={todos} toggletodo = {toggletodo} />
      <div className="appBtnsContainer">
          <input ref={todoNameRef} className="appUserInput" placeholder="Type in your task!" type="text" />
          <button className='appAddBtn' onClick={handleAddTodo}>Add Todo</button>
          <button className='appClearBtn' onClick={handleClearTodos}>Clear Complete</button>
      </div>
      <div className='appLeftContainer'>
          <p className='appLeftNum'>{todos.filter(todo => !todo.complete).length}</p> left to do
          </div>
    </div>
    </>
  );
}

export default App;
