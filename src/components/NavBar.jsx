import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun,faMoon } from '@fortawesome/free-solid-svg-icons';
import {ThemeContext} from "./ThemeContext"
import {useContext} from "react";
function NavBar() {

  let {userTheme,setUserTheme} = useContext(ThemeContext);
  
  if(userTheme==="dark"){
      document.documentElement.classList.add("dark");
  }else{
    document.documentElement.classList.remove("dark");
  }
  return (
    <div className="w-full bg-green-600 ">
        
        <nav className='flex justify-between w-full p-2 '>
            <div className='logo-area'>
                <img src="null" alt="app-logo" className='size-5' />
            </div>

            <div className={`theme-toggle max-w-[70px] ${userTheme==="light"?"bg-yellow-400":"bg-slate-700"} w-[20%] flex justify-between rounded-full  items-center`}>
            <div className ={`sun-wrapper  h-full w-[30%]`} onClick={()=>setUserTheme("light")}>
                  <FontAwesomeIcon icon={faSun} className={`text-white   ${userTheme==="dark"?"hidden":""}  pl-1` } />
            </div>
              
              <div className="moon-wrapper  h-full w-[30%] " onClick={()=>setUserTheme("dark")} >
                 <FontAwesomeIcon icon={faMoon} className={`text-white ${userTheme==="light"?"hidden":""} pr-1  ml-auto` }/>

              </div>

               
               
            </div>
        </nav>
    </div>
  )
}

export default NavBar