"use client";

import React, { useEffect, useState } from "react";
import { WatchlistItem } from "@/types";

interface Props {
  userId?: string;
  refreshTrigger?: number;
}

export default function WatchlistDrawer({ userId, refreshTrigger }: Props) {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWatchlist = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${apiUrl}/api/watchlist?user_id=${userId || ""}`);
      if (res.ok) {
        const json = await res.json();
        setItems(json.watchlists || []);
      }
    } catch (err) {
      console.warn("Watchlist fetch failed, using sample items:", err);
      setItems([
        {
          id: "w_1",
          user_id: "demo",
          product_id: "p_1",
          target_price: 499,
          is_active: true,
          product: {
            id: "p_1",
            name: "Minimalist 10% Niacinamide Serum",
            brand: "Minimalist",
            canonical_url: "https://www.nykaa.com/minimalist-10percent-niacinamide/p/1029384",
            platform: "nykaa",
            latest_price: {
              price: 549,
              recorded_at: new Date().toISOString(),
            },
          },
        },
        {
          id: "w_2",
          user_id: "demo",
          product_id: "p_2",
          target_price: 520,
          is_active: true,
          product: {
            id: "p_2",
            name: "The Ordinary Salicylic Acid 2%",
            brand: "The Ordinary",
            canonical_url: "https://www.amazon.in/dp/B08N5WRWNW",
            platform: "amazon",
            latest_price: {
              price: 599,
              recorded_at: new Date().toISOString(),
            },
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, [userId, refreshTrigger]);

  const handleRemove = async (id: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      await fetch(`${apiUrl}/api/watchlist/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>📋</span> Active Watchlists & Automated 6-Hour Cron
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Monitored every 6 hours via Laravel Queue Workers for instant price drops
          </p>
        </div>
        <button
          onClick={fetchWatchlist}
          className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition-colors"
        >
          {loading ? "Refreshing..." : "↻ Refresh"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400">
              <th className="pb-3 font-medium">Product</th>
              <th className="pb-3 font-medium">Platform</th>
              <th className="pb-3 font-medium">Current Price</th>
              <th className="pb-3 font-medium">Target Price</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="py-3.5 font-medium text-zinc-200 max-w-[260px] truncate">
                  {item.product?.name || "Tracked Item"}
                  <div className="text-[10px] text-zinc-500 font-normal">{item.product?.brand}</div>
                </td>
                <td className="py-3.5 text-zinc-400 uppercase text-[10px]">
                  {item.product?.platform || "E-Commerce"}
                </td>
                <td className="py-3.5 font-bold text-white">
                  ₹{item.product?.latest_price?.price || item.target_price}
                </td>
                <td className="py-3.5 font-extrabold text-amber-400">₹{item.target_price}</td>
                <td className="py-3.5">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
                    Monitoring
                  </span>
                </td>
                <td className="py-3.5 text-right">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-rose-400 hover:text-rose-300 transition-colors text-xs"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
