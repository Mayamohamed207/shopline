interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "danger";
  className?: string;
}

const Button = ({ onClick, children, variant = "primary", className = "" }: Props) => {
  const base = "flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full transition";
  const variants = {
    primary: "bg-cyan-500 hover:bg-cyan-400 text-white",
    ghost: "border border-slate-700 text-slate-400 hover:text-white hover:border-slate-400",
    danger: "text-red-400 hover:text-red-300",
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;