import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  return (
    <div className="card">
      <img src={data.Image} alt={data.Name} />
      <div className="content">
            <p>{data.Name}</p>
            <p>{data.Price}</p>
      </div>
      
      {!data.available ? (
          <p style={{display:"flex", justifyContent:"center", color:"black", backgroundColor:"pink", height:"25px"}}>Out of stock</p>
      ) : (
          <Link to={`/viewProduct/${data.id}`}><input className="viewButton" type="button" value="View" /></Link>
      )}

    </div>
  );
};

export default Card;
