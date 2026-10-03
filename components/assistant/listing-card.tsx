import Image from 'next/image'
import { Award, Check, Loader2, MapPin, Star, Ticket, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatUSD, REBOOKING_COUPON, type Listing } from '@/lib/rebooking-data'
import { cn } from '@/lib/utils'

type ListingCardProps = {
  listing: Listing
  budget: number
  nights: number
  status: 'idle' | 'booking' | 'booked' | 'disabled'
  onReserve: (listing: Listing) => void
  index: number
  total: number
}

export function ListingCard({
  listing,
  budget,
  nights,
  status,
  onReserve,
  index,
  total,
}: ListingCardProps) {
  const difference = listing.total - budget
  const isOverBudget = difference > 0
  const youPay = isOverBudget ? Math.max(listing.total - REBOOKING_COUPON, 0) : listing.total

  return (
    <article
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${listing.title}`}
      className={cn(
        'flex w-[82%] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-opacity sm:w-[300px]',
        status === 'disabled' && 'opacity-50',
        status === 'booked' && 'ring-2 ring-success',
      )}
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={listing.image}
          alt={`${listing.title} in ${listing.neighborhood}`}
          fill
          sizes="(max-width: 640px) 80vw, 300px"
          className="object-cover"
        />
        <div className="absolute inset-x-3 top-3 flex flex-wrap gap-1.5">
          {listing.isSuperhost && (
            <span className="flex items-center gap-1 rounded-full bg-background px-2.5 py-1 text-[11px] font-semibold shadow-sm">
              <Award className="size-3" aria-hidden="true" />
              Superhost
            </span>
          )}
          <span className="flex items-center gap-1 rounded-full bg-background px-2.5 py-1 text-[11px] font-semibold shadow-sm">
            <Zap className="size-3 fill-primary text-primary" aria-hidden="true" />
            Instant Book
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold leading-snug text-balance">{listing.title}</h3>
          <span className="flex shrink-0 items-center gap-1 text-sm font-medium">
            <Star className="size-3.5 fill-foreground" aria-hidden="true" />
            {listing.rating.toFixed(2)}
            <span className="sr-only">out of 5 from {listing.reviews} reviews</span>
          </span>
        </div>

        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3.5" aria-hidden="true" />
          {listing.distanceMiles} mi from original stay · {listing.type}
        </p>

        <ul className="flex flex-wrap gap-1.5" aria-label="Highlights">
          {listing.highlights.map((h) => (
            <li key={h} className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t pt-3">
          {isOverBudget ? (
            <p className="mb-2 flex items-center gap-1.5 rounded-lg bg-accent px-2.5 py-1.5 text-xs font-medium text-accent-foreground">
              <Ticket className="size-3.5 shrink-0" aria-hidden="true" />
              +{formatUSD(difference)} covered by your {formatUSD(REBOOKING_COUPON)} coupon
            </p>
          ) : (
            <p className="mb-2 flex items-center gap-1.5 rounded-lg bg-success/10 px-2.5 py-1.5 text-xs font-medium text-success">
              <Check className="size-3.5 shrink-0" aria-hidden="true" />
              {formatUSD(Math.abs(difference))} under your original budget
            </p>
          )}

          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-base font-semibold">
                {isOverBudget && (
                  <span className="mr-1.5 text-sm font-normal text-muted-foreground line-through">
                    {formatUSD(listing.total)}
                  </span>
                )}
                {formatUSD(youPay)}
                <span className="text-sm font-normal text-muted-foreground"> total</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {formatUSD(listing.nightlyRate)} × {nights} nights
              </p>
            </div>
          </div>

          <Button
            className="mt-3 h-11 w-full rounded-xl text-sm font-semibold"
            onClick={() => onReserve(listing)}
            disabled={status !== 'idle'}
            variant={status === 'booked' ? 'outline' : 'default'}
          >
            {status === 'booking' && (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Securing your stay…
              </>
            )}
            {status === 'booked' && (
              <>
                <Check className="size-4 text-success" aria-hidden="true" />
                Booked
              </>
            )}
            {(status === 'idle' || status === 'disabled') && (
              <>
                <Zap className="size-4" aria-hidden="true" />
                Reserve instantly
              </>
            )}
          </Button>
        </div>
      </div>
    </article>
  )
}
