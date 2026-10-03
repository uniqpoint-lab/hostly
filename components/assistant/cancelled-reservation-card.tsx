import Image from 'next/image'
import { CalendarX2, Users } from 'lucide-react'
import { formatUSD, type Reservation } from '@/lib/rebooking-data'

export function CancelledReservationCard({ reservation }: { reservation: Reservation }) {
  return (
    <section
      aria-label={`Cancelled reservation ${reservation.id}`}
      className="animate-in fade-in slide-in-from-bottom-2 overflow-hidden rounded-2xl border bg-card shadow-sm duration-300"
    >
      <div className="flex items-center gap-2 bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground">
        <CalendarX2 className="size-4" aria-hidden="true" />
        Host cancelled · Reservation #{reservation.id}
      </div>
      <div className="flex gap-3 p-4">
        <Image
          src={reservation.image}
          alt=""
          width={72}
          height={72}
          className="size-[72px] shrink-0 rounded-xl object-cover grayscale"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-muted-foreground line-through decoration-1">
            {reservation.title}
          </p>
          <p className="mt-0.5 text-sm">
            {reservation.checkIn} – {reservation.checkOut}
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="size-3.5" aria-hidden="true" />
            {reservation.guests} guests · {reservation.neighborhood}, {reservation.city}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Original total {formatUSD(reservation.total)}
          </p>
        </div>
      </div>
    </section>
  )
}
