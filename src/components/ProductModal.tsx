import { X, ShoppingCart } from "lucide-react";
import type { Product } from "../types";
import Button from "./shared/Button";
import StarRating from "./shared/StarRating";

interface Props {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  dark: boolean;
}

const ProductModal = ({ product, onClose, onAddToCart, dark }: Props) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className={`relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl ${dark ? "bg-slate-900 border border-slate-800" : "bg-white border border-slate-100"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className={`absolute top-4 right-4 z-10 p-2 rounded-full transition ${dark ? "bg-slate-800 hover:bg-slate-700 text-slate-400" : "bg-slate-100 hover:bg-slate-200 text-slate-500"}`}>
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col md:flex-row">
          <div className={`flex items-center justify-center p-8 md:w-64 shrink-0 ${dark ? "bg-white" : "bg-slate-50"}`}>
            <img src={product.image} alt={product.title} className="h-48 w-auto object-contain" />
          </div>
          <div className="p-6 flex flex-col gap-3 flex-1">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">{product.category}</span>
            <h2 className={`text-lg font-bold leading-snug ${dark ? "text-white" : "text-slate-900"}`}>{product.title}</h2>
            <p className={`text-sm leading-relaxed line-clamp-4 ${dark ? "text-slate-400" : "text-slate-500"}`}>{product.description}</p>
            <StarRating rate={product.rating.rate} count={product.rating.count} dark={dark} full />
            <div className={`flex items-center justify-between mt-auto pt-4 border-t ${dark ? "border-slate-800" : "border-slate-100"}`}>
              <span className={`text-2xl font-bold ${dark ? "text-white" : "text-slate-900"}`}>${product.price.toFixed(2)}</span>
              <Button onClick={() => { onAddToCart(product); onClose(); }} className="px-5 py-2.5 text-sm">
                <ShoppingCart className="w-4 h-4" />Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;