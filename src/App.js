import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { useReducer } from "./hooks/useReducer";
function fetchReducer(state, action) {
  switch (action.type) {
    case "fetchAPI/request":
      return { ...state, isLoading: action.isLoading };
    case "fetchAPI/success":
    case "fetchAPI/error":
      return {
        ...state,
        isLoading: action.isLoading,
        data: action.data,
        error: action.error,
      };
    default:
      return state;
  }
}
function App() {
  const [state,dispatch]=useReducer(fetchReducer,{
    data:[],
    isLoading:false,
    error:null
  });
  const {data:users,isLoading,error}=state;
  // const [users, setUsers] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const fetchUsers = async () => {
    // setIsLoading(true);
    dispatch({type:"fetchAPI/request",isLoading:true,data:[],error:null});
    try {
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();
      dispatch({type:"fetchAPI/success",isLoading:false,data:data.users,error:null});
      // console.log(data);
      // setUsers(data.users);
      // setError(null);
      // setIsLoading(false);
      // console.log("HHHHHHHHHHHHHHHHHHH");
    } catch (err) {
      dispatch({type:"fetchAPI/error",isLoading:true,data:[],error:null});
      // console.log("Errror: ", err);
      // setUsers([]);
      // setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const showUser = () => {
    return (
      <>
        {users?.map((user) => (
          <p key={user.id}>
            {user.id}: {user.firstName} - {user.lastName}
          </p>
        ))}
      </>
    );
  };
  if (error) {
    console.log("co loi xay ra");
    return (
      <>
        <h1>Co loi xxay ra : {error.message}</h1>
      </>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        <h3>Hello</h3>
        {isLoading ? <p>dang load</p> : showUser()}
      </header>
    </div>
  );
}

export default App;
