import Button from "./shared/Button";

interface Props {
  categories: string[];
  active: string;
  onSelect: (cat: string) => void;
  dark: boolean;
}

const CategoryFilter = ({ categories, active, onSelect }: Props) => (
  <div className="flex flex-wrap gap-2 justify-center">
    {["all", ...categories].map((cat) => (
      <Button
        key={cat}
        variant={active === cat ? "primary" : "ghost"}
        onClick={() => onSelect(cat)}
        className="uppercase tracking-wider"
      >
        {cat}
      </Button>
    ))}
  </div>
);

export default CategoryFilter;