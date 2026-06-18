import SearchBar from "./SearchBar";
import { SlidersHorizontal, LayoutGrid, List, Sun, Moon, ShoppingBag } from "lucide-react";

type SortOption = "default" | "price-asc" | "price-desc" | "rating";

interface HeaderProps {
  search: string;
  setSearch: (val: string) => void;
  sort: SortOption;
  setSort: (val: SortOption) => void;
  gridView: boolean;
  setGridView: (val: boolean) => void;
  dark: boolean;
  setDark: (val: boolean) => void;
  setCartOpen: (val: boolean) => void;
  cartCount: number;
}

const Header = ({
  search, setSearch, sort, setSort, gridView, setGridView, dark, setDark, setCartOpen, cartCount
}: HeaderProps) => (
  <header className={`sticky top-0 z-50 backdrop-blur border-b transition-colors ${dark ? "bg-[#0a0f1e]/90 border-slate-800" : "bg-white/90 border-slate-200"}`}>
    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4 flex-wrap">
      <h1 className="text-xl font-bold tracking-tight">
        shop<span className="text-cyan-400">line</span>
      </h1>
      
      <div className="flex-1 min-w-[200px] max-w-md">
        <SearchBar value={search} onChange={setSearch} dark={dark} />
      </div>
      
      <div className="flex items-center gap-3 ml-auto">
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

        <div className={`flex rounded-full border overflow-hidden ${dark ? "border-slate-700" : "border-slate-200"}`}>
          <button onClick={() => setGridView(true)} className={`p-2 transition ${gridView ? "bg-cyan-500 text-white" : dark ? "text-slate-400 hover:text-white" : "text-slate-400 hover:text-slate-700"}`}>
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button onClick={() => setGridView(false)} className={`p-2 transition ${!gridView ? "bg-cyan-500 text-white" : dark ? "text-slate-400 hover:text-white" : "text-slate-400 hover:text-slate-700"}`}>
            <List className="w-4 h-4" />
          </button>
        </div>

        <button onClick={() => setDark(!dark)} className={`p-2 rounded-full border transition ${dark ? "border-slate-700 text-cyan-400 hover:bg-slate-800" : "border-slate-200 text-slate-600 hover:bg-slate-100"}`}>
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button onClick={() => setCartOpen(true)} className="relative p-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white transition">
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
);

export default Header;