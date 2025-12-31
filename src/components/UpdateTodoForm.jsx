import { useState,useReducer,useEffect } from "react"
import { updateTodoFormReducer } from "../reducers/updateTodoFormReducer";
import TodoInfoProvider from "./TodoInfoContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function UpdateTodoForm({todoToEdit,setTodos,todos,setUpdateTodoFormToggle,updateTodoFormToggle,setSelectedTodo}) {
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
            return todos.map((todo)=>todo.id===editedTodoState.id? {...todo,title:editedTodoState.title||todo.title,priority:editedTodoState.priority||todo.priority,tags:editedTodoState.tags||todo.tags,date:editedTodoState.date||todo.date}:todo)
        })
        //remove form
        setUpdateTodoFormToggle(!updateTodoFormToggle)

        //setSelectedTodo({});
           
    }

    useEffect(()=>{
        console.log(todoToEdit)
    
    },[todos])
  return (
    <div className="fixed z-[100] flex items-center justify-center w-full h-screen bg-black/50 top-0 p-5 backdrop-blur-md gap-7">
        <div className="justify-center flex flex-col gap-7 relative w-[90%] h-[90%] max-w-[700px] bg-white p-7 mx-auto rounded-lg">


   
        <FontAwesomeIcon icon={faX} className=" absolute top-5 right-3" onClick={()=>{setUpdateTodoFormToggle(!updateTodoFormToggle)}} />
        <h2 className="text-3xl text-green-500 font-medium text-center " >Edit Todo</h2>
        <form action="" onSubmit={editTodo} className="flex flex-col gap-6">
            <div>
                <label htmlFor="todo-title" className="font-medium  text-md">Title: </label>
                <br />
                <input type="text" placeholder={todoToEdit.title} id="todo-title" className="w-full p-2 rounded-xl bg-gray-200 mt-2  focus:outline-none focus:ring-2 focus:ring-green-500" onChange={(e)=>{dispatch({type:"EDIT_TITLE",value:e.target.value})}} />
            </div>
            
            <div>
                <label htmlFor="todo-tag" className="font-medium  text-md">Tag: </label><br></br>
                <input type="text" placeholder={todoToEdit.tags} id="todo-tag" className="w-full p-2 rounded-xl bg-gray-200 mt-2  focus:outline-none focus:ring-2 focus:ring-green-500" onChange={(e)=>{dispatch({type:"EDIT_TAG",value:e.target.value})}} />
            </div>
           
           <div className="flex gap-2 ">
            <div className="w-1/2">
                <label htmlFor="todo-priority" className="font-medium  text-md">Priority</label><br />
                <select name="priority" id="todo-priority" defaultValue={todoToEdit.priority}  className="w-full h-3/5 p-2 rounded-xl  bg-gray-200 mt-2  focus:outline-none focus:ring-2 focus:ring-green-500"  onChange={(e)=>{dispatch({type:"EDIT_PRIORITY",value:e.target.value})}}>
                    <option value="none">None</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
                

                 <div className="w-1/2">
                    <label htmlFor="todo-due-date" className="font-medium text-md">Due Date:</label><br />
                    <input type="date" name="todo-due-date" id="todo-due-date" placeholder="Do before when" className="w-full p-2 h-3/5 rounded-xl bg-gray-200 mt-2  focus:outline-none focus:ring-2 focus:ring-green-500" defaultValue={todoToEdit.date} onChange={(e)=>{dispatch({type:"EDIT_DATE",value:e.target.value})}} />
                </div>

                {/* TODO: ADD min value to date min={}*/}
           </div>
             
           
           
           
            <button type="submit" className="w-full p-3 hover:border-b-2 border-green-700 rounded-xl text-xl font-semibold text-white bg-green-500">Edit Task</button>
        </form>

         </div>
       
    </div>
  )
}

export default UpdateTodoForm