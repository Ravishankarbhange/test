import React from "react";

const WishlistCard = ({ data, onMoveToCart, onRemoveFromWishlist }) => {
  return (
    <div className="wishlistcard">
      <img src={data.Image} alt={data.Name} />
      <div className="content">
        <p>{data.Name}</p>
        <p>{data.Price}</p>
      </div>
      <input
        className="viewButton"
        type="submit"
        value="Move to Cart"
        onClick={() => {
          onMoveToCart(data); 
          onRemoveFromWishlist(data._id); 
        }}
      />
      <input
        style={{ marginTop: "0px" }}
        className="wishlistButton"
        type="submit"
        value="Remove"
        onClick={() => onRemoveFromWishlist(data._id)} 
      />
    </div>
  );
};

export default WishlistCard;
