// components/Wishlist.jsx
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Wishlist = ({ flatId, onWishlistChange }) => {
  const [isWishlist, setIsWishlist] = useState(false);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWishlist(storedWishlist.includes(flatId));
  }, [flatId]);

  const handleWishlist = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to use the wishlist feature.");
      return;
    }

    try {
      let updatedWishlist;
      if (isWishlist) {
        // Remove from wishlist
        await fetch(`http://localhost:3000/api/auth/wishlist/remove`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, flatId }),
        });

        updatedWishlist = JSON.parse(localStorage.getItem("wishlist")).filter(id => id !== flatId);
      } else {
        // Add to wishlist
        await fetch(`http://localhost:3000/api/auth/wishlist/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, flatId }),
        });

        updatedWishlist = [...JSON.parse(localStorage.getItem("wishlist") || []), flatId];
      }

      // Update local storage
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      // Update state
      setIsWishlist(!isWishlist);
      onWishlistChange(!isWishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <button
      onClick={handleWishlist}
      className={`text-${isWishlist ? "red-500" : "gray-500"} hover:text-red-700 focus:outline-none`}
    >
      <FaHeart size={24} />
    </button>
  );
};

export default Wishlist;