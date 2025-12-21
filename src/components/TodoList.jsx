//the todos being displayed on the screen isn't a state but reflect a state
import { useState,useContext, useEffect } from "react"
import { TodoInfoContext } from "./TodoInfoContext"
import UpdateTodoForm from './UpdateTodoForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
function TodoList({addTodo}) {
    //consume from TodoInfoContext to update the form state after goal is being added
    let {todoState,dispatch} = useContext(TodoInfoContext);
    //for toggling the form that helps update todos
    let [updateTodoFormToggle,setUpdateTodoFormToggle]= useState(false)
    let [todos,setTodos]=useState(()=>{
        //retrieve saved todo
        let savedTodos = localStorage.getItem("todos");
        //set saved data as the current todo,if there is any, else set an empty string
        return  savedTodos? JSON.parse(savedTodos):[];
    })
    let [completedTodos,setCompletedTodos] =useState([]);

    //save selected todo for editing
    let [selectedTodo,setSelectedTodo]=useState([])


    useEffect(()=>{

       //if the 
         if(addTodo){
            setTodos((currentTodo)=>{
                //currentTodo.at(-1): used to get the last index of an array
               /*  currentTodo.at(-1).id+1: makes sure that each ID is gotten from the increment of the last ID,
               in order to avoid duplicate ID if one element is removed(thats if we were using the array length)
               */
            return [...currentTodo,{id:currentTodo.length>0?currentTodo.at(-1).id+1:currentTodo.length, title:todoState.title,tags:todoState.tags,priority:todoState.priority,date:todoState.dueDate,isCompleted:todoState.isCompleted}]
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

    //spring up update form
    const editTodo= (e)=>{
        //bring up the menu
        setUpdateTodoFormToggle(!updateTodoFormToggle);

        //get the todo user wants to  edit
        setSelectedTodo(todos.find((todo) => todo.id === Number(e.target.id)))
        console.log("todo has been selected",e.target.id)
    }


    const checkGoal = (e)=>{
        //when a goal is checked pick the goal and change is isCompleted to true
       setTodos(
        todos.map(todo=>todo.id===Number(e.target.id)?{...todo,isCompleted:!todo.isCompleted}:todo)
       )
        // console.log(todos)
        // console.log("checked goal")
    }

    useEffect(()=>{
        console.log(`the selected to from the useEffect is: ${selectedTodo}`)
    },[selectedTodo])

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
                                <FontAwesomeIcon icon={faPen} size="xs" onClick={editTodo} id={todo.id} />
                               
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
       
       <section className="update-form">
            {updateTodoFormToggle && <UpdateTodoForm todoToEdit={selectedTodo}/>}
       </section>
    </section>
  )
}

export default TodoList