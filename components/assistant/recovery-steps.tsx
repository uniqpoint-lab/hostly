import { Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type RecoveryStep = {
  title: string
  detail: string
}

type RecoveryStepsProps = {
  steps: RecoveryStep[]
  completedCount: number
}

export function RecoverySteps({ steps, completedCount }: RecoveryStepsProps) {
  return (
    <ol
      className="animate-in fade-in slide-in-from-bottom-2 space-y-3 rounded-2xl border bg-card p-4 duration-300"
      aria-live="polite"
    >
      {steps.map((step, index) => {
        const isDone = index < completedCount
        const isActive = index === completedCount
        return (
          <li key={step.title} className="flex gap-3">
            <span
              className={cn(
                'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors',
                isDone && 'border-success bg-success text-success-foreground',
                isActive && 'border-foreground/30',
                !isDone && !isActive && 'border-border',
              )}
              aria-hidden="true"
            >
              {isDone ? (
                <Check className="size-3.5" strokeWidth={3} />
              ) : isActive ? (
                <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
              ) : null}
            </span>
            <div className={cn('min-w-0', !isDone && 'opacity-50')}>
              <p className="text-sm font-semibold">
                {step.title}
                <span className="sr-only">{isDone ? ' — complete' : ' — in progress'}</span>
              </p>
              <p className="text-xs text-muted-foreground">{step.detail}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
