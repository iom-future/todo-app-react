import { createContext} from "react";
export let TodoInfoContext = createContext(null);
function TodoInfoProvider({children,value}) {
 return (   <TodoInfoContext.Provider value={value}>
        {children}
    </TodoInfoContext.Provider>)
}

export default TodoInfoProvider