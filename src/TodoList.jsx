import React from 'react'
import Todo from './Todo'

export default function TodoList({todos, toggletodo}) {
  return (
    todos.map(todo => {
        return <Todo key={todo.id} todo={todo} toggletodo={toggletodo} />
    })
  )
}
 