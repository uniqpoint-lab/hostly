'use client'

import { useState } from 'react'
import { ArrowUp } from 'lucide-react'

type ChatComposerProps = {
  quickReplies: string[]
  onSend: (text: string) => void
  disabled?: boolean
}

export function ChatComposer({ quickReplies, onSend, disabled }: ChatComposerProps) {
  const [value, setValue] = useState('')

  function submit() {
    const text = value.trim()
    if (!text || disabled) return
    onSend(text)
    setValue('')
  }

  return (
    <div className="sticky bottom-0 z-20 border-t bg-background/95 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur">
      {quickReplies.length > 0 && (
        <div className="no-scrollbar mb-2 flex gap-2 overflow-x-auto px-4" aria-label="Suggested replies">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              type="button"
              disabled={disabled}
              onClick={() => onSend(reply)}
              className="shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
            >
              {reply}
            </button>
          ))}
        </div>
      )}
      <form
        className="flex items-center gap-2 px-4"
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <label htmlFor="assistant-input" className="sr-only">
          Message the Airbnb Assistant
        </label>
        <input
          id="assistant-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.nativeEvent.isComposing || e.keyCode === 229)) e.preventDefault()
          }}
          placeholder="Ask anything about your rebooking"
          autoComplete="off"
          className="h-11 min-w-0 flex-1 rounded-full border bg-background px-4 text-[15px] outline-none placeholder:text-muted-foreground focus-visible:border-foreground"
        />
        <button
          type="submit"
          disabled={!value.trim() || disabled}
          aria-label="Send message"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}
