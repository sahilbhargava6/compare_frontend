"use client";

import React from "react";
import { SkinDiagnosis } from "@/types";

interface Props {
  diagnosis: SkinDiagnosis;
  onTrackProduct: (productUrl: string, targetPrice: number) => void;
}

export default function DiagnosticReportView({ diagnosis, onTrackProduct }: Props) {
  const {
    skin_health_score,
    display_skin_type,
    metrics,
    primary_concerns,
    recommended_actives,
    prescribed_routine,
    curated_products,
  } = diagnosis;

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              DIAGNOSTIC DERMATOLOGICAL INDEX
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">{display_skin_type}</h2>
            <div className="text-xs text-zinc-400 mt-1">
              Estimated Biological Skin Age: <span className="text-white font-semibold">{metrics.biological_skin_age} yrs</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-extrabold bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {skin_health_score}/100
            </div>
            <span className="text-[10px] text-zinc-400 font-medium">Composite Skin Vitality</span>
          </div>
        </div>

        {/* 4 Biometric Metric Progress Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Hydration */}
          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400 flex items-center gap-1.5">💧 Hydration Level</span>
              <span className="font-bold text-cyan-400">{metrics.hydration}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full transition-all duration-700" style={{ width: `${metrics.hydration}%` }} />
            </div>
            <p className="text-[10px] text-zinc-500">
              {metrics.hydration < 50 ? "Transepidermal water barrier is compromised." : "Healthy lipid hydration index."}
            </p>
          </div>

          {/* Sebum */}
          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400 flex items-center gap-1.5">✨ T-Zone Sebum</span>
              <span className="font-bold text-amber-400">{metrics.sebum_t_zone}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full transition-all duration-700" style={{ width: `${metrics.sebum_t_zone}%` }} />
            </div>
            <p className="text-[10px] text-zinc-500">
              {metrics.sebum_t_zone > 65 ? "Elevated oil secretion in forehead & nasal area." : "Balanced sebum production."}
            </p>
          </div>

          {/* Redness */}
          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400 flex items-center gap-1.5">🌸 Erythema / Redness</span>
              <span className="font-bold text-rose-400">{metrics.redness}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full bg-rose-400 rounded-full transition-all duration-700" style={{ width: `${metrics.redness}%` }} />
            </div>
            <p className="text-[10px] text-zinc-500">
              {metrics.redness > 50 ? "Micro-capillary dilation and inflammatory irritation." : "Low vascular reactivity."}
            </p>
          </div>

          {/* Texture */}
          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400 flex items-center gap-1.5">🔬 Pore & Micro-Texture</span>
              <span className="font-bold text-emerald-400">{metrics.texture}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full transition-all duration-700" style={{ width: `${metrics.texture}%` }} />
            </div>
            <p className="text-[10px] text-zinc-500">
              {metrics.texture > 75 ? "Smooth stratum corneum with minor follicular dilation." : "Uneven cellular turnover."}
            </p>
          </div>
        </div>

        {/* Primary Concerns & Prescribed Actives */}
        <div className="space-y-3 pt-2">
          <div>
            <span className="text-xs font-semibold text-zinc-400 block mb-1.5">Primary Detected Concerns:</span>
            <div className="flex flex-wrap gap-1.5">
              {primary_concerns.map((concern, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 text-xs font-medium"
                >
                  {concern}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-zinc-400 block mb-1.5">Prescribed Key Active Ingredients:</span>
            <div className="flex flex-wrap gap-1.5">
              {recommended_actives.map((active, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold"
                >
                  ✦ {active}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3-Step Curated Regimen */}
      <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>🌿</span> Prescribed Morning & Night Clinical Regime
          </h3>
          <span className="text-[11px] text-amber-400 font-mono">Dermatologist Verified</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-1.5">
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold text-[10px] uppercase">
              Step 1: Balance
            </span>
            <p className="text-zinc-300 leading-relaxed pt-1">{prescribed_routine.step_1_balance}</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-1.5">
            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px] uppercase">
              Step 2: Soothe
            </span>
            <p className="text-zinc-300 leading-relaxed pt-1">{prescribed_routine.step_2_soothe}</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-1.5">
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px] uppercase">
              Step 3: Replenish
            </span>
            <p className="text-zinc-300 leading-relaxed pt-1">{prescribed_routine.step_3_replenish}</p>
          </div>
        </div>
      </div>

      {/* Curated Product Cures with Live Price Tracking */}
      <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>💎</span> Prescribed Skincare & Direct Price Tracking
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Targeted formulas matched with your diagnosed active ingredient requirements
            </p>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">Auto-Synced with Pinecone</span>
        </div>

        <div className="space-y-3">
          {curated_products.map((prod, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-amber-400/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-white">{prod.title}</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-semibold">
                    {prod.tier}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] uppercase">
                    {prod.platform}
                  </span>
                </div>
                <p className="text-xs text-zinc-400">{prod.match_reason}</p>
                <div className="flex items-center gap-2 text-xs font-bold text-white pt-1">
                  <span>₹{prod.price}</span>
                  <span className="text-[10px] text-zinc-500 font-normal">Brand: {prod.brand}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:self-center">
                <button
                  onClick={() => onTrackProduct(prod.canonical_url, Math.round(prod.price * 0.9))}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-pink-600 hover:opacity-90 text-white font-semibold text-xs transition-opacity shadow-sm whitespace-nowrap"
                >
                  🔔 Track & Watch Price
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
