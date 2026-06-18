import Button from "./shared/Button";

interface Props {
  categories: string[];
  active: string;
  onSelect: (cat: string) => void;
  dark: boolean;
}

const CategoryFilter = ({ categories, active, onSelect }: Props) => (
  <div className="flex flex-nowrap gap-2 overflow-x-auto pb-4 px-4 justify-start md:justify-center whitespace-nowrap no-scrollbar touch-pan-x">
    {["all", ...categories].map((cat) => (
      <Button
        key={cat}
        variant={active === cat ? "primary" : "ghost"}
        onClick={() => onSelect(cat)}
        className="uppercase tracking-wider shrink-0" 
      >
        {cat}
      </Button>
    ))}
  </div>
);

export default CategoryFilter;