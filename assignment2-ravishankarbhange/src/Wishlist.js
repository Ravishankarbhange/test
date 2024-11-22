import React, { useEffect, useState } from 'react';
import Card from './Card'; // Make sure you have this component for displaying each product

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/wishlist');
                if (!response.ok) {
                    throw new Error('Failed to fetch wishlist');
                }
                const data = await response.json();
                setWishlist(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchWishlist();
    }, []); 

    return (
        <div>
            <div className="container">
                {wishlist.map((product) => (
                    <Card key={product.productId} data={product} /> // Make sure the key matches your product's unique identifier
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
