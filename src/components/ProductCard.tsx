import { memo } from "react";
import { ShoppingCart, Eye } from "lucide-react";
import type { Product } from "../types";
import Button from "./shared/Button";
import Badge from "./shared/Badge";
import StarRating from "./shared/StarRating";

interface Props {
  product: Product;
  dark: boolean;
  onView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  listView?: boolean;
}

const ProductCard = memo(({ product, dark, onView, onAddToCart, listView }: Props) => {
  if (listView) return (
    <div className={`flex gap-4 p-4 rounded-2xl border transition-all ${dark ? "bg-slate-900 border-slate-800 hover:border-cyan-500/40" : "bg-white border-slate-100 hover:border-cyan-300"}`}>
      <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shrink-0">
        <img src={product.image} alt={product.title} className="w-16 h-16 object-contain p-1" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">{product.category}</span>
        <h3 className={`text-sm font-semibold mt-0.5 line-clamp-1 ${dark ? "text-white" : "text-slate-800"}`}>{product.title}</h3>
        <p className={`text-xs mt-1 line-clamp-1 ${dark ? "text-slate-500" : "text-slate-400"}`}>{product.description}</p>
        <StarRating rate={product.rating.rate} count={product.rating.count} dark={dark} />
      </div>
      <div className="flex flex-col items-end justify-between shrink-0">
        <span className={`font-bold text-lg ${dark ? "text-white" : "text-slate-900"}`}>${product.price.toFixed(2)}</span>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => onView(product)}><Eye className="w-4 h-4" /></Button>
          <Button onClick={() => onAddToCart(product)}><ShoppingCart className="w-3.5 h-3.5" />Add</Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 flex flex-col ${dark ? "bg-slate-900 border-slate-800 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10" : "bg-white border-slate-100 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-100"}`}>
      <div className={`relative m-3 rounded-xl overflow-hidden h-48 flex items-center justify-center ${dark ? "bg-white" : "bg-slate-50"}`}>
        <img src={product.image} alt={product.title} className="h-40 w-auto object-contain p-2 transition-transform duration-500 group-hover:scale-110" />
        <button type="button" onClick={() => onView(product)} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1.5 text-white text-xs font-semibold">
          <Eye className="w-4 h-4" /> Quick View
        </button>
        <div className="absolute top-2 right-2">
          <Badge label={product.category} dark={dark} />
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className={`text-sm font-semibold line-clamp-2 leading-snug ${dark ? "text-slate-100" : "text-slate-800"}`}>{product.title}</h3>
        <StarRating rate={product.rating.rate} count={product.rating.count} dark={dark} />
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className={`text-lg font-bold ${dark ? "text-white" : "text-slate-900"}`}>${product.price.toFixed(2)}</span>
          <Button onClick={() => onAddToCart(product)}><ShoppingCart className="w-3.5 h-3.5" />Add</Button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;