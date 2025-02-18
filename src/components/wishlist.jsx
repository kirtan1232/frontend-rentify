// components/Wishlist.jsx
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Wishlist = ({ flatId, onWishlistChange }) => {
  const [isWishlist, setIsWishlist] = useState(false);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWishlist(storedWishlist.includes(flatId));
  }, [flatId]);

  const handleWishlist = () => {
    let newWishlist;
    if (isWishlist) {
      newWishlist = JSON.parse(localStorage.getItem("wishlist")).filter((id) => id !== flatId);
    } else {
      newWishlist = [...(JSON.parse(localStorage.getItem("wishlist")) || []), flatId];
    }
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    setIsWishlist(!isWishlist);
    if (onWishlistChange) {
      onWishlistChange(newWishlist);
    }
  };

  return (
    <button
      onClick={handleWishlist}
      className="text-red-500 hover:text-red-700"
    >
      {isWishlist ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
    </button>
  );
};

export default Wishlist;