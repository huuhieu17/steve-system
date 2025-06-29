"use client"

import SafariAppOptimized from "@/components/apps/SafariApp"

interface IOSSafariAppProps {
  onClose: () => void
}

export default function IOSSafariApp({ onClose }: IOSSafariAppProps) {
  return (
    <div className="h-screen w-full bg-white">
      {/* Minimal Dynamic Island space */}
      <div className="h-6 bg-black"></div>

      {/* Safari content với full remaining height */}
      <div className="h-[calc(100vh-24px)]">
        <SafariAppOptimized onClose={onClose} isMobile={true} />
      </div>
    </div>
  )
}
