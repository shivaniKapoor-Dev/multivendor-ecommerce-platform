import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { addToCart, viewCart, deleteCart } from "../api/callApi";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartIds, setCartIds] = useState([]);
  const { isLoggedIn } = useAuth();

  const refreshCart = async () => {
    if (isLoggedIn) {
      try {
        const res = await viewCart();

        const ids = res.data?.cartItems
          ?.map(item => item.productId?._id)
          ?.filter(Boolean)
          ?.map(id => id.toString());

        setCartIds(ids || []);
      } catch (error) {
        console.log(error.response?.data);
        setCartIds([]);
      }
    } else {
      const stored = (() => {
        const data = JSON.parse(localStorage.getItem("cart"));
        return Array.isArray(data) ? data : [];
      })();

      const ids = stored
        .map(item => item._id?.toString())
        .filter(Boolean);

      setCartIds(ids);
    }
  };

  useEffect(() => {
    refreshCart();

    const handleCartSync = () => {
      refreshCart();
    };

    window.addEventListener("cart-updated", handleCartSync);
    window.addEventListener("storage", handleCartSync);

    return () => {
      window.removeEventListener("cart-updated", handleCartSync);
      window.removeEventListener("storage", handleCartSync);
    };
  }, [isLoggedIn]);

  //  ADD / REMOVE toggle
  const AddToCart = async (product) => {
    const id = product._id.toString();

    if (isLoggedIn) {
      try {
        if (cartIds.includes(id)) {
          // REMOVE
          await deleteCart(product._id);

          setCartIds(prev =>
            prev.filter(cId => cId !== id)
          );
          return { isAdded: false, message: "Removed from cart" };
        } else {
          // ADD
          await addToCart({ productId: product._id });

          setCartIds(prev => [...prev, id]);
          return { isAdded: true, message: "Added to cart" };
        }
      } catch (error) {
        console.log(error.response?.data);
        return { isAdded: cartIds.includes(id), message: "Unable to update cart" };
      }
    } else {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];

      const exists = stored.some(item => item._id === product._id);

      let updated;

      if (exists) {
        // REMOVE
        updated = stored.filter(item => item._id !== product._id);
      } else {
        // ADD
        updated = [...stored, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("cart-updated"));

      setCartIds(updated.map(item => item._id.toString()));
      return {
        isAdded: !exists,
        message: exists ? "Removed from cart" : "Added to cart"
      };
    }
  };

  const deleteCartItems = async (productId) => {
    if (isLoggedIn) {
      try {
        await deleteCart(productId);

        setCartIds(prev =>
          prev.filter(id => id !== productId.toString())
        );
      } catch (error) {
        console.log(error.response?.data);
      }
    } else {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];

      const updated = stored.filter(item => item._id !== productId);

      localStorage.setItem("cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("cart-updated"));

      setCartIds(updated.map(item => item._id.toString()));
    }
  };

  const isItemInCart = (id) =>
    cartIds.some(cId => cId && cId === id?.toString());

  return (
    <CartContext.Provider
      value={{ AddToCart, isItemInCart, deleteCartItems, cartIds, cartCount: cartIds.length, refreshCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
