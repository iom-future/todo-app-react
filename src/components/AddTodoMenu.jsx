import { useState,useReducer,useEffect } from "react"
import { todoFormReducer } from "../reducers/todoFormReducer";
import TodoInfoProvider from "./TodoInfoContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function AddTodoMenu({todoMenuToggleState,setTodoMenuToggleState,todoState,dispatch,setAddTodo,addTodoState,addBtn}) {

    function submitTodo(e) {
        e.preventDefault();
  

        //close form after adding the todo
        setTodoMenuToggleState(!todoMenuToggleState);

        //send a message that the form has been submitted; a todo has een added
        setAddTodo(!addTodoState);

        //rotate the btn used for adding goal, back to original position[when a goal get added]
        addBtn.current.classList.add("rotate-45");
        console.log("Todo Added");
    }
  useEffect(()=>{
    // console.log(todoState)
  },[todoState])
  return (
    <div className="fixed z-[50] items-center justify-center w-full h-screen bg-black/50 top-0 flex p-5 backdrop-blur-md ">
        <div className="justify-center w-[90%] max-w-[700px] h-[90%] flex flex-col gap-7 bg-white p-5 mx-auto rounded-lg">
        <h2 className="text-3xl  font-medium text-center text-green-500 " >Add Todo</h2>
        <form action="" onSubmit={submitTodo} className="flex flex-col gap-6">
            <div>
                <label htmlFor="todo-title" className="font-medium text-lg">Title: </label>
                <br />
                <input type="text" placeholder="what would you like to do" id="todo-title" className="w-full p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2 bg-gray-200" onChange={(e)=>{dispatch({type:"SET_TITLE",value:e.target.value})}} required/>
            </div>
            
            <div>
                <label htmlFor="todo-tag" className="font-medium text-lg">Tag: </label><br></br>
                <input type="text" placeholder="tags: e.g health" id="todo-tag" className="w-full p-2 rounded-xl mt-2 bg-gray-200  focus:outline-none focus:ring-2 focus:ring-green-500" onChange={(e)=>{dispatch({type:"SET_TAG",value:e.target.value})}} />
            </div>
           
           <div className="flex gap-2 ">
            <div className="w-1/2">
                <label htmlFor="todo-priority" className="font-medium  text-lg">Priority</label><br />
                <select name="priority" id="todo-priority" className="w-full h-3/5 p-2  focus:outline-none focus:ring-2 focus:ring-green-500  bg-gray-200 rounded-xl mt-2"  onChange={(e)=>{dispatch({type:"SET_PRIORITY",value:e.target.value})}}>
                    <option value="none">None</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
                

                 <div className="w-1/2">
                    <label htmlFor="todo-due-date" className="font-medium  text-lg">Due Date:</label><br />
                    <input type="date" name="todo-due-date" id="todo-due-date" placeholder="Do before when" className="w-full p-2 h-3/5 rounded-xl bg-gray-200 mt-2  focus:outline-none focus:ring-2 focus:ring-green-500" onChange={(e)=>{dispatch({type:"SET_DATE",value:e.target.value})}} required/>
                </div>
           </div>
             
           
           
           
            <button type="submit" className="w-full p-3 hover:border-b-2 border-green-700 rounded-xl text-xl font-semibold text-white bg-green-500">Add Task</button>
        </form>

        </div>

    
       
    </div>
  )
}

export default AddTodoMenu