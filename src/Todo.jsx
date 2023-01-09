import React from 'react'

export default function Todo({ todo, toggletodo }) {
  function handleTodoClick() {
    toggletodo(todo.id)
  }
  return (
    <div className='todoContainer'>
        <label className='todoLabel'>
            <input  type="checkbox" className="todoCheckbox"onChange={handleTodoClick} checked={todo.complete}/>
            <h1 className='todoTaskName'>{todo.name}</h1>
        </label>
        
    </div>
  )
}
