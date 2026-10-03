import { RebookingAssistant } from '@/components/assistant/rebooking-assistant'
import {
  alternativeListings,
  eligibleListings,
  originalReservation,
} from '@/lib/rebooking-data'

export default function Page() {
  const listings = eligibleListings(alternativeListings, originalReservation.total)

  return (
    <div className="bg-muted/60">
      <RebookingAssistant reservation={originalReservation} listings={listings} />
    </div>
  )
}
