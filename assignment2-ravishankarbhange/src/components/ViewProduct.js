import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { useContext } from 'react';
import { useState, useEffect } from "react";
import { WishlistContext } from './WishlistContext';
import { SERVER_API_URL } from "./Constants";

const ViewProduct = () => {
  const { id } = useParams(); 
  const [addedToCart, setAddedToCart] = useState(false); 
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [productlist, setProductlist] = useState({ data: [] });
  const [product, setProduct] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
      const fetchProducts = async () => {
        console.log("Calling the endpoint: ", SERVER_API_URL);
          const response = await fetch(`${SERVER_API_URL}/products`); 
          const data = await response.json();
          setProductlist(data); 

          const foundProduct = data.find((item) => item.id === parseInt(id));
          setProduct(foundProduct); 
      };
      fetchProducts();
  }, [id]); 

  const handleAddToCart = async (product) => {
    if(localStorage.getItem("authToken")===null){
      navigate("/login");
    }
    try {
        const response = await fetch(`${SERVER_API_URL}/cart`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify({
                productId: product, 
                quantity: 1
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add product to cart');
        }

        const result = await response.json();
        console.log(result.message); 

        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 1000);
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
};


  const handleAddToWishlist = async (product) => {
    if(localStorage.getItem("authToken")===null){
      navigate("/login");
    }
    try {
      console.log("Calling the endpoint");
        const response = await fetch(`${SERVER_API_URL}/wishlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify({
                productId: product._id, 
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add to wishlist');
        }

        const result = await response.json();
        setAddedToWishlist(true); 
        setTimeout(() => setAddedToWishlist(false), 1000);
    } catch (error) {
        console.error(error);
    }
};

  if (!product) {
    return <p>Loading...</p>; 
  }

  return (
    <div className="vpcontainer">
      <div className="vpcard">
        <img src={product.Image}/>
        <div className="flex">
            <p>{product.Name}</p>
            <p>{product.Price}</p>
            <p>{product.Description}</p>
        </div>
        <div className="flexmar">
            <input className="wishlistButton" type="submit" value="Add to Wishlist"onClick={()=>(handleAddToWishlist(product))} />
            <input className="viewButton" type="submit" value="Add to Cart" onClick={()=>(handleAddToCart(product))}/>
            {addedToCart && <p style={{ color: 'green', marginLeft :"65px" }}>Product added to cart!</p>}
            {addedToWishlist && <p style={{ color: 'green', marginLeft :"65px" }}>Product added to Wishlist!</p>}
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
