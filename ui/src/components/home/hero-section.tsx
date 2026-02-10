import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { Button } from '../ui/button'

function MarkLinkSymbol() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Outer animated ring */}
      <circle
        cx="200"
        cy="200"
        r="180"
        stroke="url(#ringGradient)"
        strokeWidth="1"
        fill="none"
        className="animate-spin"
        style={{ animationDuration: '30s', transformOrigin: 'center' }}
      />

      {/* Inner ring */}
      <circle
        cx="200"
        cy="200"
        r="160"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.15"
        fill="none"
      />

      {/* Main document icon */}
      <g transform="translate(120, 80)" className="text-foreground">
        {/* Document shape */}
        <path
          d="M0 0 L100 0 L160 60 L160 240 L0 240 Z"
          fill="currentColor"
          fillOpacity="0.03"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.2"
        />
        {/* Fold corner */}
        <path
          d="M100 0 L100 60 L160 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.2"
        />

        {/* Document lines */}
        <rect
          x="20"
          y="100"
          width="120"
          height="4"
          rx="2"
          fill="currentColor"
          fillOpacity="0.4"
        />
        <rect
          x="20"
          y="120"
          width="120"
          height="4"
          rx="2"
          fill="currentColor"
          fillOpacity="0.25"
        />
        <rect
          x="20"
          y="140"
          width="80"
          height="4"
          rx="2"
          fill="currentColor"
          fillOpacity="0.25"
        />
        <rect
          x="20"
          y="160"
          width="100"
          height="4"
          rx="2"
          fill="currentColor"
          fillOpacity="0.15"
        />
        <rect
          x="20"
          y="180"
          width="60"
          height="4"
          rx="2"
          fill="currentColor"
          fillOpacity="0.15"
        />
      </g>

      {/* Link / Connection dot */}
      <g transform="translate(220, 220)" className="text-primary">
        <circle r="30" fill="currentColor" fillOpacity="0.1" />
        <circle r="12" fill="currentColor" fillOpacity="0.3" />
        <circle r="6" fill="currentColor" />
      </g>

      {/* Floating dots - connection points */}
      <g className="text-primary">
        <circle cx="80" cy="200" r="8" fill="currentColor" fillOpacity="0.2" />
        <circle cx="320" cy="200" r="8" fill="currentColor" fillOpacity="0.2" />
        <circle cx="200" cy="80" r="8" fill="currentColor" fillOpacity="0.2" />
        <circle cx="200" cy="320" r="8" fill="currentColor" fillOpacity="0.2" />
      </g>
    </svg>
  )
}

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden w-full bg-primary/5">
      {/* Animated Background Elements */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      >
        {/* Primary gradient orbs */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl opacity-50"
        />
      </div>

      <div
        className="container-fluid-body flex flex-col-reverse lg:flex-row
          items-center gap-12 py-20 lg:py-16 relative z-10"
      >
        {/* Left Column: Text Content */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1
              className="text-3xl lg:text-5xl font-bold tracking-tight
                text-foreground leading-[1.1]"
            >
              Share Your Article <br />
              <span className="text-primary">Connect the World</span>
            </h1>
            <p
              className="text-lg text-muted-foreground leading-relaxed max-w-2xl
                mx-auto lg:mx-0"
            >
              MarkLink is the platform for writers, thinkers, and creators.
              Write beautiful articles, build your audience, and discover great
              content.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex items-center justify-center lg:justify-start">
            <Button className="text-base h-10 px-6">
              Get Started
              <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right Column: Illustration */}
        <div
          className="flex-1 relative w-full max-w-[400px] lg:max-w-none flex
            justify-center hidden lg:block"
        >
          <div className="relative w-full max-w-[350px]">
            {/* Glow effect behind illustration */}
            <div className="absolute inset-0 bg-primary/10 blur-3xl scale-125" />

            {/* Symbol container */}
            <div className="relative w-full aspect-square text-foreground">
              <MarkLinkSymbol />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
