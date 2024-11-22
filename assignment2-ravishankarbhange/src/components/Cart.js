import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVER_API_URL } from './Constants';
const Cart = () => {
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const fetchCart = async () => {
        console.log("Fetch the cart details");
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error("No token found. Please login.");
            }
    
            const response = await fetch(`${SERVER_API_URL}/cart`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error("Error fetching cart items");
            }
    
            const data = await response.json();
            setCart(data);
            calculateTotal(data);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

   
    
    // Fetch cart items from MongoDB when component mounts
    useEffect(() => {
        if (localStorage.getItem("authToken") !== null) {
            fetchCart();
        }
    }, []);

    // Calculate total amount
    const calculateTotal = (cartItems) => {
        const total = cartItems.reduce((sum, item) => {
            const price = parseFloat(item.productId.Price.replace(/[$,]/g, ''));
            return sum + (price * item.quantity);
        }, 0);
        setTotalAmount(total);
    };

    const handleRemove = async (id) => {
        try {
            console.log("Removing the product from cart", id);
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error("No token found. Please login.");
            }
    
            const response = await fetch(`${SERVER_API_URL}/cart/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error("Error removing item from cart");
            }
            
            fetchCart();
            const updatedCart = cart.filter(item => item._id !== id);
            setCart(updatedCart);
            calculateTotal(updatedCart);
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };
    

    const handleQuantityChange = async (id, newQuantity) => {
        if (newQuantity < 1) return;
        
        try {
            const token = localStorage.getItem('authToken');
            
            if (!token) {
                throw new Error("No token found. Please login.");
            }
    
            const response = await fetch(`${SERVER_API_URL}/cart/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity: newQuantity })
            });
    
            if (!response.ok) {
                throw new Error("Error updating item quantity");
            }
    
            const updatedCart = cart.map(item => 
                item._id === id ? { ...item, quantity: newQuantity } : item
            );
            setCart(updatedCart);
            calculateTotal(updatedCart);
            
            fetchCart();
        } catch (error) {
            console.error("Error updating item quantity:", error);
        }
    };
    

    const handleMoveToWishlist = async (item) => {
        console.log("Calling the endpoint");
        const response = await fetch(`${SERVER_API_URL}/wishlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify({
                productId: item.productId._id, 
            }),
        });
        const result = await response.json();  
    };

    if (localStorage.getItem("authToken") === null) {
        return (
            <div className="invalid-user">
                <h2>Access Denied</h2>
                <p>You must log in to view your cart.</p>
            </div>
        );
    }
    
    return (
        <div className="vpcartcontainer">
            {cart.length === 0 ? (
                <p style={{ margin: "50px 0px", display: "flex", justifyContent: "center" }}>No items in Cart</p>
            ) : (
                cart.map((item) => (
                    <div key={item._id} className="vpcartcard">
                        <img src={item.productId.Image} alt={item.productId.Name} />
                        <div className="cartData">
                            <p>{item.productId.Name}</p>
                            <p>{item.productId.Price}</p>
                            <div>
                                <input type='submit' value="-" onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)}/>
                                <input type='number' style={{ width: "40px" }} value={item.quantity} readOnly />
                                <input type='submit' value="+" onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)} />
                            </div>
                        </div>
                        <div className="buttonsCart">
                            <input className="wishlistButton" type="submit" value="Remove" onClick={() => handleRemove(item._id)}/>
                            <input className="viewButton" type="submit" value="Move to Wishlist" onClick={() => {handleRemove(item._id); handleMoveToWishlist(item);}} />
                        </div>
                    </div>
                ))
            )}
            <div className="totalAmount" style={{ marginTop: "20px", textAlign: "right" }}>
                <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
            </div>
        </div>
    );
};

export default Cart;
