import React, { useState } from "react";
import { ArrowRight, Sparkles, Flame, Heart, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const spotlightThemes = [
  {
    id: "beauty",
    eyebrow: "Beauty Ritual",
    title: "Glow picks that feel fresh, light, and premium.",
    description:
      "Switch moods, jump into curated categories, and discover products that match how you want to shop today.",
    category: "beauty",
    accent: "from-[#f7d7c8] via-[#fff3ec] to-[#f4d59b]",
    panel: "bg-[#fff7f3]",
    highlight: "Soft glam, skincare, and everyday essentials",
    stats: ["Daily glow", "Best reviewed", "Quick picks"],
    links: [
      { label: "Clean Makeup", category: "makeup" },
      { label: "Hair Care", category: "haircare" },
      { label: "Fragrance", category: "perfume" }
    ]
  },
  {
    id: "fashion",
    eyebrow: "Style Edit",
    title: "Looks that move from casual to standout in one tap.",
    description:
      "Explore curated fashion lanes with faster navigation to the pieces users usually want first.",
    category: "fashion",
    accent: "from-[#d9d2c3] via-[#f9f6ef] to-[#d9b678]",
    panel: "bg-[#faf7f0]",
    highlight: "Street style, party wear, and bold statement pieces",
    stats: ["Trend driven", "Party ready", "Top-rated styles"],
    links: [
      { label: "Street Fashion", category: "fashion" },
      { label: "Party Wear", category: "party" },
      { label: "Accessories", category: "accessories" }
    ]
  },
  {
    id: "tech",
    eyebrow: "Smart Finds",
    title: "Modern gadgets and practical upgrades, without the clutter.",
    description:
      "A cleaner entry point for shoppers who want focused browsing instead of scrolling through everything.",
    category: "electronics",
    accent: "from-[#d9eef9] via-[#f4fbff] to-[#cfe0ff]",
    panel: "bg-[#f4fbff]",
    highlight: "Everyday tech with a sharper, more guided entry experience",
    stats: ["Useful picks", "Fast access", "Curated browsing"],
    links: [
      { label: "Shop Tech", category: "electronics" },
      { label: "All Products", category: "" },
      { label: "Top Trends", category: "fashion" }
    ]
  }
];

export default function InteractiveSpotlight() {
  const [activeTheme, setActiveTheme] = useState(spotlightThemes[0]);
  const navigate = useNavigate();

  const handleExplore = (category) => {
    if (!category) {
      navigate("/allProducts");
      return;
    }

    navigate(`/products?category=${category}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#f6f1e8] px-4 py-8 md:px-6 md:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(207,169,105,0.24),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(0,0,0,0.08),_transparent_30%)]" />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="rounded-[32px] border border-black/5 bg-white/90 p-4 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.45)] backdrop-blur md:p-6">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className={`overflow-hidden rounded-[28px] bg-gradient-to-br ${activeTheme.accent} p-6 md:p-8`}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-white">
                  <Sparkles size={14} />
                  Interactive Picks
                </span>

                <span className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-gray-700">
                  {activeTheme.eyebrow}
                </span>
              </div>

              <div className="mt-8 max-w-2xl">
                <h2 className="max-w-xl text-3xl font-black uppercase leading-tight text-[#171717] md:text-5xl">
                  {activeTheme.title}
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-gray-700 md:text-base">
                  {activeTheme.description}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => handleExplore(activeTheme.category)}
                  className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-white transition hover:bg-[#CFA969]"
                >
                  Explore Now
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => navigate("/wishlist")}
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/85 px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-900 transition hover:border-black hover:bg-white"
                >
                  Save Favorites
                  <Heart size={16} />
                </button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {activeTheme.stats.map((stat) => (
                  <div
                    key={stat}
                    className="rounded-2xl border border-black/10 bg-white/70 px-4 py-4 text-center text-xs font-bold uppercase tracking-[0.25em] text-gray-700"
                  >
                    {stat}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-3">
                {spotlightThemes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setActiveTheme(theme)}
                    className={`rounded-2xl px-3 py-4 text-left transition ${
                      activeTheme.id === theme.id
                        ? "bg-black text-white shadow-lg"
                        : "bg-[#f8f4ec] text-gray-800 hover:bg-[#efe6d7]"
                    }`}
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.24em]">
                      {theme.eyebrow}
                    </p>
                    <p className="mt-2 text-sm font-semibold capitalize">
                      {theme.id}
                    </p>
                  </button>
                ))}
              </div>

              <div className={`flex-1 rounded-[28px] ${activeTheme.panel} p-6`}>
                <div className="flex items-center gap-2 text-[#C28A2B]">
                  <Flame size={18} />
                  <span className="text-[10px] font-black uppercase tracking-[0.28em]">
                    Shopper Interaction Zone
                  </span>
                </div>

                <p className="mt-4 text-2xl font-black uppercase leading-tight text-[#171717]">
                  {activeTheme.highlight}
                </p>

                <div className="mt-6 space-y-3">
                  {activeTheme.links.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => handleExplore(link.category)}
                      className="flex w-full items-center justify-between rounded-2xl border border-black/8 bg-white px-4 py-4 text-left transition hover:-translate-y-0.5 hover:border-[#CFA969] hover:shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-[#f4ecdd] p-2 text-[#C28A2B]">
                          <ShoppingBag size={16} />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-[0.14em] text-gray-900">
                          {link.label}
                        </span>
                      </div>

                      <ArrowRight size={16} className="text-gray-500" />
                    </button>
                  ))}
                </div>

                <div className="mt-6 rounded-3xl bg-black px-5 py-4 text-white">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#CFA969]">
                    Quick Promise
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/80">
                    This section gives users a faster, more guided way to start browsing instead of jumping straight into long product grids.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
