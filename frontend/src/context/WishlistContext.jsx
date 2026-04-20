import { createContext, useContext, useEffect, useState } from "react";
import { getWishlist, wishlist } from "../api/callApi";
import { useAuth } from "../hooks/useAuth";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState([]);
  const { isLoggedIn } = useAuth();

  const refreshWishlist = async () => {
    if (isLoggedIn) {
      try {
        const res = await getWishlist();

        const ids = res.data?.wishlist
          ?.map(item => item.product?._id)
          ?.filter(Boolean)
          ?.map(id => id.toString());

        setWishlistIds(ids || []);
      } catch (err) {
        console.error("Wishlist sync failed", err);
        setWishlistIds([]);
      }
    } else {
      const stored = JSON.parse(localStorage.getItem("wishlist")) || [];

      const ids = stored
        .map(item => item._id?.toString())
        .filter(Boolean);

      setWishlistIds(ids);
    }
  };

  useEffect(() => {
    refreshWishlist();

    const handleWishlistSync = () => {
      refreshWishlist();
    };

    window.addEventListener("wishlist-updated", handleWishlistSync);
    window.addEventListener("storage", handleWishlistSync);

    return () => {
      window.removeEventListener("wishlist-updated", handleWishlistSync);
      window.removeEventListener("storage", handleWishlistSync);
    };
  }, [isLoggedIn]);

  const toggleWishlist = async (product) => {
    const id = product._id.toString();

    if (isLoggedIn) {
      try {
        const res = await wishlist({ productId: product._id });

        if (res.data?.isAdded === true) {
          setWishlistIds(prev =>
            prev.includes(id) ? prev : [...prev, id]
          );
          return { isAdded: true, message: "Wishlisted" };
        } else {
          setWishlistIds(prev =>
            prev.filter(wId => wId !== id)
          );
          return { isAdded: false, message: "Removed from wishlist" };
        }
      } catch (error) {
        console.log(error);
        return { isAdded: wishlistIds.includes(id), message: "Unable to update wishlist" };
      }
    } else {
      const stored = JSON.parse(localStorage.getItem("wishlist")) || [];

      const exists = stored.some(item => item._id === product._id);

      let updated;

      if (exists) {
        // remove item
        updated = stored.filter(item => item._id !== product._id);
      } else {
        // add item
        updated = [...stored, product];
      }

      localStorage.setItem("wishlist", JSON.stringify(updated));
      window.dispatchEvent(new Event("wishlist-updated"));

      setWishlistIds(updated.map(item => item._id.toString()));
      return {
        isAdded: !exists,
        message: exists ? "Removed from wishlist" : "Wishlisted"
      };
    }
  };

  const isWishlisted = (id) =>
    wishlistIds.some(wId => wId === id?.toString());

  return (
    <WishlistContext.Provider
      value={{ toggleWishlist, wishlistIds, wishlistCount: wishlistIds.length, isWishlisted, refreshWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
