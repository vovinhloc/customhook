import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchUsers=async()=>{
    setIsLoading(true);
    try {
      const res=await fetch("https://dummyjson.com/users");
      const data=await res.json();
      console.log(data);
      setUsers(data.users);
      setError(null);
      setIsLoading(false);
      console.log("HHHHHHHHHHHHHHHHHHH");
    }catch(err){
      console.log("Errror: ",err);
      setUsers([]);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchUsers();
  
    
  }, [])
  
  const showUser=()=>{
    return (
      <>
       { users?.map(user=>(
        <p key={user.id}>{user.id}: {user.firstName} - {user.lastName}</p>
       ))}
      </>
    )
  }
  if (error){
    console.log("co loi xay ra");
    return (<><h1>Co loi xxay ra : {error.message}</h1></>);
  }
  return (
    
    <div className="App">
      <header className="App-header">
        <h3>Hello</h3>
         {isLoading?(<p>dang load</p>):showUser()}
      </header>
    </div>
  );
}

export default App;
