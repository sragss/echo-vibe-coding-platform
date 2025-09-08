'use client'

import { useState, useEffect } from 'react'
import { useEcho } from '@merit-systems/echo-next-sdk/client'

interface Props {
  isSignedIn: boolean
}

export function EchoBalanceDisplay({ isSignedIn }: Props) {
  const [balance, setBalance] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const echoClient = useEcho()

  useEffect(() => {
    const fetchBalance = async () => {
      if (!isSignedIn) {
        setIsLoading(false)
        return
      }

      try {
        console.log('Fetching balance...')
        const balanceResponse = await echoClient.balance.getBalance()
        console.log('Balance response:', balanceResponse)
        setBalance(balanceResponse.balance)
      } catch (error) {
        console.error('Failed to fetch balance:', error)
        setError(error instanceof Error ? error.message : 'Unknown error')
        setBalance(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBalance()
  }, [echoClient, isSignedIn])

  // Don't show anything if not signed in
  if (!isSignedIn) {
    return null
  }

  // Show loading state for debugging
  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-sm font-mono text-gray-400">
        Loading balance...
      </div>
    )
  }

  // Show error state for debugging
  if (error) {
    return (
      <div className="flex items-center space-x-2 text-sm font-mono text-red-400">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2 text-sm font-mono">
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      <span className="text-muted-foreground">Balance:</span>
      <span className="font-semibold">
        ${balance !== null ? balance.toFixed(2) : '--'}
      </span>
    </div>
  )
}