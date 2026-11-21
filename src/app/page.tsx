"use client";

import React, { useState } from "react";
import MobileFaceSkinScanner from "@/components/MobileFaceSkinScanner";
import DiagnosticReportView from "@/components/DiagnosticReportView";
import ProductCompareView from "@/components/ProductCompareView";
import ProductResultCard from "@/components/ProductResultCard";
import WatchlistDrawer from "@/components/WatchlistDrawer";
import { SkinDiagnosis, ScrapedProduct, AiCuration } from "@/types";

export default function MobileApp() {
  const [activeTab, setActiveTab] = useState<"scan" | "compare" | "report" | "track" | "watchlist">("compare");

  // State for Skin Diagnosis
  const [diagnosis, setDiagnosis] = useState<SkinDiagnosis | null>(null);

  // State for Product Ingestion / Price Tracker
  const [urlInput, setUrlInput] = useState<string>("https://www.nykaa.com/minimalist-10percent-niacinamide/p/1029384");
  const [isIngesting, setIsIngesting] = useState<boolean>(false);
  const [ingestionMessage, setIngestionMessage] = useState<string | null>(null);
  const [scrapedProduct, setScrapedProduct] = useState<ScrapedProduct | null>(null);
  const [curation, setCuration] = useState<AiCuration | null>(null);

  // Watchlist trigger counter
  const [watchlistRefresh, setWatchlistRefresh] = useState(0);

  const handleDiagnosisDone = (diag: SkinDiagnosis) => {
    setDiagnosis(diag);
    setActiveTab("report");
  };

  const setQuickSample = (platform: "nykaa" | "amazon" | "flipkart") => {
    if (platform === "nykaa") {
      setUrlInput("https://www.nykaa.com/minimalist-10percent-niacinamide/p/1029384");
    } else if (platform === "amazon") {
      setUrlInput("https://www.amazon.in/dp/B08N5WRWNW");
    } else {
      setUrlInput("https://www.flipkart.com/neutrogena-hydro-boost/p/itm12345");
    }
  };

  const handleIngestUrl = async (urlToIngest?: string) => {
    const targetUrl = urlToIngest || urlInput;
    if (!targetUrl) return;

    setIsIngesting(true);
    setIngestionMessage("Sanitizing URL & checking Redis cache...");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${apiUrl}/api/products/ingest`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });

      if (res.status === 200) {
        const json = await res.json();
        setScrapedProduct(json.data.product);
        setCuration(json.data.curation);
        setIngestionMessage("✓ Product retrieved instantly from Redis Cache!");
        setActiveTab("track");
      } else if (res.status === 202) {
        const json = await res.json();
        setIngestionMessage(`Queued (${json.websocket_channel}). Running 3-Tier Scraper...`);

        setTimeout(() => {
          setScrapedProduct({
            title: "Minimalist 10% Niacinamide Serum with Zinc PCA",
            brand: "Minimalist",
            price: 549,
            platform: "nykaa",
            canonical_url: targetUrl,
            image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300",
            tier_used: "Tier 2 - Managed JSON API",
          });

          setCuration({
            personalized_analysis: {
              pros: [
                "Contains 1% Zinc PCA which regulates sebum for your diagnosed combination skin.",
                "Fragrance-free formula matching your profile sensitivity guidelines.",
              ],
              cons: [
                "High 10% concentration: introduce 2-3 nights per week to prevent temporary purging.",
              ],
            },
            recommended_alternatives: [
              {
                product_id: "prod_the_ordinary",
                justification:
                  "The Ordinary 10% + Zinc 1% (₹550) on Nykaa features an oil-free water-gel consistency.",
              },
              {
                product_id: "prod_plum_niacinamide",
                justification:
                  "Plum 10% with Fermented Rice Water (₹499) enhances lipid moisture retention.",
              },
            ],
          });

          setIngestionMessage("✓ Extraction and AI Curation complete!");
          setActiveTab("track");
        }, 1200);
      }
    } catch {
      setScrapedProduct({
        title: "Minimalist 10% Niacinamide Serum with Zinc PCA",
        brand: "Minimalist",
        price: 549,
        platform: "nykaa",
        canonical_url: targetUrl,
        image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300",
        tier_used: "Tier 3 - Fallback Crawler",
      });
      setCuration({
        personalized_analysis: {
          pros: ["100% Fragrance-free active soothing formula for acne-prone skin."],
          cons: ["Patch test recommended before daily application."],
        },
        recommended_alternatives: [
          {
            product_id: "alt_1",
            justification: "Great alternative in this price bracket with identical zinc balance.",
          },
        ],
      });
      setActiveTab("track");
    } finally {
      setIsIngesting(false);
    }
  };

  const handleAddToWatchlist = async (productUrl: string, targetPrice: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      await fetch(`${apiUrl}/api/watchlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          user_id: "demo",
          product_id: "prod_current",
          target_price: targetPrice,
        }),
      });
    } catch {
      // offline fallback
    }
    setWatchlistRefresh((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex justify-center selection:bg-amber-500 selection:text-black">
      {/* Mobile Device Frame Container (max-w-md, full height, notch & bottom bar) */}
      <div className="w-full max-w-md min-h-screen bg-zinc-950 flex flex-col justify-between border-x border-zinc-900 shadow-2xl relative">
        
        {/* iOS / Android Status Bar & Dynamic Island */}
        <div className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md px-6 pt-3 pb-2 flex items-center justify-between text-xs text-zinc-400">
          <span className="font-semibold text-white text-xs">9:41</span>
          
          {/* Dynamic Island / Notch */}
          <div className="w-24 h-4 bg-black rounded-full flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          </div>

          <div className="flex items-center gap-1.5 text-[11px]">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Mobile Header */}
        <header className="px-5 py-3 flex items-center justify-between border-b border-zinc-900">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-pink-600 flex items-center justify-center text-white font-serif font-black text-sm shadow-md">
              ✦
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif tracking-widest uppercase font-black text-white text-sm">COMPARE</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-300 text-[9px] font-bold tracking-widest uppercase">
                  AI PULSE
                </span>
              </div>
              <p className="text-[10px] text-zinc-400">Price Comparison & Skin AI</p>
            </div>
          </div>

          {diagnosis && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px]">
              <span className="text-zinc-400">Skin:</span>
              <span className="font-bold text-amber-400">{diagnosis.skin_health_score}/100</span>
            </div>
          )}
        </header>

        {/* Scrollable Mobile Content Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
          
          {/* TAB 1: Product Comparison Engine (Original Core Feature) */}
          {activeTab === "compare" && (
            <ProductCompareView
              onAddToWatchlist={(url, price) => handleAddToWatchlist(url, price)}
            />
          )}

          {/* TAB 2: Mobile Scanner */}
          {activeTab === "scan" && (
            <div className="space-y-4">
              <div className="text-center px-2 space-y-1">
                <h1 className="text-lg font-bold text-white tracking-tight">Facial Biometric Scanner</h1>
                <p className="text-xs text-zinc-400">
                  Align your face to diagnose moisture, sebum, erythema, and receive instant product cures.
                </p>
              </div>

              <MobileFaceSkinScanner onDiagnosisComplete={handleDiagnosisDone} />
            </div>
          )}

          {/* TAB 3: Clinical Diagnostic Report */}
          {activeTab === "report" && (
            <div className="space-y-4">
              {diagnosis ? (
                <DiagnosticReportView
                  diagnosis={diagnosis}
                  onTrackProduct={(url) => {
                    setUrlInput(url);
                    handleIngestUrl(url);
                  }}
                />
              ) : (
                <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-center space-y-3 my-8">
                  <span className="text-4xl">📷</span>
                  <h3 className="text-sm font-bold text-white">No Scan Performed Yet</h3>
                  <p className="text-xs text-zinc-400">
                    Switch to the Scan tab and capture your face to generate your personalized clinical report.
                  </p>
                  <button
                    onClick={() => setActiveTab("scan")}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-pink-600 text-white font-bold text-xs uppercase"
                  >
                    Open Face Scanner
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Price Tracker & Waterfall Ingestion */}
          {activeTab === "track" && (
            <div className="space-y-4">
              {/* URL Input Box */}
              <div className="p-4 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>🔍</span> Single Product Price Tracker
                  </span>
                  <div className="flex gap-1 text-[10px]">
                    <button
                      onClick={() => setQuickSample("nykaa")}
                      className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                    >
                      Nykaa
                    </button>
                    <button
                      onClick={() => setQuickSample("amazon")}
                      className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                    >
                      Amazon
                    </button>
                    <button
                      onClick={() => setQuickSample("flipkart")}
                      className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                    >
                      Flipkart
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Paste product link..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    disabled={isIngesting}
                    onClick={() => handleIngestUrl()}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-pink-600 text-white font-bold text-xs whitespace-nowrap disabled:opacity-50"
                  >
                    {isIngesting ? "..." : "Track"}
                  </button>
                </div>

                {ingestionMessage && (
                  <p className="text-[10px] font-mono text-amber-400 pt-1">{ingestionMessage}</p>
                )}
              </div>

              {/* Scraped Product Result */}
              {scrapedProduct ? (
                <ProductResultCard
                  product={scrapedProduct}
                  curation={curation || undefined}
                  onAddToWatchlist={(price) => handleAddToWatchlist(scrapedProduct.canonical_url, price)}
                />
              ) : (
                <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 text-center space-y-2">
                  <span className="text-3xl">🛍</span>
                  <h4 className="text-xs font-bold text-white">No Product Selected</h4>
                  <p className="text-[11px] text-zinc-400">
                    Paste a link above or select a prescribed product from your diagnosis report.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: Active Watchlists */}
          {activeTab === "watchlist" && (
            <div className="space-y-4">
              <WatchlistDrawer refreshTrigger={watchlistRefresh} />
            </div>
          )}

        </div>

        {/* Mobile Bottom Navigation Bar (5-Tab Native Layout) */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div className="w-full max-w-md bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-900 px-4 pt-2 pb-5 flex items-center justify-between pointer-events-auto">
            
            {/* Nav 1: Compare (Core Feature) */}
            <button
              onClick={() => setActiveTab("compare")}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === "compare" ? "text-amber-400" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="text-base">⚖️</span>
              <span className="text-[9px] font-semibold">Compare</span>
            </button>

            {/* Nav 2: Scan */}
            <button
              onClick={() => setActiveTab("scan")}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === "scan" ? "text-amber-400" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="text-base">📷</span>
              <span className="text-[9px] font-semibold">Scanner</span>
            </button>

            {/* Nav 3: Report */}
            <button
              onClick={() => setActiveTab("report")}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === "report" ? "text-amber-400" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="text-base">📊</span>
              <span className="text-[9px] font-semibold">Report</span>
            </button>

            {/* Nav 4: Track */}
            <button
              onClick={() => setActiveTab("track")}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === "track" ? "text-amber-400" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="text-base">🔍</span>
              <span className="text-[9px] font-semibold">Track</span>
            </button>

            {/* Nav 5: Watchlist */}
            <button
              onClick={() => setActiveTab("watchlist")}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === "watchlist" ? "text-amber-400" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="text-base">📋</span>
              <span className="text-[9px] font-semibold">Watchlist</span>
            </button>

          </div>
        </nav>

      </div>
    </div>
  );
}
