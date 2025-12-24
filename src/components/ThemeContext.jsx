import {createContext,useState } from "react"
export let ThemeContext = createContext(null);
export function ThemeProvider({children}){
    let [userTheme,setUserTheme]=useState("light");
   let themeSetting={
       userTheme,
       setUserTheme
    }
    return(
        <ThemeContext.Provider value={themeSetting}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider