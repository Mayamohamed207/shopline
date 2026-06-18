import { useState, useEffect } from "react";
import axios from "axios";
import type { Product } from "../types";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get<Product[]>("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { products, loading, error };
};