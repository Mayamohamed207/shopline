import { useMemo, useState, useEffect, useCallback } from "react";
import { useProducts } from "./hooks/useProducts";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import EmptyState from "./components/EmptyState";
import ProductModal from "./components/ProductModal";
import CartSidebar from "./components/CartSidebar";
import type { CartItem } from "./components/CartSidebar";
import type { Product } from "./types";
import { Moon, Sun, SlidersHorizontal, ShoppingBag, LayoutGrid, List } from "lucide-react";

type SortOption = "default" | "price-asc" | "price-desc" | "rating";

function App() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("default");
  const [dark, setDark] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [gridView, setGridView] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

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

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-[#0a0f1e] text-white" : "bg-slate-50 text-slate-900"}`}>

      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur border-b transition-colors ${dark ? "bg-[#0a0f1e]/90 border-slate-800" : "bg-white/90 border-slate-200"}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4 flex-wrap">
          <h1 className="text-xl font-bold tracking-tight">
            shop<span className="text-cyan-400">line</span>
          </h1>
          <div className="flex-1 min-w-[200px] max-w-md">
            <SearchBar value={search} onChange={setSearch} dark={dark} />
          </div>
          <div className="flex items-center gap-3 ml-auto">
            {/* Sort */}
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

            {/* Grid/List toggle */}
            <div className={`flex rounded-full border overflow-hidden ${dark ? "border-slate-700" : "border-slate-200"}`}>
              <button
                onClick={() => setGridView(true)}
                className={`p-2 transition ${gridView ? "bg-cyan-500 text-white" : dark ? "text-slate-400 hover:text-white" : "text-slate-400 hover:text-slate-700"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridView(false)}
                className={`p-2 transition ${!gridView ? "bg-cyan-500 text-white" : dark ? "text-slate-400 hover:text-white" : "text-slate-400 hover:text-slate-700"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Dark mode */}
            <button
              onClick={() => setDark(!dark)}
              className={`p-2 rounded-full border transition ${dark ? "border-slate-700 text-cyan-400 hover:bg-slate-800" : "border-slate-200 text-slate-600 hover:bg-slate-100"}`}
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white transition"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 pt-16 pb-10 text-center">
        <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-3">Curated collection</p>
        <h2 className={`text-4xl md:text-6xl font-bold leading-tight mb-4 ${dark ? "text-white" : "text-slate-900"}`}>
          Find what you <span className="text-cyan-400">need</span>
        </h2>
        <p className={`text-lg max-w-md mx-auto ${dark ? "text-slate-500" : "text-slate-500"}`}>
          Browse, filter, and discover — all in one place.
        </p>
      </section>

      {/* Filters */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto px-4 pb-6">
          <CategoryFilter categories={categories} active={activeCategory} onSelect={setActiveCategory} dark={dark} />
        </div>
      )}

      {/* Results counter */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto px-4 pb-4">
          <p className={`text-sm ${dark ? "text-slate-500" : "text-slate-400"}`}>
            Showing <span className="text-cyan-400 font-semibold">{filtered.length}</span> products
          </p>
        </div>
      )}

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 pb-20">
        {loading && <LoadingSpinner dark={dark} />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && filtered.length === 0 && <EmptyState dark={dark} />}
        {!loading && !error && filtered.length > 0 && (
          gridView ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} dark={dark} onView={setSelectedProduct} onAddToCart={addToCart} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} dark={dark} onView={setSelectedProduct} onAddToCart={addToCart} listView />
              ))}
            </div>
          )
        )}
      </main>

      <footer className={`border-t py-6 text-center text-xs ${dark ? "border-slate-800 text-slate-600" : "border-slate-200 text-slate-400"}`}>
        Built with React · TypeScript · Tailwind CSS
      </footer>

      {/* Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} dark={dark} />

      {/* Cart */}
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} onRemove={removeFromCart} dark={dark} />
    </div>
  );
}

export default App;