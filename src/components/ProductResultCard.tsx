"use client";

import React, { useState } from "react";
import { ScrapedProduct, AiCuration } from "@/types";

interface Props {
  product: ScrapedProduct;
  curation?: AiCuration;
  onAddToWatchlist: (targetPrice: number) => void;
}

export default function ProductResultCard({ product, curation, onAddToWatchlist }: Props) {
  const [targetPrice, setTargetPrice] = useState<number>(Math.round(product.price * 0.9));
  const [isAdded, setIsAdded] = useState(false);

  const handleWatchlist = () => {
    onAddToWatchlist(targetPrice);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Product Card & Price Watch */}
      <div className="lg:col-span-5 space-y-4">
        <div className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden flex items-center justify-center flex-shrink-0">
              <img
                src={product.image_url || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1.5 flex-1 min-w-0">
              <span className="inline-block px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 text-[10px] font-semibold uppercase tracking-wider">
                {product.platform}
              </span>
              <h2 className="text-sm font-bold text-white leading-snug line-clamp-2">{product.title}</h2>
              <p className="text-xs text-zinc-400">Brand: {product.brand}</p>
            </div>
          </div>

          {/* Price Metrics */}
          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-zinc-400">Current Extracted Price</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">₹{product.price}</span>
                <span className="text-xs font-semibold text-emerald-400">Active Tracking</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-zinc-500">Extraction Tier</div>
              <div className="text-xs font-semibold text-zinc-300">{product.tier_used || "Tier 2 Managed"}</div>
            </div>
          </div>

          {/* Target Price Watchlist Input */}
          <div className="space-y-2 pt-2 border-t border-zinc-800">
            <label className="text-xs font-semibold text-zinc-300">Set Price-Drop Target</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-2.5 text-xs text-zinc-500">₹</span>
                <input
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <button
                onClick={handleWatchlist}
                className={`px-4 py-2 rounded-xl font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap ${
                  isAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-gradient-to-r from-amber-500 to-pink-600 hover:opacity-95 text-white"
                }`}
              >
                {isAdded ? "✓ Added to Watchlist" : "🔔 Add to Watchlist"}
              </button>
            </div>
            <p className="text-[10px] text-zinc-500">
              The 6-hour cron will automatically monitor and alert you when price hits ₹{targetPrice}.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: AI Profile-Aware Curation & Re-ranked Alternatives */}
      <div className="lg:col-span-7 space-y-4">
        {curation && (
          <>
            {/* PRD Section 5 JSON Schema: Personalized Analysis */}
            <div className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">✨</span>
                  <h3 className="text-sm font-bold text-white">AI Profile-Aware Analysis</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-mono">
                  Structured JSON • PRD Sec 5
                </span>
              </div>

              {/* Pros */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <span>✓</span> Personalized Pros
                </h4>
                <div className="space-y-1.5">
                  {curation.personalized_analysis?.pros?.map((pro, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-zinc-200"
                    >
                      {pro}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cons */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                  <span>⚠</span> Considerations & Cons
                </h4>
                <div className="space-y-1.5">
                  {curation.personalized_analysis?.cons?.map((con, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-zinc-200"
                    >
                      {con}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PRD Section 3.B: Pinecone Hybrid Search Alternatives */}
            {curation.recommended_alternatives?.length > 0 && (
              <div className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🎯</span>
                    <h3 className="text-sm font-bold text-white">Better Alternatives in this Price Range</h3>
                  </div>
                  <span className="text-[10px] text-zinc-500">Pinecone Pre-Filtered (±20%)</span>
                </div>

                <div className="space-y-2.5">
                  {curation.recommended_alternatives.map((alt, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-indigo-500/50 transition-all space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Match #{idx + 1}</span>
                        <span className="text-[10px] text-indigo-400 font-mono">Product ID: {alt.product_id}</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{alt.justification}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
