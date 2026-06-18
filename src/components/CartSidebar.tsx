import { X, ShoppingBag } from "lucide-react";
import type { Product } from "../types";
import Button from "./shared/Button";

export interface CartItem extends Product {
  quantity: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  dark: boolean;
}

const CartSidebar = ({ open, onClose, items, onRemove, dark }: Props) => {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose} />}
      <div className={`fixed top-0 right-0 h-full w-80 z-50 flex flex-col shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"} ${dark ? "bg-slate-900 border-l border-slate-800" : "bg-white border-l border-slate-100"}`}>

        <div className={`flex items-center justify-between p-5 border-b ${dark ? "border-slate-800" : "border-slate-100"}`}>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <h2 className={`font-bold text-lg ${dark ? "text-white" : "text-slate-900"}`}>Cart</h2>
            <span className="bg-cyan-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {items.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <Button variant="ghost" onClick={onClose}><X className="w-4 h-4" /></Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <ShoppingBag className={`w-16 h-16 ${dark ? "text-slate-700" : "text-slate-200"}`} />
              <p className={`text-sm ${dark ? "text-slate-500" : "text-slate-400"}`}>Your cart is empty</p>
            </div>
          ) : items.map((item) => (
            <div key={item.id} className={`flex gap-3 p-3 rounded-2xl border ${dark ? "border-slate-800 bg-slate-800/50" : "border-slate-100 bg-slate-50"}`}>
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shrink-0">
                <img src={item.image} alt={item.title} className="w-10 h-10 object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold line-clamp-2 ${dark ? "text-slate-200" : "text-slate-700"}`}>{item.title}</p>
                <p className="text-cyan-400 font-bold text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                <p className={`text-xs ${dark ? "text-slate-500" : "text-slate-400"}`}>Qty: {item.quantity}</p>
              </div>
              <Button variant="danger" onClick={() => onRemove(item.id)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className={`p-5 border-t ${dark ? "border-slate-800" : "border-slate-100"}`}>
            <div className="flex justify-between mb-4">
              <span className={`font-semibold ${dark ? "text-slate-300" : "text-slate-600"}`}>Total</span>
              <span className={`font-bold text-lg ${dark ? "text-white" : "text-slate-900"}`}>${total.toFixed(2)}</span>
            </div>
            <Button className="w-full justify-center py-3 text-sm">Checkout</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;