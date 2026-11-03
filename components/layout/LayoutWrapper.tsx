import React from 'react'

// The header floats over the page, so every page hero owns its own top padding.
export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex-1">{children}</div>
}
