import { useMemo, useState, useEffect, useCallback } from "react";
import { useProducts } from "./hooks/useProducts";
import { useCart } from "./hooks/useCart";
import { ToastProvider, useToast } from "./context/ToastContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import EmptyState from "./components/EmptyState";
import ProductModal from "./components/ProductModal";
import CartSidebar from "./components/CartSidebar";
import Footer from "./components/Footer";
import type { Product } from "./types";
import { SlidersHorizontal } from "lucide-react";

type SortOption = "default" | "price-asc" | "price-desc" | "rating";

function AppContent() {
  const { products, loading, error } = useProducts();
  const { cartOpen, setCartOpen, cartItems, addToCart, removeFromCart, increaseQty, decreaseQty, cartCount } = useCart();
  const { showToast } = useToast();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("default");
  const [dark, setDark] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [gridView, setGridView] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "rating") result = [...result].sort((a, b) => b.rating.rate - a.rating.rate);
    return result;
  }, [products, search, activeCategory, sort]);

  const handleAddToCart = useCallback((product: Product) => {
    addToCart(product);
    showToast("Added successfully");
  }, [addToCart, showToast]);

  const handleRemoveFromCart = useCallback((id: number) => {
    removeFromCart(id);
    showToast("Item removed");
  }, [removeFromCart, showToast]);

  const handleCheckout = useCallback(() => {
    setCartOpen(false);
    showToast("Checkout unavailable. Please try again later.");
  }, [setCartOpen, showToast]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-[#0a0f1e] text-white" : "bg-slate-50 text-slate-900"}`}>
      <Header search={search} setSearch={setSearch} gridView={gridView} setGridView={setGridView} dark={dark} setDark={setDark} setCartOpen={setCartOpen} cartCount={cartCount} />
      <Hero dark={dark} />
      {!loading && !error && (
        <div className="max-w-7xl mx-auto px-4 pb-6">
          <CategoryFilter categories={categories} active={activeCategory} onSelect={setActiveCategory} dark={dark} />
          <div className="flex items-center justify-between mt-4 gap-4 flex-wrap">
            <p className={`text-sm ${dark ? "text-slate-500" : "text-slate-400"}`}>
              Showing <span className="text-cyan-400 font-semibold">{filtered.length}</span> products
            </p>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className={`w-4 h-4 ${dark ? "text-slate-400" : "text-slate-500"}`} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className={`text-xs font-medium rounded-full px-3 py-1.5 border outline-none cursor-pointer transition ${
                  dark ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-white border-slate-200 text-slate-700"
                }`}
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      )}
      <main className="max-w-7xl mx-auto px-4 pb-20">
        {loading && <LoadingSpinner dark={dark} />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && filtered.length === 0 && <EmptyState dark={dark} />}
        {!loading && !error && filtered.length > 0 && (
          <div className={gridView ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" : "flex flex-col gap-3"}>
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} dark={dark} onView={setSelectedProduct} onAddToCart={handleAddToCart} listView={!gridView} />
            ))}
          </div>
        )}
      </main>
      <Footer dark={dark} />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={handleAddToCart} dark={dark} />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} onRemove={handleRemoveFromCart} onIncrease={increaseQty} onDecrease={decreaseQty} onCheckout={handleCheckout} dark={dark} />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}