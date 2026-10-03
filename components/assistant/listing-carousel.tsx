'use client'

import { useRef, useState } from 'react'
import { ListingCard } from './listing-card'
import type { Listing } from '@/lib/rebooking-data'
import { cn } from '@/lib/utils'

type ListingCarouselProps = {
  listings: Listing[]
  budget: number
  nights: number
  bookingId: string | null
  bookedId: string | null
  onReserve: (listing: Listing) => void
}

export function ListingCarousel({
  listings,
  budget,
  nights,
  bookingId,
  bookedId,
  onReserve,
}: ListingCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  function handleScroll() {
    const track = trackRef.current
    if (!track) return
    const cards = Array.from(track.children) as HTMLElement[]
    const center = track.scrollLeft + track.clientWidth / 2
    let closest = 0
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2
      const best = cards[closest].offsetLeft + cards[closest].clientWidth / 2
      if (Math.abs(cardCenter - center) < Math.abs(best - center)) closest = i
    })
    setActiveIndex(closest)
  }

  function scrollTo(index: number) {
    const track = trackRef.current
    const card = track?.children[index] as HTMLElement | undefined
    if (!track || !card) return
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
      behavior: 'smooth',
    })
  }

  function statusFor(id: string) {
    if (bookedId === id) return 'booked' as const
    if (bookingId === id) return 'booking' as const
    if (bookedId || bookingId) return 'disabled' as const
    return 'idle' as const
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Alternative stays"
      className="-mx-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2"
      >
        {listings.map((listing, index) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            budget={budget}
            nights={nights}
            status={statusFor(listing.id)}
            onReserve={onReserve}
            index={index}
            total={listings.length}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-center gap-1.5" role="tablist" aria-label="Choose stay">
        {listings.map((listing, index) => (
          <button
            key={listing.id}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-label={`Show option ${index + 1}`}
            onClick={() => scrollTo(index)}
            className={cn(
              'h-1.5 rounded-full transition-all',
              activeIndex === index ? 'w-5 bg-foreground' : 'w-1.5 bg-foreground/20',
            )}
          />
        ))}
      </div>
    </section>
  )
}
