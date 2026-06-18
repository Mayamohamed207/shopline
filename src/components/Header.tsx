import SearchBar from "./SearchBar";
import { LayoutGrid, List, Sun, Moon, ShoppingBag } from "lucide-react";

interface HeaderProps {
  search: string;
  setSearch: (val: string) => void;
  gridView: boolean;
  setGridView: (val: boolean) => void;
  dark: boolean;
  setDark: (val: boolean) => void;
  setCartOpen: (val: boolean) => void;
  cartCount: number;
}

const Header = ({
  search, setSearch, gridView, setGridView, dark, setDark, setCartOpen, cartCount
}: HeaderProps) => (
  <header className={`sticky top-0 z-50 backdrop-blur border-b transition-colors ${dark ? "bg-[#0a0f1e]/90 border-slate-800" : "bg-white/90 border-slate-200"}`}>
    <div className="max-w-7xl mx-auto px-4 py-2.5 md:py-4 flex flex-col md:flex-row md:items-center justify-between gap-y-2 gap-x-6">
      
      <div className="flex items-center justify-between w-full md:w-auto shrink-0">
        <h1 className="text-xl font-bold tracking-tight">
          <span className={dark ? "text-white" : "text-slate-900"}>shop</span>
          <span className="text-cyan-400">line</span>
        </h1>
        
        <div className="flex items-center gap-2 md:hidden">
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

      <div className="w-full md:flex-1">
        <SearchBar value={search} onChange={setSearch} dark={dark} />
      </div>

      <div className="hidden md:flex items-center gap-3 shrink-0">
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