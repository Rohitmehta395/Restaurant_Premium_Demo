"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="bottom-center"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={{
        // FARMform warm neutral palette
        "--normal-bg": "var(--color-surface-default)",
        "--normal-text": "var(--color-text-primary)",
        "--normal-border": "var(--color-border-subtle)",
        "--border-radius": "var(--radius-base)",
        "--success-bg": "var(--color-surface-default)",
        "--success-text": "var(--color-text-primary)",
        "--error-bg": "var(--color-surface-default)",
        "--error-text": "var(--color-text-primary)",
      } as React.CSSProperties}
      {...props}
    />
  )
}

export { Toaster }
