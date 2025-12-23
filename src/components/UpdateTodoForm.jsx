import { useState,useReducer,useEffect } from "react"
import { updateTodoFormReducer } from "../reducers/updateTodoFormReducer";
import TodoInfoProvider from "./TodoInfoContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function UpdateTodoForm({todoToEdit,setTodos,todos,setUpdateTodoFormToggle,updateTodoFormToggle}) {
     let initialState = todoToEdit;
       //used useReducer hook cause im setting multiple state at once
       let [editedTodoState,dispatch]=useReducer(updateTodoFormReducer,initialState);
    // console.log(todoToEdit)
    //    console.log(` ${editedTodoState}`)
    function editTodo(e) {
        e.preventDefault();
        console.log("update successful")
        console.log(editedTodoState)
        setTodos(()=>{
            return todos.map((todo)=>todo.id===editedTodoState.id? {...todo,title:editedTodoState.title,priority:editedTodoState.priority,tags:editedTodoState.tags,date:editedTodoState.date}:todo)
        })
        //remove form
        setUpdateTodoFormToggle(!updateTodoFormToggle)
           
    }

    useEffect(()=>{
        console.log("this your updated todo")
    
    },[todos])
  return (
    <div className="fixed w-full h-screen bg-black/50 top-0 flex p-5 z-50 justify-center flex-col backdrop-blur-md gap-7">
        <FontAwesomeIcon icon={faX} className="text-white " onClick={()=>setUpdateTodoFormToggle(!updateTodoFormToggle)} />
        <h2 className="text-3xl text-white font-medium text-center " >Edit Todo</h2>
        <form action="" onSubmit={editTodo} className="flex flex-col gap-6">
            <div>
                <label htmlFor="todo-title" className="font-medium text-white text-lg">Title: </label>
                <br />
                <input type="text" placeholder={todoToEdit.title} id="todo-title" className="w-full p-2 rounded-xl mt-2" onChange={(e)=>{dispatch({type:"EDIT_TITLE",value:e.target.value})}} />
            </div>
            
            <div>
                <label htmlFor="todo-tag" className="font-medium text-white text-lg">Tag: </label><br></br>
                <input type="text" placeholder={todoToEdit.tags} id="todo-tag" className="w-full p-2 rounded-xl mt-2" onChange={(e)=>{dispatch({type:"EDIT_TAG",value:e.target.value})}} />
            </div>
           
           <div className="flex gap-2 ">
            <div className="w-1/2">
                <label htmlFor="todo-priority" className="font-medium text-white text-lg">Priority</label><br />
                <select name="priority" id="todo-priority" defaultValue={todoToEdit.priority}  className="w-full h-3/5 p-2 rounded-xl mt-2"  onChange={(e)=>{dispatch({type:"EDIT_PRIORITY",value:e.target.value})}}>
                    <option value="none">None</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
                

                 <div className="w-1/2">
                    <label htmlFor="todo-due-date" className="font-medium text-white text-lg">Due Date:</label><br />
                    <input type="date" name="todo-due-date" id="todo-due-date" placeholder="Do before when" className="w-full p-2 h-3/5 rounded-xl mt-2" defaultValue={todoToEdit.date} onChange={(e)=>{dispatch({type:"EDIT_DATE",value:e.target.value})}} />
                </div>

                {/* TODO: ADD min value to date min={}*/}
           </div>
             
           
           
           
            <button type="submit" className="w-full p-3  rounded-xl text-xl font-semibold text-white bg-green-500">Edit Task</button>
        </form>

    
       
    </div>
  )
}

export default UpdateTodoForm