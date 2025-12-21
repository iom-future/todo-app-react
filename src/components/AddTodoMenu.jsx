import { useState,useReducer,useEffect } from "react"
import { todoFormReducer } from "../reducers/todoFormReducer";
import TodoInfoProvider from "./TodoInfoContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function AddTodoMenu({todoMenuToggleState,setTodoMenuToggleState,todoState,dispatch,setAddTodo,addTodoState}) {

    function submitTodo(e) {
        e.preventDefault();
        // setTodoInfo((currentTodo)=>{
        //     return {...currentTodo,todoTitle:todoState.title,todoTags:[...todoState.tags],todoDueDate:todoState.dueDate}
        // })
        setTodoMenuToggleState(!todoMenuToggleState);
        setAddTodo(!addTodoState);
        console.log("Todo Added");
    }
  useEffect(()=>{
    // console.log(todoState)
  },[todoState])
  return (
    <div className="fixed w-full h-screen bg-black/50 top-0 flex p-5 justify-center flex-col backdrop-blur-md gap-7">
        <h2 className="text-3xl text-white font-medium text-center " >Add Todo</h2>
        <form action="" onSubmit={submitTodo} className="flex flex-col gap-6">
            <div>
                <label htmlFor="todo-title" className="font-medium text-white text-lg">Title: </label>
                <br />
                <input type="text" placeholder="what would you like to do" id="todo-title" className="w-full p-2 rounded-xl mt-2" onChange={(e)=>{dispatch({type:"SET_TITLE",value:e.target.value})}} required/>
            </div>
            
            <div>
                <label htmlFor="todo-tag" className="font-medium text-white text-lg">Tag: </label><br></br>
                <input type="text" placeholder="tags: e.g health" id="todo-tag" className="w-full p-2 rounded-xl mt-2" onChange={(e)=>{dispatch({type:"SET_TAG",value:e.target.value})}} />
            </div>
           
           <div className="flex gap-2 ">
            <div className="w-1/2">
                <label htmlFor="todo-priority" className="font-medium text-white text-lg">Priority</label><br />
                <select name="priority" id="todo-priority" className="w-full h-3/5 p-2 rounded-xl mt-2"  onChange={(e)=>{dispatch({type:"SET_PRIORITY",value:e.target.value})}}>
                    <option value="none">None</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
                

                 <div className="w-1/2">
                    <label htmlFor="todo-due-date" className="font-medium text-white text-lg">Due Date:</label><br />
                    <input type="date" name="todo-due-date" id="todo-due-date" placeholder="Do before when" className="w-full p-2 h-3/5 rounded-xl mt-2" onChange={(e)=>{dispatch({type:"SET_DATE",value:e.target.value})}} required/>
                </div>
           </div>
             
           
           
           
            <button type="submit" className="w-full p-3  rounded-xl text-xl font-semibold text-white bg-green-500">Add Task</button>
        </form>

    
       
    </div>
  )
}

export default AddTodoMenu