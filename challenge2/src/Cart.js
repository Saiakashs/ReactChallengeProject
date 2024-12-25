import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [newDatas, setNewDatas] = useState([]);

  // Function to delete an item
  const deleteData = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:8888/cart/${id}`);
        setNewDatas((prevData) => prevData.filter((item) => item.id !== id));
        window.alert("Deleted Successfully");
      } catch (error) {
        console.error("Error deleting item:", error);
        window.alert("Failed to delete item. Please try again.");
      }
    }
  };

  // Fetch cart data
  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await axios.get("http://localhost:8888/cart");
        setNewDatas(res.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    getCart();
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      {newDatas.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div>
          {newDatas.map((data) => (
            <div
              key={data.id}
              style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "20px" }}
            >
              <div className="card" style={{ width: "500px", height: "500px" }}>
                <div className="card-title">{data.title}</div>
                <div className="card-body">
                  <p>{data.description}</p>
                  <p>{data.category}</p>
                  <img
                    src={data.image}
                    alt={data.title || "No Image Available"}
                    style={{ width: "100px", height: "100px", margin: "auto" }}
                  />
                </div>
                <div className="card-footer">
                  <div>
                    <p>Rating: {data.rating?.rate || "N/A"}</p>
                    <p>Reviews: {data.rating?.count || 0}</p>
                  </div>
                  <button onClick={() => deleteData(data.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
