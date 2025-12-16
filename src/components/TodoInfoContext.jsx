import { createContext} from "react";
export let TodoInfoContext = createContext();
function TodoInfoProvider({children,todoState}) {
 return (   <TodoInfoContext.Provider value={todoState}>
        {children}
    </TodoInfoContext.Provider>)
}

export default TodoInfoProvider