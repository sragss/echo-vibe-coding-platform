import Image from 'next/image'
import { EchoBalanceServerWrapper } from '@/components/echo/balance-server-wrapper'
import { Github } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export async function Header({ className }: Props) {
  return (
    <header className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center">
        <Image 
          src="/apple-touch-icon.png" 
          alt="Vibes" 
          width={32} 
          height={32} 
          className="ml-1 md:ml-2.5 mr-1.5" 
        />
        <span className="hidden md:inline text-sm uppercase font-mono font-bold tracking-tight">
          Vibes
        </span>
      </div>
      <div className="flex items-center ml-auto space-x-3">
        <a 
          href="https://github.com/sragss/echo-vibe-coding-platform" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github size={20} />
        </a>
        <EchoBalanceServerWrapper />
      </div>
    </header>
  )
}
