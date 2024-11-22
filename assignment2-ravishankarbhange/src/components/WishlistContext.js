import React, { createContext, useState } from 'react';

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    const addToWishlist = (product) => {

        // Took help of chatgpt to write code within this setWishlist() 
        setWishlist((prevWishlist) => {
            const isProductInWishlist = prevWishlist.some(
                (item) => item.id === product.id
            );
            if (!isProductInWishlist) {
                return [...prevWishlist, product];
            }
            return prevWishlist;
        });
        
    };

    const removeFromWishlist = (id) => {
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistProvider;
