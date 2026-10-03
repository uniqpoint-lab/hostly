import { cn } from '@/lib/utils'

type MessageBubbleProps = {
  role: 'assistant' | 'user'
  children: React.ReactNode
  className?: string
}

export function MessageBubble({ role, children, className }: MessageBubbleProps) {
  const isUser = role === 'user'
  return (
    <div
      className={cn(
        'flex animate-in fade-in slide-in-from-bottom-2 duration-300',
        isUser ? 'justify-end' : 'justify-start',
      )}
    >
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed text-pretty',
          isUser
            ? 'rounded-br-md bg-foreground text-background'
            : 'rounded-bl-md bg-muted text-foreground',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex justify-start" role="status" aria-label="Assistant is typing">
      <div className="flex gap-1 rounded-2xl rounded-bl-md bg-muted px-4 py-3.5">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  )
}
