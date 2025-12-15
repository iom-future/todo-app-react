
export function todoFormReducer(state,action){
    switch (action.type) {
        case "SET_TITLE":
            return {...state,title:action.value};
         case "SET_TAG":
            return {...state,title:action.value};
         case "SET_PRIORITY":
            return {...state,title:action.value};
         case "SET_DATE":
            return {...state,title:action.value};
        default:
            break;
    }
} 