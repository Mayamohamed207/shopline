interface Props {
  dark: boolean;
}

const Footer = ({ dark }: Props) => (
  <footer className={`border-t py-6 text-center text-xs ${dark ? "border-slate-800 text-slate-600" : "border-slate-200 text-slate-400"}`}>
    Built with React · TypeScript · Tailwind CSS
  </footer>
);

export default Footer;