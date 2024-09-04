import { useState } from "react";
export const useReducer=(reducerFunction,initValue)=>{
    const [state, setState] = useState(initValue)
    function dispatch(action){
       const newState=reducerFunction(state,action);
        setState(newState);
    }
    return [state,dispatch];
}