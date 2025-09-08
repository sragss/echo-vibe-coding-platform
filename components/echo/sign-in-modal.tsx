'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'


export function EchoSignInModal() {
  const [isOpen, setIsOpen] = useState(true)

  const handleSignIn = () => {
    // Redirect to Echo sign in endpoint
    window.location.href = '/api/echo/signin'
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="sr-only">Sign In to Echo</DialogTitle>
        <div className="flex flex-col items-center space-y-6 py-6">
          <Button onClick={handleSignIn} className="w-full flex items-center space-x-3 bg-white text-black hover:bg-gray-100 border border-gray-200 hover:border-gray-300 cursor-pointer">
            <Image 
              src="https://echo.merit.systems/logo/light.svg" 
              alt="Echo" 
              width={24} 
              height={24}
              className="flex-shrink-0"
            />
            <span className="font-bold">Sign In</span>
          </Button>
          
          <p className="text-xs font-light text-gray-500 text-center">
            Forked from Vercel's{' '}
            <a 
              href="https://github.com/vercel/examples/tree/main/apps/vibe-coding-platform" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline"
            >
              OSS Vibe-Coding-Platform
            </a>
          </p>

        </div>
      </DialogContent>
    </Dialog>
  )
}