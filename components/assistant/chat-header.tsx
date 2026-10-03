import { ChevronLeft, Sparkles } from 'lucide-react'

export function ChatHeader() {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b bg-background/95 px-4 py-3 backdrop-blur">
      <button
        type="button"
        className="-ml-2 flex size-9 items-center justify-center rounded-full hover:bg-muted"
        aria-label="Back to trips"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <div className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Sparkles className="size-4" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <h1 className="text-sm font-semibold leading-tight">Airbnb Assistant</h1>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
          Urgent rebooking · Replies instantly
        </p>
      </div>
    </header>
  )
}
