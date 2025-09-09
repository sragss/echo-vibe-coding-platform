'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useSandboxStore } from '@/app/state'
import { useEcho } from '@merit-systems/echo-next-sdk/client'

export function OutOfFundsModal() {
  const { outOfFundsModalOpen, setOutOfFundsModalOpen } = useSandboxStore()
  const [isGeneratingPaymentUrl, setIsGeneratingPaymentUrl] = useState(false)
  const echoClient = useEcho({ appId: '51c83455-e242-42b7-9c3d-6bba7b2e0e55' })

  const handleAddFunds = async () => {
    try {
      setIsGeneratingPaymentUrl(true)
      
      // Use the Echo client from the Next SDK
      const paymentUrl = await echoClient.payments.getPaymentUrl(
        10, // $10 default amount
        'Echo Platform Credits',
        window.location.href // Return to current page after payment
      )
      
      // Open payment URL in new tab
      window.open(paymentUrl, '_blank')
      
    } catch (error) {
      console.error('Failed to generate payment URL:', error)
      
      // Fallback to manual dashboard visit
      const userConfirmed = window.confirm(
        'Payment link generation failed. Would you like to visit the Echo dashboard to add funds manually?'
      )
      
      if (userConfirmed) {
        window.open('https://echo.merit.systems/dashboard', '_blank')
      }
    } finally {
      setIsGeneratingPaymentUrl(false)
    }
  }

  return (
    <Dialog open={outOfFundsModalOpen} onOpenChange={setOutOfFundsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Out of Funds</DialogTitle>
          <DialogDescription>
            You have run out of funds to continue using AI features. Please add funds to your account to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            You can add funds by creating a payment link or visiting your Echo dashboard directly.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOutOfFundsModalOpen(false)}>
            Close
          </Button>
          <Button onClick={handleAddFunds} disabled={isGeneratingPaymentUrl}>
            {isGeneratingPaymentUrl ? 'Creating Payment Link...' : 'Add $10 Credits'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}