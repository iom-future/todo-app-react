//the todos being displayed on the screen isn't a state but reflect a state
import { useState } from "react"
import { createPortal } from "react-dom"
function TodoList() {
    const addTodo = ()=>{
        
    }
    let [todos,setTodos]=useState([{id:1,title:"sleep"}])
  return (
    <section className="mt-5 ">
        <header>
            <h2 className= "font-semibold text-center text-2xl">Todos</h2>
        </header>

        <div className="todo-list-area grid grid-cols-1 mt-3">
            {todos.map((todo)=>(
                <div key={todo.id} className="flex w-[90%] gap-3 border  bg-white  rounded-xl mx-auto p-2 items-center">
                    <input type="checkbox" />
                    <div className="todo-info">
                        
                        <h3 className="font-semibold text-lg">{todo.title}</h3>
                    </div>
                   
                </div>
                
            ))}
        </div>
        <button onClick={addTodo}></button>
    </section>
  )
}

export default TodoList