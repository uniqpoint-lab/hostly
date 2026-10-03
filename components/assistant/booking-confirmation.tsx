import { CheckCircle2, KeyRound, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatUSD, type Listing, type Reservation } from '@/lib/rebooking-data'

type BookingConfirmationProps = {
  listing: Listing
  reservation: Reservation
  amountCharged: number
  confirmationCode: string
}

export function BookingConfirmation({
  listing,
  reservation,
  amountCharged,
  confirmationCode,
}: BookingConfirmationProps) {
  return (
    <section
      aria-live="polite"
      className="animate-in fade-in slide-in-from-bottom-2 overflow-hidden rounded-2xl border border-success/30 bg-card duration-300"
    >
      <div className="flex items-center gap-2 bg-success/10 px-4 py-2.5 text-sm font-semibold text-success">
        <CheckCircle2 className="size-4" aria-hidden="true" />
        {"You're booked — you have a place tonight"}
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 text-sm">
        <dt className="text-muted-foreground">Stay</dt>
        <dd className="text-right font-medium">{listing.title}</dd>
        <dt className="text-muted-foreground">Dates</dt>
        <dd className="text-right font-medium">
          {reservation.checkIn} – {reservation.checkOut}
        </dd>
        <dt className="text-muted-foreground">Guests</dt>
        <dd className="text-right font-medium">{reservation.guests}</dd>
        <dt className="text-muted-foreground">Charged</dt>
        <dd className="text-right font-medium">{formatUSD(amountCharged)}</dd>
        <dt className="text-muted-foreground">Confirmation</dt>
        <dd className="text-right font-mono font-medium">{confirmationCode}</dd>
      </dl>
      <div className="grid grid-cols-2 gap-2 px-4 pb-4">
        <Button variant="outline" className="h-10 rounded-xl">
          <KeyRound className="size-4" aria-hidden="true" />
          Check-in info
        </Button>
        <Button variant="outline" className="h-10 rounded-xl">
          <MessageCircle className="size-4" aria-hidden="true" />
          Message {listing.hostName.split(' ')[0]}
        </Button>
      </div>
    </section>
  )
}
