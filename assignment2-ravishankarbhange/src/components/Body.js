import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import { SERVER_API_URL } from "./Constants";

const Body = () => {
    const [productlist, setProductlist] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`${SERVER_API_URL}/products`);
            console.log("Json Response: "+response);
            const data = await response.json();
            console.log("Json data: "+data);
            setProductlist(data); 
        };
        fetchProducts();
    }, []);

    return (
        <div className="body">
            <div className="container">
                {productlist.map((product) => (
                    <Card key={product.id} data={product} />
                ))}
            </div>
        </div>
    );
};

export default Body;
