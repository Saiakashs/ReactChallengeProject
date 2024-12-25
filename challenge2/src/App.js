import './App.css';
import { useState } from 'react';
import App2 from './App2';
import Cart from './Cart';
import {Routes,Route, Link} from "react-router-dom" 
// ''

function App() {
  const API_URL = "https://jsonplaceholder.typicode.com";

  const [users, setUsers] = useState([]);

  const [fetchError, setFetchError] = useState(null);
  const [value,setValue]=useState(null); 

  const fetchItems = async (val,api) => {
    try {
      const api_url = `${API_URL}/${api}`; 
      const response = await fetch(api_url);
      if (!response.ok) throw new Error("Failed to fetch users");
      const items = await response.json();
      console.log(items);
      setUsers(items);
      
    } catch (err) {
      setFetchError(err.message); 
    }
    setValue(val);
    
  };

  
  return (
    <div className="App row">
      <div className="col">
        <button className="btn btn-outline-dark" onClick={()=>fetchItems(1,'users')}>
          Users
        </button>
        <button className="btn btn-outline-dark" onClick={()=>fetchItems(2,'posts')}>Posts</button>
        <button className="btn btn-outline-dark" onClick={()=>fetchItems(3,'comments')}>Comments</button>

        {fetchError && <p style={{ color: "red" }}>Error: {fetchError}</p>}

        <ul>
          
          {

              value===1 && 
              users.map((user) => (
                <li key={user.id}>{user.name} {user.username} {user.address.street} {user.address.suite} {user.address.city} {user.address.zipcode} {user.address.geo.lat} {user.address.geo.lng}</li>
              ))
    
          }

          {

          value===2 && 
          users.map((post) => (
            <li key={post.id}>{post.title} {post.body}</li>
          ))

          }

          {

          value===3 && 
          users.map((comment) => (
            <li key={comment.id}>{comment.name} {comment.email} {comment.body}</li>
          ))

          }
          
        </ul>
      </div>
      <Link to="/App2">App</Link>
      <Link to="/Cart">Cart</Link>
            <Routes>
                <Route path="/App2" element={<App2/>}></Route>
                <Route path="/Cart" element={<Cart/>}></Route>
                <Route path="/Cart/:id" element={<Cart/>}></Route>
            </Routes>
    </div>
  );
}

export default App;
