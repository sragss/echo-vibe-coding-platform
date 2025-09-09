'use client'

import { useSandboxStore } from '@/app/state'
import { useSettings } from '@/components/settings/use-settings'

export function StimLoading() {
  const { chatStatus } = useSandboxStore()
  const { stimLoading } = useSettings()

  if (!stimLoading || chatStatus === 'ready') {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/25 flex items-center justify-center p-[12.5%] pointer-events-none">
      <video
        src="/subwaysurfers.mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-contain"
      />
    </div>
  )
}