
export function updateTodoFormReducer(state,action){
    switch (action.type) {
        case "EDIT_TITLE":
            return {...state,title:action.value};
         case "EDIT_TAG":
            return {...state,tags:action.value};
         case "EDIT_PRIORITY":
            return {...state,priority:action.value};
         case "EDIT_DATE":
            return {...state,dueDate:action.value};
        case "RESET":
            return {id:0,title:"",tags:"default",priority:"none",dueDate:0,isCompleted:false}
        default:
            break;
    }
} 