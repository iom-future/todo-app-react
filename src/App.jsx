import React from 'react'
import { useState } from 'react'
import Header from './components/Header'
import TodoList from './components/TodoList'
import AddTodoMenu from './components/AddTodoMenu'
function App() {
  let [todoMenuToggle,setTodoMenuToggle] =useState(false)

  return (
    <div className='bg-gray-200 min-h-screen relative' >
      <Header/>
      <TodoList />
     {todoMenuToggle && <AddTodoMenu todoMenuToggleState={todoMenuToggle} setTodoMenuToggleState={setTodoMenuToggle}  />}
     <button onClick={()=>{setTodoMenuToggle(!todoMenuToggle)}}>Add todo</button>
    </div>
  )
}

export default App