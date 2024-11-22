import React, { useEffect, useState } from 'react';
import WishlistCard from './WishlistCard';
import { SERVER_API_URL } from './Constants';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    // Function to fetch wishlist data from the API
    const fetchWishlist = async () => {
        try {
            const response = await fetch(`${SERVER_API_URL}/wishlist`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            if (!response.ok) {
                console.log("Error occurred");
                return;
            }
            const data = await response.json();
            setWishlist(data); 
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []); 

    // Function to handle moving item to the cart
    const handleMoveToCart = async (product) => {
        const response = await fetch(`${SERVER_API_URL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify({
                productId: product,
                quantity: 1,
            }),
        });

        const result = await response.json();
        console.log(result.message);

        if (result.message === "Product added to cart") {
            // After successfully adding to cart, remove it from wishlist
            handleRemoveFromWishlist(product._id);
        }
    };

    // Function to remove item from wishlist
    const handleRemoveFromWishlist = async (productId) => {
        const removeResponse = await fetch(`${SERVER_API_URL}/wishlist/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
        });

        if (!removeResponse.ok) {
            console.error('Failed to remove from wishlist');
        } else {
            // After removing an item, fetch the wishlist again to reflect the changes
            fetchWishlist();
        }
    };

    
    if (localStorage.getItem("authToken") === null) {
        return (
            <div className="invalid-user">
                <h2>Access Denied</h2>
                <p>You must log in to view your Wishlist.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="container">
                {wishlist.length === 0 ? (
                    <p style={{ margin: "50px 0px" }}>No items in Wishlist</p>
                ) : (
                    wishlist.map((item) => (
                        <WishlistCard
                            key={item._id}
                            data={item.productId}
                            onMoveToCart={handleMoveToCart}
                            onRemoveFromWishlist={handleRemoveFromWishlist}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Wishlist;
