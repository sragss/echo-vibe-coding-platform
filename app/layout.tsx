import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ChatProvider } from '@/lib/chat-context'
import { CommandLogsStream } from '@/components/commands-logs/commands-logs-stream'
import { ErrorMonitor } from '@/components/error-monitor/error-monitor'
import { OutOfFundsModal } from '@/components/modals/out-of-funds-modal'
import { SandboxState } from '@/components/modals/sandbox-state'
import { Toaster } from '@/components/ui/sonner'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'

const title = 'Vibes'
const description = `This is a demo of an end-to-end coding platform where the user can enter text prompts, and the agent will create a full stack application. It uses Vercel's AI Cloud services like Sandbox for secure code execution, AI Gateway for GPT-5 and other models support, Fluid Compute for efficient rendering and streaming, and it's built with Next.js and the AI SDK.`

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    images: [
      {
        url: '/og.png',
        width: 1344,
        height: 768,
        alt: 'Vibes - End-to-end coding platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: '/og.png',
        width: 1344,
        height: 768,
        alt: 'Vibes - End-to-end coding platform',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Suspense fallback={null}>
          <NuqsAdapter>
            <ChatProvider>
              <ErrorMonitor>{children}</ErrorMonitor>
            </ChatProvider>
          </NuqsAdapter>
        </Suspense>
        <Toaster />
        <CommandLogsStream />
        <SandboxState />
        <OutOfFundsModal />
      </body>
    </html>
  )
}
