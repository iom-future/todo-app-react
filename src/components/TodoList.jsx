//the todos being displayed on the screen isn't a state but reflect a state
import { useState,useContext, useEffect } from "react"
import { TodoInfoContext } from "./TodoInfoContext"
import { createPortal } from "react-dom"
function TodoList({addTodo}) {
    let todoState = useContext(TodoInfoContext);
    let [todos,setTodos]=useState([])
    let [completedTodos,setCompletedTodos] =useState([])
    useEffect(()=>{
         if(addTodo){
            setTodos((currentTodo)=>{
            return [...currentTodo,{id:currentTodo.length, title:todoState.title,tags:todoState.tags,priority:todoState.priority,date:todoState.dueDate,isCompleted:todoState.isCompleted}]
        })
        }
    },[addTodo])

    useEffect(() => {
        //if the todos changes an it changes because of a check, put the check goal in the completed state
        setCompletedTodos( 
            todos.filter(todo=>todo.isCompleted===true)//returns an array of elements whose isCompleted property is true
       )

}, [todos]);
//remove the completed todo from todos when added to completed todo


    const checkGoal = (e)=>{
       setTodos(
        todos.map(todo=>todo.id===Number(e.target.id)?{...todo,isCompleted:!todo.isCompleted}:todo)
       )
        // console.log(todos)
        // console.log("checked goal")
    }
  return (
    <section className="mt-5 ">
        <header className="px-5">
            <h2 className= "font-semibold text-center text-2xl">Todos</h2>
            <h5 > <span className="font-medium text-lg text-green-900 ">{todos.length}</span> tasks remaining</h5>
        </header>

        <div className="todo-list-area grid grid-cols-1 gap-2 mt-3">
            {!todos.length>0 ? <h3>No Todo Today</h3>:todos.map((todo)=>(
                <div key={todo.id} className="flex w-[90%] gap-2 border-2 border-l-yellow-200 border-l-3 rounded-xl mx-auto p-2 items-center">
                    <div className="p-2 h-full flex items-center  w-[10%] " >
                        <input type="checkbox" className=" w-full accent-green-600 size-9" onChange={checkGoal} id={todo.id} />
                    </div>
                    
                    <div className="todo-info  bg-white border-l-2 border-[{}] w-[90%] p-2 pl-3 rounded-lg">
                        <h3 className={`font-semibold text-lg mb-2 ${todo.isCompleted?"line-through":""} `}>{todo.title}</h3>
                        <p className="text-sm bg-green-200 p-1 pl-2 inline-block w-1/4 rounded-lg">{todo.tags}</p>
                    </div>
                   
                </div>
                
            ))}
        </div>


        <header className="px-5">
            <h2 className= "font-semibold text-center text-2xl">Completed Todos</h2>
            <h5 > <span className="font-medium text-lg text-green-900 ">{completedTodos.length}</span> tasks completed</h5>
        </header>
         <div className="todo-list-area grid grid-cols-1 gap-2 mt-3">
            {!completedTodos.length>0 ? <h3>No Completed Todo Yet</h3>:completedTodos.map((todo)=>(
                <div key={Math.random()} className="flex w-[90%] gap-2 border-2 border-l-yellow-200 border-l-3 rounded-xl mx-auto p-2 items-center">
                    <div className="p-2 h-full flex items-center  w-[10%] " >
                        <input type="checkbox" className=" w-full accent-green-600 size-9" onChange={checkGoal} id={todo.id} />
                    </div>
                    
                    <div className="todo-info  bg-white border-l-2 border-[{}] w-[90%] p-2 pl-3 rounded-lg">
                        <h3 className={`font-semibold text-lg mb-2 ${todo.isCompleted?"line-through":""} `}>{todo.title}</h3>
                        <p className="text-sm bg-green-200 p-1 pl-2 inline-block w-1/4 rounded-lg">{todo.tags}</p>
                    </div>
                   
                </div>
                
            ))}
        </div>
    </section>
  )
}

export default TodoList