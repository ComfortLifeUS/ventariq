import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import LocationCard from "@/components/LocationCard";
import PurchaseButton from "@/components/PurchaseButton";
import { getEvent } from "@/lib/events";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return {};

  const isAbuDhabi =
    event.slug?.toLowerCase() === "abu_dhabi";

  const title = isAbuDhabi
    ? "Abu Dhabi 2026 Complete Experience Planner | Ventariq"
    : `${event.name} Experience Planner`;

  const description = isAbuDhabi
    ? "Plan your Abu Dhabi race weekend with expert travel intelligence, ticket guidance, transport strategies, concert access and interactive planning tools."
    : event.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: event.heroImage
        ? [event.heroImage]
        : undefined,
    },
  };
}

export default async function EventLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  const isAbuDhabi =
    event.slug?.toLowerCase() === "abu_dhabi";

  const isPast = event.status === "past";
  const showAbuDhabiSales = isAbuDhabi && !isPast;

  const plannerBenefits = isAbuDhabi
    ? [
        "Navigate race weekend with confidence. Prepare for circuit entry, security, crowds and event-day movement.",
        "Avoid expensive surprises. Compare hotel locations, transport options and spending before making decisions.",
        "Make more of your experience. Understand concert access, local rules and practical travel considerations.",
      ]
    : [
        "Avoid event-day chaos. Prepare for crowds, security, transport and exits.",
        "Make smarter decisions. Compare hotels, transport and spending before you book.",
        "Plan with confidence. Use practical checklists, worksheets and budget tools.",
      ];

  const abuDhabiQuestions = [
    "Does my ticket include access to the after-race concerts?",
    "Should I stay on Yas Island or elsewhere in Abu Dhabi?",
    "How should I plan my journey back after the race and concerts?",
    "What local rules and travel requirements should I know before arriving?",
  ];

  return (
    <main>
      <section className="bg-[#0D1420] py-20 text-white flex flex-col gap-5 md:gap-10">
        <div className={showAbuDhabiSales ? "container grid gap-8 md:grid-cols-2 md:items-center" : "container"}>
          <div>
          <p className="mb-3.5 text-[12.5px] font-bold uppercase tracking-[0.12em] text-[#B8863B]">
            {event.eyebrow}
          </p>

          {showAbuDhabiSales && (
            <p className="mb-4 text-sm font-semibold text-[#FFD34D]">
              DECEMBER 3–6, 2026 · YAS ISLAND, ABU DHABI
            </p>
          )}

          <h1 className="max-w-2xl font-serif text-[33.6px] font-bold leading-[1.07] text-white">
            {showAbuDhabiSales
              ? "Abu Dhabi 2026: Don't Just Attend. Experience It Better."
              : `${event.name} Experience Planner`}
          </h1>

          <p className="mt-5 max-w-xl text-[17px] text-[#C9C2A8]">
            {showAbuDhabiSales
              ? "Make the most of your Abu Dhabi race weekend. Understand ticket and concert access, compare hotel and transport options, avoid costly planning mistakes, and organize your experience with one interactive planner. 102 fillable fields, a built-in budget calculator, clickable navigation and official-source information links."
          </p>

          {showAbuDhabiSales && (
            <div className="mt-6">
              <p className="text-3xl font-bold text-[#FFD34D]">
                $29.99 USD
              </p>
              <p className="mt-2 text-sm text-white/80">
                One-time purchase · Instant digital delivery
              </p>
              <p className="mt-2 text-sm text-white/80">
                Interactive PDF · No subscription required
              </p>
            </div>
          )}

          {isPast && (
            <span className="mt-6 inline-block rounded-[20px] border border-white/20 bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-widest text-white/60">
              This edition has concluded — shown for reference
            </span>
          )}
          </div>
          {showAbuDhabiSales && (
            <div className="flex justify-center">
              <Image src="/sale/abu-dhabi-cover.png" alt="Abu Dhabi 2026 Complete Experience Planner cover" width={688} height={1063} className="h-auto w-full max-w-[300px] rounded-lg shadow-2xl" priority />
            </div>
          )}
        </div>

        <div id={showAbuDhabiSales ? "get-abu-dhabi-planner" : undefined} className="container scroll-mt-28">
          {event.locations && event.locations.length > 0 && (
            <div>
              <div className={showAbuDhabiSales ? "grid max-w-xl gap-5 [&_button]:w-full [&_button]:text-base" : "grid gap-5 md:grid-cols-3"}>
                {event.locations.map((location) => (
                  <LocationCard
                    key={location.slug}
                    eventSlug={event.slug}
                    location={showAbuDhabiSales ? { ...location, description: "Ticket and concert guidance ✓ Hotel and transport strategies ✓ Interactive budget and race-day planning tools" } : location}
                  />
                ))}
              </div>
            </div>
          )}
          {showAbuDhabiSales && <p className="mt-3 text-sm text-white/80"><a href="/faq#refund-policy" className="underline underline-offset-4">Read our refund policy</a></p>}
        </div>
      </section>

      <section className="flex flex-col gap-8 py-20 md:gap-12 md:mt-10">
        <div className="container">
          <h2 className="mb-5 text-[21.5px] font-bold uppercase tracking-[0.12em] text-[#B8863B]">
            See What's Inside the Ventariq Planner
          </h2>

          <p className="mt-3 mb-5 text-[15px] leading-7 text-[#3F4650]">
            {showAbuDhabiSales
              ? "More than a travel guide. Get practical event intelligence, decision-making tools and interactive planning features built around your Abu Dhabi race weekend."
              : "Preview what is included in your Ventariq Complete Experience Planner, designed to help you organize your trip, prepare for event day, and make informed decisions before you travel."}
          </p>

          {event.saleImage && (
            <div className="overflow-hidden rounded-lg">
              <Image
                src={`/${event.saleImage}`}
                alt={`${event.name} Experience Planner`}
                width={1000}
                height={600}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          )}
        </div>

        {showAbuDhabiSales && (
          <div className="container">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                ["102", "Interactive fillable fields"],
                ["Built-in", "Budget calculator"],
                ["Clickable", "Navigation & contents"],
                ["Live", "Information links"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-xl bg-[#0D1420] p-5 text-center text-white"
                >
                  <p className="text-2xl font-bold text-[#FFD34D]">
                    {value}
                  </p>
                  <p className="mt-2 text-sm">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <div className="[&_button]:rounded-lg [&_button]:px-7 [&_button]:py-4 [&_button]:text-base [&_button]:!bg-[#FFD34D] [&_button:hover]:!bg-[#F5C443]">
                <PurchaseButton sku="Ventariq_Abu_Dhabi_2026" />
              </div>
              <p className="mt-2 text-sm text-[#3F4650]">One-time purchase · Instant digital delivery</p>
            </div>
          </div>
        )}

        <div className="container">
          <div className="max-w-3xl">
            <h3 className="font-serif text-2xl font-bold leading-[1.07] text-[#152238] md:text-3xl">
              {showAbuDhabiSales
                ? "One Weekend. Countless Decisions. One Planner."
                : `Why travelers need the Ventariq ${event.name} Planner`}
            </h3>

            <p className="mt-4 text-[17px] leading-7 text-[#3F4650]">
              {showAbuDhabiSales
                ? "From choosing where to stay to understanding ticket access and planning your journey home, Ventariq helps you make informed decisions before and during your trip."
                : event.description}
            </p>
          </div>
        </div>

       {!showAbuDhabiSales && (
  <div className="container">
          <div className="grid gap-5 md:grid-cols-3">
            {plannerBenefits.map((benefit, index) => (
              <div
                key={index}
                className="rounded-xl border border-black/10 bg-[#0D1420] p-6"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full text-[#0D1420] text-sm font-bold bg-[#B8863B]">
                  ✓
                </div>
                <p className="text-[15px] leading-6 text-white">
                  {benefit}
                </p>
              </div>
            ))}
          </div>)}
        </div>
        )}
        {showAbuDhabiSales && (
          <>
            <div className="container">
              <div className="rounded-2xl border border-[#B8863B]/30 bg-[#FAF7EF] p-7 md:p-10">
                <h3 className="font-serif text-2xl font-bold text-[#152238] md:text-3xl">
                  Can You Confidently Answer These Questions?
                </h3>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {abuDhabiQuestions.map((question) => (
                    <div
                      key={question}
                      className="rounded-lg border border-black/10 bg-white p-5"
                    >
                      <p className="font-semibold leading-6 text-[#152238]">
                        <span className="mr-2 font-bold text-[#B8863B]">
                          ?
                        </span>
                        {question}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-6 font-semibold text-[#152238]">
                  Your Ventariq planner helps you work through these decisions before race weekend.
                </p>
              </div>
            </div>

            <div className="container">
              <h3 className="font-serif text-2xl font-bold text-[#152238]">
                Why Trust Ventariq?
              </h3>

              <p className="mt-4 text-[16px] leading-7 text-[#3F4650]">
                Our planners combine researched event information,
                practical recommendations, time-saving insights
                and money-saving strategies. Ventariq Trust Signals
                help distinguish verified information, planning
                insights and details that are not yet confirmed.
              </p>

              <p className="mt-3 text-sm leading-6 text-[#3F4650]">
                Independent event travel intelligence. Not affiliated
                with or endorsed by Formula 1, the FIA, event
                organizers, teams or venues.
              </p>
            </div>
          </>
        )}

        <div className="container">
          <div className="rounded-2xl bg-[#0D1420] p-7 text-white md:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.12em] text-[#B8863B]">
                  Get the Planner
                </p>

                <h3 className="font-serif text-3xl font-bold">
                  {showAbuDhabiSales
                    ? "Your Race Weekend Deserves More Than Guesswork."
                    : `Make Every Moment of Your ${event.name} Experience Count.`}
                </h3>

                <p className="mt-4 text-[15px] leading-6 text-[#C9C2A8]">
                  Less guesswork. Fewer costly mistakes.
                  More time to enjoy your event.
                </p>

                {showAbuDhabiSales && (
                  <div className="mt-6">
                    <p className="text-3xl font-bold text-[#FFD34D]">
                      $29.99 USD
                    </p>

                    <p className="mt-3 text-sm leading-6 text-white/80">
                      Secure checkout. Access your digital
                      planner immediately after successful
                      payment, with delivery by email.
                    </p>
                  </div>
                )}
              </div>

              <div className={showAbuDhabiSales ? "w-full md:max-w-lg [&_button]:w-full [&_button]:text-base" : "container"}>
                {event.locations && event.locations.length > 0 && (
                  <div>
                    <div>
                      {event.locations.map((location) => (
                        <LocationCard
                          key={location.slug}
                          eventSlug={event.slug}
                          location={showAbuDhabiSales ? { ...location, description: "Ticket and concert guidance ✓ Hotel and transport strategies ✓ Interactive budget and race-day planning tools" } : location}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {showAbuDhabiSales && (
              <div className="mt-8 border-t border-white/15 pt-5">
                <p className="text-sm leading-6 text-white/80">
                  For the best interactive experience, download
                  and save your planner, then open it in Adobe
                  Acrobat Reader or another compatible PDF reader.
                  Event tickets, accommodation and transportation
                  are not included.
                </p>

                <p className="mt-3 text-sm text-white/80"><a href="/faq#refund-policy" className="underline underline-offset-4">Read our refund policy</a></p>
                <p className="mt-4 font-semibold text-[#FFD34D]">
                  Ventariq. Plan Less. Experience More.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
