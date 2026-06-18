interface Props {
  dark: boolean;
}

const Hero = ({ dark }: Props) => (
  <section className="max-w-7xl mx-auto px-4 pt-16 pb-10 text-center">
    <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-3">Curated collection</p>
    <h2 className={`text-4xl md:text-6xl font-bold leading-tight mb-4 ${dark ? "text-white" : "text-slate-900"}`}>
      Find what you <span className="text-cyan-400">need</span>
    </h2>
    <p className={`text-lg max-w-md mx-auto ${dark ? "text-slate-500" : "text-slate-500"}`}>
      Browse, filter, and discover — all in one place.
    </p>
  </section>
);

export default Hero;