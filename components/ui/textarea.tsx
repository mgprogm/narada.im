import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-control bg-control px-3 py-2 text-base text-foreground ring-offset-background placeholder:text-foreground-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:border-strong disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-colors resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
