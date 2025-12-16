//the todos being displayed on the screen isn't a state but reflect a state
import { useState,useContext, useEffect } from "react"
import { TodoInfoContext } from "./TodoInfoContext"
import { createPortal } from "react-dom"
function TodoList({addTodo}) {
    let todoState = useContext(TodoInfoContext);
    let [todos,setTodos]=useState([])
      console.log(`add todo: ${addTodo}`);
     
    useEffect(()=>{
         if(addTodo){
            setTodos((currentTodo)=>{
            return [...currentTodo,{id:currentTodo.length, title:todoState.title,tags:[...todoState.tags],priority:todoState.priority,date:todoState.dueDate}]
        })
        }
        console.log("prop todoState changed")
        console.log(todoState);
    },[addTodo])
    console.log(todos)
  return (
    <section className="mt-5 ">
        <header>
            <h2 className= "font-semibold text-center text-2xl">Todos</h2>
        </header>

        <div className="todo-list-area grid grid-cols-1 gap-2 mt-3">
            {!todos.length>0 ? <h3>No Todo Today</h3>:todos.map((todo)=>(
                <div key={todo.id} className="flex w-[90%] gap-3 border   rounded-xl mx-auto p-2 items-center">
                    <input type="checkbox" className=" bg-white p-2 h-full" id={todo.id} />
                    <div className="todo-info  bg-white border-l-2 border-[{}] w-[90%] p-2">
                        <h3 className="font-semibold text-lg ">{todo.title}</h3>
                        <p className="text-sm bg-green-200 p-1 inline-block w-1/4 rounded-lg">{todo.tags[0]}</p>
                    </div>
                   
                </div>
                
            ))}
        </div>
    </section>
  )
}

export default TodoList