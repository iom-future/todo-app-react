import React, { Component } from 'react'
import { useState,useReducer, useRef  } from 'react'
import Header from './components/Header'
import TodoList from './components/TodoList'
import AddTodoMenu from './components/AddTodoMenu'
import TodoInfoProvider from './components/TodoInfoContext'
import NavBar from "./components/NavBar"
import ThemeProvider from "./components/ThemeContext"
import { todoFormReducer } from './reducers/todoFormReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
function App() {
  let addBtn = useRef(null);
  //for toggling the form to add todos
  let [todoMenuToggle,setTodoMenuToggle] =useState(false)

  let [addTodo,setAddTodo]=useState(false)

 
  //reset the state: if a todo is added, to the original form "false"; no "new" todo added yet
  //without this line the system still thinks a todo is being added, thus not accepting other todos
  if(addTodo){
    setTimeout(()=>{
        setAddTodo(!addTodo)
    },1000)
  }
    // the state should be passed where the Context Provider Component can receive it as a prop as it gives its children
     let initialState = {id:0 ,title:"",tags:"default",priority:"none",dueDate:0,isCompleted:false}
    //used useReducer hook cause im setting multiple state at once
    let [todoState,dispatch]=useReducer(todoFormReducer,initialState);
     let value={
          todoState,
          dispatch

        }
  return (
    <div className={` min-h-screen relative`} >
      <ThemeProvider>

          <NavBar />
          <Header/>
          {todoMenuToggle && <AddTodoMenu todoMenuToggleState={todoMenuToggle} setTodoMenuToggleState={setTodoMenuToggle} todoState={todoState} dispatch={dispatch} setAddTodo={setAddTodo} addTodoState={addTodo} addBtn={addBtn}/>}

          
        
            {/*when passing props and children to a contextAPI component, wherever pass the props there you should pass the children */}
        
          <TodoInfoProvider value={value} >
              <TodoList addTodo={addTodo}/>
          </TodoInfoProvider>

      </ThemeProvider>
      
    
     

     <button className="p-2 bg-green-500 rounded-full size-12 hover:shadow-lg hover:shadow-green-500 fixed z-[50] right-2 bottom-2 transition-all duration-300 ease-in-out hover:-translate-y-2 " onClick={(e)=>{setTodoMenuToggle(!todoMenuToggle);e.currentTarget.classList.toggle("rotate-45")}}><FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} ref={addBtn} /></button>

    {/* <button className="p-2 bg-green-500 rounded-full size-12  fixed z-[50] right-2 bottom-3 transition-all duration-300 ease-in-out hover:-translate-y-2 " onClick={(e)=>{setTodoMenuToggle(!todoMenuToggle);e.currentTarget.classList.toggle("rotate-45")}}><FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} ref={addBtn} /></button> */}
    </div>
  )
}

export default App