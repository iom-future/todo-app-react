//the todos being displayed on the screen isn't a state but reflect a state
import { useState,useContext, useEffect } from "react"
import { TodoInfoContext } from "./TodoInfoContext"
import UpdateTodoForm from './UpdateTodoForm'
import {ThemeContext} from "./ThemeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen,faClock,faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
function TodoList({addTodo}) {
    //consume from TodoInfoContext to update the form state after goal is being added
    let {todoState,dispatch} = useContext(TodoInfoContext);

    let {userTheme} =  useContext(ThemeContext)
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
    let [selectedTodo,setSelectedTodo]=useState({}) //make it an object


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

    
    const editTodo= (e)=>{

        //get the todo user wants to edit
        setSelectedTodo(todos.find((todo) => todo.id === Number(e.target.id)))


        //spring up update form
        setUpdateTodoFormToggle(!updateTodoFormToggle);

        console.log("todo has been selected",e.target.id)
      
        
    }

    // useEffect(()=>{
    //         console.log(selectedTodo)
    // },[selectedTodo])

    const checkTodo = (e)=>{
        //when a goal is checked pick the goal and change is isCompleted to true
       setTodos(
            todos.map(todo=>todo.id===Number(e.target.id)?{...todo,isCompleted:!todo.isCompleted}:todo)
       )
        // console.log(todos)
        // console.log("checked goal")
    }
    const reverseCheckedTodo = (e)=>{
        //get the unchecked todo
        let uncheckedTodo = completedTodos.find((completedTodo)=>completedTodo.id===Number(e.target.id))
        //change the state of the unChecked todo to not being completed
        uncheckedTodo.isCompleted = false;
        // remove the unchecked todo from the completed todo 
         setCompletedTodos((currentCompletedTodo)=>{
            return currentCompletedTodo.filter(completedTodo => completedTodo.id!==Number(e.target.id))
         }
       )

       //add it back to the [current] to array
        setTodos(
            (currentTodo)=>{
                return [...currentTodo,uncheckedTodo];
            }
       )
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


    //date converter
    const dateConverter=(date)=>{
       const months = { "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", 10: "Oct", 11: "Nov", 12: "Dec" };

       let dateArr = date.split("-"); //["year","month","day"]
       return `${dateArr[2]}, ${months[dateArr[1]]}`
    }

    let currentDate = new Date();
    //deadlineCalculator
    let isDeadline = (date)=>{
        let dateArr = date.split("-");
         console.log(dateArr)
         if((Number(dateArr[1])>currentDate.getMonth()+1||Number(dateArr[2])>currentDate.getDate())||Number(dateArr[0])>currentDate.getFullYear()){
                return false; //the dueDate is further ahead
           } 
            return true; //the current date has passed the due date
    }
    
  return (
    <section className={`pt-5 flex flex-col md:flex-row gap-5 md:justify-between 
     dark:bg-slate-700 bg-[#FAFAF9] min-h-screen`}>
{/* 
<div className=" "></div> */}
        <div className="todo-container md:p-3">
            <header className="px-5">
                <h2 className= "font-medium text-md mb-2 text-black/90 dark:text-white/90">Todos</h2>
                <h5 className=" "> <span className="font-medium text-md text-green-900 p-1  rounded-full  bg-green-100 ">{todos.length}</span></h5>
            </header>

            <div className="todo-list-area grid grid-cols-1 gap-2 mt-3">
                {!todos.length>0 ? <h3 className="text-lg font-semibold text-center text-gray-400">All Task Completed</h3>:todos.map((todo)=>(
                    <div key={todo.id} className={`flex w-[90%] gap-2 border-2 border-gray-400  ${priorityBorderColor[todo.priority]}  rounded-xl mx-auto p-1 items-center`}>
                        <div className="p-2 h-full flex items-center  w-[10%] bg-white dark:bg-slate-600 rounded-lg" >
                            <input type="checkbox" className="   mx-auto accent-green-600 " onChange={checkTodo} id={todo.id} />
                        </div>
                        
                        <div className="todo-info dark:bg-slate-600 bg-slate-200   w-[90%] p-2 pl-3 rounded-lg">
                           <div className="flex justify-between items-center mb-2">
                             <h3 className={`font-semibold text-lg dark:text-white mb-2 ${todo.isCompleted?"line-through":""} `}>{todo.title}</h3>
                                <FontAwesomeIcon icon={faPen} size="xs" className="dark:text-white/80 text-black/80" onClick={editTodo} id={todo.id} />
                               
                           </div>
                           
                              <div className="more-info flex justify-between items-center">
                                <p className="text-sm bg-green-200 px-2 text-green-900 font-medium inline-block  rounded-lg">{todo.tags}</p>
                                <div className={`date-info flex items-center px-2 rounded-lg font-medium ${isDeadline(todo.date)?"bg-red-200 text-red-900":"bg-gray-200"} `}>
                                    <FontAwesomeIcon icon={faCalendarCheck} className="" />
                                     <p className="text-sm">{dateConverter(todo.date)}</p>
                                </div>
                             
                              </div>
                            
                        </div>
                    
                    </div>
                    
                ))}
            </div>

        </div>
        
        <div className="completed-todo-container md:p-3">
            <header className="px-5">
                <h2 className= "font-medium txt-black/90 text-md mb-2 dark:text-white/90">Completed Todos</h2>
                <h5 > <span className="font-medium text-md text-green-900 p-1 bg-green-100 rounded-full ">{completedTodos.length}</span></h5>
            </header>
         <div className="todo-list-area grid grid-cols-1 gap-2 mt-3">
            {!completedTodos.length>0 ? <h3 className="text-lg font-semibold text-center text-gray-400 " >No Completed Todo Yet</h3>:completedTodos.map((todo)=>(
                <div key={todo.id} className="flex w-[90%] gap-2 border-2 border-gray-400  rounded-xl mx-auto p-1 items-center">
                    <div className="p-2 h-full flex items-center dark:bg-slate-600 w-[10%] bg-white rounded-lg" >
                        <input type="checkbox" className="   mx-auto accent-green-600 " onChange={reverseCheckedTodo}  id={todo.id} defaultChecked />
                    </div>
                    
                    <div className="todo-info dark:bg-slate-600 bg-slate-100  w-[90%] p-2 pl-3 rounded-lg">
                        <h3 className={`font-semibold text-lg dark:text-white mb-2 ${todo.isCompleted?"line-through":""} `}>{todo.title}</h3>

                     
                        <p className="text-sm bg-green-200 p-1 pl-2 inline-block  rounded-lg">{todo.tags}</p>
                    </div>
                   
                </div>
                
            ))}
        </div>

        </div>
            {/* <button onClick={(e)=>localStorage.clear()}>Clearrrr</button> */}
       <section className="update-form ">
            {updateTodoFormToggle && <UpdateTodoForm todoToEdit={selectedTodo} todos={todos} setTodos={setTodos} setUpdateTodoFormToggle={setUpdateTodoFormToggle} setSelectedTodo={setSelectedTodo} updateTodoFormToggle={updateTodoFormToggle} />}
       </section>


    </section>
  )
}

export default TodoList