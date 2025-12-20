import React, { Component } from 'react'
import { useState } from 'react'
import Header from './components/Header'
import TodoList from './components/TodoList'
import AddTodoMenu from './components/AddTodoMenu'
import TodoInfoProvider from './components/TodoInfoContext'
import { todoFormReducer } from './reducers/todoFormReducer'
import { useReducer } from 'react'
function App() {
  let [todoMenuToggle,setTodoMenuToggle] =useState(false)
  let [addTodo,setAddTodo]=useState(false)
  if(addTodo){
    setTimeout(()=>{
        setAddTodo(!addTodo)
    },1000)
  }
    // the state should be passed where the Context Provider Component can receive it as a prop as it gives its children
     let initialState = {id:0 ,title:"",tags:"default",priority:"none",dueDate:0,isCompleted:false}
    //used useReducer hook cause im setting multiple state at once
    let [todoState,dispatch]=useReducer(todoFormReducer,initialState);

  return (
    <div className='bg-[#FAFAF9] min-h-screen relative' >
      <Header/>
      {todoMenuToggle && <AddTodoMenu todoMenuToggleState={todoMenuToggle} setTodoMenuToggleState={setTodoMenuToggle} todoState={todoState} dispatch={dispatch} setAddTodo={setAddTodo} addTodoState={addTodo} />}
     
        {/*when passing props and children to a contextAPI component, wherever pass the props there you should pass the children */}
     <TodoInfoProvider todoState={todoState}>
        <TodoList addTodo={addTodo}/>
     </TodoInfoProvider>
    
     

     <button onClick={()=>{setTodoMenuToggle(!todoMenuToggle)}}>Add todo</button>
    </div>
  )
}

export default App