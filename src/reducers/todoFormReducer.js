
export function todoFormReducer(state,action){
    switch (action.type) {
        case "SET_TITLE":
            return {...state,title:action.value};
         case "SET_TAG":
            return {...state,tags:action.value};
         case "SET_PRIORITY":
            return {...state,priority:action.value};
         case "SET_DATE":
            return {...state,dueDate:action.value};
        default:
            break;
    }
} 