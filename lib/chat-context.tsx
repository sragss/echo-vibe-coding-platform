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
        api: '/api/chat',
        onToolCall: () => mutate('/api/auth/info'),
        onData: (data: DataUIPart<DataPart>) => mapDataToStateRef.current(data),
        onError: (error) => {
          console.error('Chat onError:', error)
          console.error('Error details:', {
            status: error.status,
            statusCode: error.statusCode,
            code: error.code,
            message: error.message,
            response: error.response
          })
          
          // Check for 402 status codes
          if (error.status === 402 || error.statusCode === 402 || error.code === 402) {
            showOutOfFundsModal()
            return
          }
          
          // Check for payment required in message content
          const errorMsg = error.message || ''
          if (errorMsg.includes('PAYMENT_REQUIRED') || 
              errorMsg.includes('Payment required') || 
              errorMsg.includes('payment required') ||
              errorMsg === 'Payment Required') {
            showOutOfFundsModal()
            return
          }
          
          toast.error(`Communication error with the AI: ${error.message}`)
          console.error('Error sending message:', error)
        },
        onResponse: async (response) => {
          console.log('Chat onResponse:', response.status, response.statusText)
          if (response.status === 402) {
            showOutOfFundsModal()
            return
          }
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
