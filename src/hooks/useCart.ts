import { useState, useCallback } from "react";
import type { Product } from "../types";
import type { CartItem } from "../components/CartSidebar";

export const useCart = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const increaseQty = useCallback((id: number) => {
    setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  }, []);

  const decreaseQty = useCallback((id: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return { cartOpen, setCartOpen, cartItems, addToCart, removeFromCart, increaseQty, decreaseQty, cartCount };
};