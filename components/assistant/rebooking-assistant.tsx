'use client'

import { useEffect, useRef, useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { ChatHeader } from './chat-header'
import { MessageBubble, TypingIndicator } from './message-bubble'
import { CancelledReservationCard } from './cancelled-reservation-card'
import { RecoverySteps, type RecoveryStep } from './recovery-steps'
import { ListingCarousel } from './listing-carousel'
import { BookingConfirmation } from './booking-confirmation'
import { ChatComposer } from './chat-composer'
import {
  formatUSD,
  REBOOKING_COUPON,
  type Listing,
  type Reservation,
} from '@/lib/rebooking-data'

type ChatMessage = { id: number; role: 'assistant' | 'user'; text: string }

type RebookingAssistantProps = {
  reservation: Reservation
  listings: Listing[]
}

const STEP_INTERVAL_MS = 850

export function RebookingAssistant({ reservation, listings }: RebookingAssistantProps) {
  const steps: RecoveryStep[] = [
    {
      title: `Reservation #${reservation.id} cancelled`,
      detail: 'Logged as a host cancellation — no penalty to you',
    },
    {
      title: `Full refund of ${formatUSD(reservation.total)} issued`,
      detail: `Back to ${reservation.paymentMethod} in 3–5 business days`,
    },
    {
      title: `${formatUSD(REBOOKING_COUPON)} rebooking coupon added`,
      detail: 'Applied automatically if a new stay costs more',
    },
  ]

  const [completedSteps, setCompletedSteps] = useState(0)
  const [showListings, setShowListings] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [bookingId, setBookingId] = useState<string | null>(null)
  const [bookedId, setBookedId] = useState<string | null>(null)

  const bottomRef = useRef<HTMLDivElement>(null)
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])
  const nextId = useRef(0)

  useEffect(() => {
    const ids: ReturnType<typeof setTimeout>[] = []
    steps.forEach((_, i) => {
      ids.push(setTimeout(() => setCompletedSteps(i + 1), STEP_INTERVAL_MS * (i + 1)))
    })
    const searchStart = STEP_INTERVAL_MS * (steps.length + 1)
    ids.push(setTimeout(() => setIsTyping(true), searchStart))
    ids.push(
      setTimeout(() => {
        setIsTyping(false)
        setShowListings(true)
      }, searchStart + 1100),
    )
    const pending = timeouts.current
    return () => {
      ids.forEach(clearTimeout)
      pending.forEach(clearTimeout)
    }
    // Runs once to play the automated recovery sequence.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [completedSteps, showListings, isTyping, messages.length, bookedId])

  function schedule(fn: () => void, ms: number) {
    timeouts.current.push(setTimeout(fn, ms))
  }

  function addMessage(role: ChatMessage['role'], text: string) {
    nextId.current += 1
    const id = nextId.current
    setMessages((prev) => [...prev, { id, role, text }])
  }

  function replyFor(text: string) {
    const lower = text.toLowerCase()
    if (lower.includes('more option'))
      return "These 3 are the best matches for your must-haves. Want me to widen the search to 5 miles? I'll keep Instant Book and Superhost filters on."
    if (lower.includes('specialist') || lower.includes('person'))
      return "Connecting you with a Rebooking Specialist now — average wait is under 2 minutes. Your options stay right here while you wait."
    if (lower.includes('refund'))
      return `Yes — ${formatUSD(reservation.total)} is on its way back to ${reservation.paymentMethod}. Expect it in 3–5 business days. A receipt is in your email.`
    if (lower.includes('direction'))
      return "I've sent directions and the self check-in code to your Trips tab. Safe travels!"
    return "Got it. I've passed this to our Rebooking team and they'll reply right here shortly."
  }

  function handleSend(text: string) {
    addMessage('user', text)
    setIsTyping(true)
    schedule(() => {
      setIsTyping(false)
      addMessage('assistant', replyFor(text))
    }, 900)
  }

  function handleReserve(listing: Listing) {
    setBookingId(listing.id)
    schedule(() => {
      setBookingId(null)
      setBookedId(listing.id)
    }, 1500)
  }

  const bookedListing = listings.find((l) => l.id === bookedId)
  const amountCharged = bookedListing
    ? bookedListing.total > reservation.total
      ? bookedListing.total - REBOOKING_COUPON
      : bookedListing.total
    : 0

  const quickReplies = bookedListing
    ? ['Get directions', 'Is my refund confirmed?', 'Talk to a specialist']
    : showListings
      ? ['Show more options', 'Is my refund confirmed?', 'Talk to a specialist']
      : []

  return (
    <div className="mx-auto flex h-dvh w-full max-w-md flex-col bg-background sm:border-x">
      <ChatHeader />

      <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-5">
        <div className="flex flex-col gap-3">
          <p className="text-center text-xs text-muted-foreground">Today · just now</p>

          <CancelledReservationCard reservation={reservation} />

          <MessageBubble role="assistant">
            {"I'm so sorry — your host just cancelled. You're fully covered, and I'm handling everything right now."}
          </MessageBubble>

          <RecoverySteps steps={steps} completedCount={completedSteps} />

          {completedSteps === steps.length && (
            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground animate-in fade-in">
              <ShieldCheck className="size-3.5 text-success" aria-hidden="true" />
              Protected by AirCover for guests
            </p>
          )}

          {showListings && (
            <>
              <MessageBubble role="assistant">
                <span className="font-semibold">Good news — you have options.</span> Here are 3
                Instant Book stays within 2 miles for {reservation.checkIn} – {reservation.checkOut}
                , {reservation.guests} guests. All Superhosts, rated 4.8+.
              </MessageBubble>
              <ListingCarousel
                listings={listings}
                budget={reservation.total}
                nights={reservation.nights}
                bookingId={bookingId}
                bookedId={bookedId}
                onReserve={handleReserve}
              />
            </>
          )}

          {bookedListing && (
            <BookingConfirmation
              listing={bookedListing}
              reservation={reservation}
              amountCharged={amountCharged}
              confirmationCode="HMX4K2P9Q"
            />
          )}

          {messages.map((m) => (
            <MessageBubble key={m.id} role={m.role}>
              {m.text}
            </MessageBubble>
          ))}

          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} aria-hidden="true" />
        </div>
      </main>

      <ChatComposer quickReplies={quickReplies} onSend={handleSend} disabled={isTyping} />
    </div>
  )
}
