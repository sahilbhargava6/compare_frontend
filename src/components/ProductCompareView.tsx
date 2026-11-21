"use client";

import React, { useState } from "react";
import { ScrapedProduct, ProductComparisonResult } from "@/types";

interface Props {
  onAddToWatchlist: (productUrl: string, targetPrice: number) => void;
}

export default function ProductCompareView({ onAddToWatchlist }: Props) {
  const [urlA, setUrlA] = useState("https://www.nykaa.com/minimalist-10percent-niacinamide/p/1029384");
  const [urlB, setUrlB] = useState("https://www.amazon.in/dp/B08N5WRWNW");
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<ProductComparisonResult | null>(null);

  const demoComparisons = [
    {
      title: "Minimalist 10% Niacinamide vs The Ordinary Niacinamide 10%",
      urlA: "https://www.nykaa.com/minimalist-10percent-niacinamide/p/1029384",
      urlB: "https://www.amazon.in/dp/B08N5WRWNW",
    },
    {
      title: "Neutrogena Hydro Boost vs Dot & Key Ceramide Gel",
      urlA: "https://www.flipkart.com/neutrogena-hydro-boost/p/itm12345",
      urlB: "https://www.nykaa.com/dot-and-key-ceramide-water-gel/p/554433",
    },
    {
      title: "Dior Capture Totale vs Estee Lauder Advanced Night Repair",
      urlA: "https://www.nykaa.com/dior-capture-totale/p/99988",
      urlB: "https://www.nykaa.com/estee-lauder-advanced-night-repair/p/112233",
    },
  ];

  const handleRunComparison = async (overrideA?: string, overrideB?: string) => {
    const targetA = overrideA || urlA;
    const targetB = overrideB || urlB;
    if (!targetA || !targetB) return;

    setIsComparing(true);

    try {
      // Simulate real dual-scraping and AI comparison
      setTimeout(() => {
        const productA: ScrapedProduct = {
          title: "Minimalist 10% Niacinamide with Zinc PCA",
          brand: "Minimalist",
          price: 549,
          platform: "nykaa",
          canonical_url: targetA,
          image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300",
          rating: 4.6,
          tier_used: "Tier 1 - Affiliate API",
        };

        const productB: ScrapedProduct = {
          title: "The Ordinary Niacinamide 10% + Zinc 1%",
          brand: "The Ordinary",
          price: 599,
          platform: "amazon",
          canonical_url: targetB,
          image_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300",
          rating: 4.4,
          tier_used: "Tier 2 - Managed JSON API",
        };

        const result: ProductComparisonResult = {
          product_a: productA,
          product_b: productB,
          overall_verdict:
            "Minimalist offers superior formulation stability with Aloe vera juice base and EU-sourced active grade, while saving 8% on price.",
          best_for_user_reason:
            "Recommended for your diagnosed Combination & Acne-Prone skin: Minimalist includes soothing Centella and 1% Zinc PCA without the foaming surfactant texture present in The Ordinary.",
          price_difference_percentage: 8.3,
          active_ingredients_comparison: [
            "Niacinamide (Vitamin B3) - 10% in both",
            "Zinc PCA - 1% sebum regulator in both",
            "Base Vehicle: Minimalist uses Aloe Base vs The Ordinary Water Base",
            "Fragrance: 0% in both (Allergen safe)",
          ],
          metrics: [
            {
              attribute: "Value for Money",
              winner: "product_a",
              explanation: "Minimalist is ₹549 (₹18.3/ml) vs The Ordinary ₹599 (₹19.9/ml).",
            },
            {
              attribute: "Acne Control",
              winner: "product_a",
              explanation: "Contains higher grade Zinc PCA salt with anti-microbial potency.",
            },
            {
              attribute: "Skin Barrier Safety",
              winner: "tie",
              explanation: "Both formulas are free of fragrance, parabens, and essential oils.",
            },
            {
              attribute: "Texture & Absorption",
              winner: "product_b",
              explanation: "The Ordinary has a slightly lighter, faster absorbing water-gel texture.",
            },
          ],
        };

        setComparisonResult(result);
        setIsComparing(false);
      }, 1100);
    } catch {
      setIsComparing(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Compare Header Card */}
      <div className="p-4 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <span>⚖️</span> Compare Any 2 Products Side-by-Side
          </span>
          <span className="text-[10px] text-amber-400 font-mono">AI Head-to-Head</span>
        </div>
        <p className="text-[11px] text-zinc-400">
          Paste 2 e-commerce links (Amazon, Nykaa, Flipkart) to compare ingredients, current prices, price histories, and user profile suitability.
        </p>

        {/* Quick Sample Presets */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] text-zinc-500 block">Popular comparisons:</span>
          <div className="flex flex-col gap-1.5">
            {demoComparisons.map((demo, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setUrlA(demo.urlA);
                  setUrlB(demo.urlB);
                  handleRunComparison(demo.urlA, demo.urlB);
                }}
                className="text-left px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-amber-400/50 text-[11px] text-zinc-300 hover:text-white transition-all flex items-center justify-between"
              >
                <span className="truncate">{demo.title}</span>
                <span className="text-amber-400 font-bold ml-2">Compare →</span>
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-2 pt-2 border-t border-zinc-800">
          <div>
            <label className="text-[10px] font-semibold text-zinc-400 block mb-1">Product A Link</label>
            <input
              type="text"
              value={urlA}
              onChange={(e) => setUrlA(e.target.value)}
              placeholder="Paste Product A URL (e.g. Nykaa)"
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold text-zinc-400 block mb-1">Product B Link</label>
            <input
              type="text"
              value={urlB}
              onChange={(e) => setUrlB(e.target.value)}
              placeholder="Paste Product B URL (e.g. Amazon / Flipkart)"
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
          <button
            disabled={isComparing}
            onClick={() => handleRunComparison()}
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:opacity-90 active:scale-98 transition-all disabled:opacity-50"
          >
            {isComparing ? "Analyzing Head-to-Head..." : "⚡ Run AI Product Comparison"}
          </button>
        </div>
      </div>

      {/* Comparison Results Card */}
      {comparisonResult && (
        <div className="space-y-4">
          {/* Dual Product Head-to-Head Cards */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Product A */}
            <div className="p-3 rounded-2xl bg-zinc-900 border border-amber-500/30 relative overflow-hidden flex flex-col justify-between">
              <span className="absolute top-2 right-2 px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[8px] font-bold">
                Product A
              </span>
              <div className="space-y-1.5 pt-4">
                <img
                  src={comparisonResult.product_a.image_url}
                  className="w-16 h-16 rounded-xl object-cover mx-auto"
                />
                <h4 className="text-xs font-bold text-white line-clamp-2 text-center">
                  {comparisonResult.product_a.title}
                </h4>
                <div className="text-center">
                  <span className="text-base font-black text-amber-400">₹{comparisonResult.product_a.price}</span>
                  <div className="text-[9px] text-zinc-500 uppercase">{comparisonResult.product_a.platform}</div>
                </div>
              </div>
              <button
                onClick={() =>
                  onAddToWatchlist(comparisonResult.product_a.canonical_url, Math.round(comparisonResult.product_a.price * 0.9))
                }
                className="w-full mt-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-semibold transition-colors"
              >
                Track Price
              </button>
            </div>

            {/* Product B */}
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 relative overflow-hidden flex flex-col justify-between">
              <span className="absolute top-2 right-2 px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-400 text-[8px] font-bold">
                Product B
              </span>
              <div className="space-y-1.5 pt-4">
                <img
                  src={comparisonResult.product_b.image_url}
                  className="w-16 h-16 rounded-xl object-cover mx-auto"
                />
                <h4 className="text-xs font-bold text-white line-clamp-2 text-center">
                  {comparisonResult.product_b.title}
                </h4>
                <div className="text-center">
                  <span className="text-base font-black text-white">₹{comparisonResult.product_b.price}</span>
                  <div className="text-[9px] text-zinc-500 uppercase">{comparisonResult.product_b.platform}</div>
                </div>
              </div>
              <button
                onClick={() =>
                  onAddToWatchlist(comparisonResult.product_b.canonical_url, Math.round(comparisonResult.product_b.price * 0.9))
                }
                className="w-full mt-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-semibold transition-colors"
              >
                Track Price
              </button>
            </div>
          </div>

          {/* AI Verdict Box */}
          <div className="p-4 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">🏆</span>
              <h3 className="text-xs font-bold text-white">AI Head-to-Head Verdict</h3>
            </div>
            <p className="text-xs text-amber-200/90 leading-relaxed font-medium">
              {comparisonResult.overall_verdict}
            </p>
            <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300">
              <span className="font-semibold text-emerald-400 block mb-0.5">Matched to Your Profile:</span>
              {comparisonResult.best_for_user_reason}
            </div>
          </div>

          {/* Metrics Comparison Table */}
          <div className="p-4 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2.5">
            <h4 className="text-xs font-bold text-white">Feature & Performance Breakdown</h4>
            <div className="space-y-2">
              {comparisonResult.metrics.map((metric, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-white">{metric.attribute}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        metric.winner === "product_a"
                          ? "bg-amber-500/20 text-amber-300"
                          : metric.winner === "product_b"
                          ? "bg-indigo-500/20 text-indigo-300"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {metric.winner === "product_a"
                        ? "Product A Wins"
                        : metric.winner === "product_b"
                        ? "Product B Wins"
                        : "Tie"}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400">{metric.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
