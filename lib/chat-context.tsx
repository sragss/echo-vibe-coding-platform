'use client'

import { type ChatUIMessage } from '@/components/chat/types'
import { type ReactNode } from 'react'
import { Chat } from '@ai-sdk/react'
import { DataPart } from '@/ai/messages/data-parts'
import { DataUIPart } from 'ai'
import { createContext, useContext, useMemo, useRef } from 'react'
import { useDataStateMapper, useSandboxStore } from '@/app/state'
import { mutate } from 'swr'
import { toast } from 'sonner'

interface ChatContextValue {
  chat: Chat<ChatUIMessage>
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const mapDataToState = useDataStateMapper()
  const mapDataToStateRef = useRef(mapDataToState)
  mapDataToStateRef.current = mapDataToState

  const { showOutOfFundsModal } = useSandboxStore()

  const chat = useMemo(
    () =>
      new Chat<ChatUIMessage>({
        onToolCall: () => mutate('/api/auth/info'),
        onData: (data: DataUIPart<DataPart>) => mapDataToStateRef.current(data),
        onError: (error) => {
          console.error('Chat onError:', error)
          const errorObj = error as { status?: number; statusCode?: number; code?: number; message?: string; response?: unknown }
          console.error('Error details:', {
            status: errorObj.status,
            statusCode: errorObj.statusCode,
            code: errorObj.code,
            message: errorObj.message,
            response: errorObj.response
          })
          
          // Check for 402 status codes
          if (errorObj.status === 402 || errorObj.statusCode === 402 || errorObj.code === 402) {
            showOutOfFundsModal()
            return
          }
          
          // Check for payment required in message content
          const errorMsg = errorObj.message || ''
          if (errorMsg.includes('PAYMENT_REQUIRED') || 
              errorMsg.includes('Payment required') || 
              errorMsg.includes('payment required') ||
              errorMsg === 'Payment Required') {
            showOutOfFundsModal()
            return
          }
          
          toast.error(`Communication error with the AI: ${errorObj.message || 'Unknown error'}`)
          console.error('Error sending message:', error)
        }
      }),
    [showOutOfFundsModal]
  )

  return (
    <ChatContext.Provider value={{ chat }}>{children}</ChatContext.Provider>
  )
}

export function useSharedChatContext() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useSharedChatContext must be used within a ChatProvider')
  }
  return context
}
