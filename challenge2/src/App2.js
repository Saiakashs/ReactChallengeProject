import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./Cart";
import axios from "axios";

const App2 = () => {
  const [posts, setPosts] = useState([]);
  const [getData, setGetData] = useState([]);
  const [cartData,setCartData]=useState([]);
  const baseURL = "https://fakestoreapi.com";

  useEffect(() => {
    const getDatas = async () => {
      const response = await axios.get(`${baseURL}/products`);
      setPosts(response.data);
    };
    getDatas();
  }, []);

  const addtocart = async (id) => {
    const newData = posts.find((post) => post.id === id);

    if (newData) {
      // Update the cart state with the new item
      setGetData((prevData) => [...prevData, newData]);
      //console.log(newData);

      const itemInCart = cartData.find((item) => item.id ===id);

        if (itemInCart) { 
            window.alert("Already Added"); 
        } 
        else { 
            try { 
                const response = await axios.post(`http://localhost:8888/cart`, newData); 
                setCartData((prevData) => [...prevData, response.data]); 
            } catch (error) { 
                console.error("Error adding item to cart:", error); 
            } 
        }
      
    }
  };

  return (
    <div className="App2">
       
      {posts.map((post, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card" style={{ width: '500px', height: '500px', margin: '20px' }}>
            <div className="card-title">{post.title}</div>
            <div className="card-body">
              <p>{post.description}</p><br />
              <p>{post.category}</p><br />
              <img src={post.image} alt={post.title} style={{ width: '100px', height: '100px', margin: 'auto' }} />
            </div>
            <div className="card-footer">
              <div>
                <p>{post.rating.rate}</p>
                <p>{post.rating.count}</p>
              </div>
              <div>
                <button style={{ marginRight: "20px" }} onClick={() => addtocart(post.id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
    </div>
  );
}

export default App2;


