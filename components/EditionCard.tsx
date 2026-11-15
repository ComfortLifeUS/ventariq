"use client";

import Link from "next/link";
import type { EventItem } from "@/lib/events";

export default function EditionCard({ event }: {
  event: EventItem;
  gradientIndex?: number;
}) {
  const slug = event.slug.toLowerCase();
  const upcoming = event.status === "upcoming";
  const vegas = slug === "las_vegas";
  const abu = slug === "abu_dhabi";
  const dates = vegas ? "November 19–21, 2026" : abu ? "December 3–6, 2026" : null;
  const description = upcoming && vegas
    ? "Plan your Las Vegas race weekend with hotel guidance, transport strategies, race-day logistics and a smarter post-race exit."
    : upcoming && abu
      ? "Plan your Abu Dhabi race weekend with ticket and concert guidance, hotel and transport strategies, local travel essentials and interactive planning tools."
      : event.description;
  const prices = (event.locations ?? []).map((location) => Number(location.basePrice)).filter((price) => Number.isFinite(price) && price > 0);
  const price = prices.length > 0 && prices.every((p) => p === prices[0]) ? prices[0] : null;

  return (
    <Link href={`/events/${event.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[11px] bg-white shadow-[0_18px_40px_-22px_rgba(21,34,56,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_26px_50px_-20px_rgba(21,34,56,0.4)]">
      <div className="relative flex min-h-[160px] flex-col justify-end overflow-hidden bg-[#880000] px-5 pb-5 pt-14 text-white md:min-h-[180px]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <span className="absolute right-4 top-4 z-10 rounded-full border border-white/30 bg-white/[0.14] px-3 py-1 text-[11px]">
          {upcoming ? "Available Now" : "Past Event"}
        </span>
        <div className="relative z-10 mb-2 text-xs font-bold uppercase tracking-wide text-[#FFD34D]">{event.sport}</div>
        <h3 className="relative z-10 font-serif text-2xl text-white">{event.name} Experience Planner</h3>
        {dates && <p className="relative z-10 mt-2 text-sm font-semibold text-[#FFD34D]">{dates}</p>}
      </div>
      <div className="flex flex-1 flex-col px-6 py-5">
        <p className="mb-4 text-[14.5px] leading-relaxed text-[#5A6472]">{description}</p>
        <div className="mt-auto">
          {upcoming ? <>
            {price !== null && <p className="mb-1 text-xl font-bold text-[#152238]">${price.toFixed(2)} USD</p>}
            <p className="mb-4 text-xs text-[#5A6472]">One-time purchase · Instant digital delivery</p>
            <span className="flex w-full items-center justify-center rounded-md bg-[#B8863B] px-4 py-3 text-center text-sm font-bold text-[#0D1420] transition-colors group-hover:bg-[#c99a4d]">Explore &amp; Get the Planner →</span>
          </> : <>
            <p className="mb-3 text-sm font-semibold text-[#5A6472]">Historical edition · Event-specific information may be outdated.</p>
            <span className="text-sm font-bold text-[#152238]">View historical edition →</span>
          </>}
        </div>
      </div>
    </Link>
  );
}
