//the todos being displayed on the screen isn't a state but reflect a state
import { useState,useContext, useEffect } from "react"
import { TodoInfoContext } from "./TodoInfoContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
function TodoList({addTodo}) {
    let {todoState,dispatch} = useContext(TodoInfoContext);
    let [todos,setTodos]=useState(()=>{
        //retrieve saved todo
        let savedTodos = localStorage.getItem("todos");
        //set saved data as the current todo,if there is any, else set an empty string
        return  savedTodos? JSON.parse(savedTodos):[];
    })
    let [completedTodos,setCompletedTodos] =useState([]);



    useEffect(()=>{
         if(addTodo){
            setTodos((currentTodo)=>{
            return [...currentTodo,{id:currentTodo.length, title:todoState.title,tags:todoState.tags,priority:todoState.priority,date:todoState.dueDate,isCompleted:todoState.isCompleted}]
        })
        //anytime a goal is added reset the form todo state
        dispatch({type:"RESET"})
                }
        console.log(todos)
    },[addTodo])

    useEffect(() => {
        //check if the todos array has tasks that are completed
        let hasCompleted = todos.some((todo)=>todo.isCompleted===true);

        //get the task that was completed
        let completedTodo = todos.filter((todo)=> todo.isCompleted===true)//returns an array of elements whose isCompleted property is true
        
        //if the todos changes an it changes because of a check, put the check goal in the completed state
            setCompletedTodos( 
                (currentCompletedTodo)=>{
                    //put the previously completed todos, and the new one; this helps to maintain the previous completed, incase no new completed, after rerender(cased by removing all the completed task from the todos) 
                    return [...currentCompletedTodo,...completedTodo]
                }
       )
      
    

       //remove all the completed tasks from the todos, if there is any, and return an array of in-completed ones
       if(hasCompleted){
            setTodos(todos.filter(todo=>todo.isCompleted!==true))
       }
       
       //anytime changes happen to the todos, saved that changes automatically
       localStorage.setItem("todos",JSON.stringify(todos))
}, [todos]);
//remove the completed todo from todos when added to completed todo


    const checkGoal = (e)=>{
        //when a goal is checked pick the goal and change is isCompleted to true
       setTodos(
        todos.map(todo=>todo.id===Number(e.target.id)?{...todo,isCompleted:!todo.isCompleted}:todo)
       )
        // console.log(todos)
        // console.log("checked goal")
    }

    //priority class mapping
    const priorityBorderColor ={
        none:"border-l-gray-300",
        low: "border-l-green-300",
        medium:"border-l-yellow-300",
        high:"border-l-red-300"
    }
  return (
    <section className="mt-5 flex flex-col md:flex-row gap-5 md:justify-between">

        <div className="todo-container md:p-3">
            <header className="px-5">
                <h2 className= "font-semibold text-center text-2xl md:mb-2">Todos</h2>
                <h5 > <span className="font-medium text-lg text-green-900 p-1 bg-green-100 rounded-full  ">{todos.length}</span></h5>
            </header>

            <div className="todo-list-area grid grid-cols-1 gap-2 mt-3">
                {!todos.length>0 ? <h3 className="text-lg font-semibold text-center text-gray-400 ">All Task Completed</h3>:todos.map((todo)=>(
                    <div key={todo.id} className={`flex w-[90%] gap-2 border-2  ${priorityBorderColor[todo.priority]} rounded-xl mx-auto p-2 items-center`}>
                        <div className="p-2 h-full flex items-center  w-[10%] " >
                            <input type="checkbox" className=" w-full accent-green-600 size-9" onChange={checkGoal} id={todo.id} />
                        </div>
                        
                        <div className="todo-info  bg-white border-l-2  w-[90%] p-2 pl-3 rounded-lg">
                           <div className="flex justify-between items-center">
                             <h3 className={`font-semibold text-lg mb-2 ${todo.isCompleted?"line-through":""} `}>{todo.title}</h3>
                                <FontAwesomeIcon icon={faPen} size="xs" />
                               
                           </div>
                           
                            <p className="text-sm bg-green-200 p-1 pl-2 inline-block w-1/4 rounded-lg">{todo.tags}</p>
                        </div>
                    
                    </div>
                    
                ))}
            </div>

        </div>
        
        <div className="completed-todo-container md:p-3">
            <header className="px-5">
                <h2 className= "font-semibold text-center text-2xl md:mb-2">Completed Todos</h2>
                <h5 > <span className="font-medium text-lg text-green-900 p-1 bg-green-100 rounded-full ">{completedTodos.length}</span></h5>
            </header>
         <div className="todo-list-area grid grid-cols-1 gap-2 mt-3">
            {!completedTodos.length>0 ? <h3 className="text-lg font-semibold text-center text-gray-400 " >No Completed Todo Yet</h3>:completedTodos.map((todo)=>(
                <div key={todo.id} className="flex w-[90%] gap-2 border-2 border-l-green-200 border-l-3 rounded-xl mx-auto p-2 items-center">
                    <div className="p-2 h-full flex items-center  w-[10%] " >
                        <input type="checkbox" className=" w-full accent-green-600 size-9"  id={todo.id} defaultChecked />
                    </div>
                    
                    <div className="todo-info  bg-white border-l-2 border-[{}] w-[90%] p-2 pl-3 rounded-lg">
                        <h3 className={`font-semibold text-lg mb-2 ${todo.isCompleted?"line-through":""} `}>{todo.title}</h3>
                        <p className="text-sm bg-green-200 p-1 pl-2 inline-block w-1/4 rounded-lg">{todo.tags}</p>
                    </div>
                   
                </div>
                
            ))}
        </div>

        </div>
       
    </section>
  )
}

export default TodoList