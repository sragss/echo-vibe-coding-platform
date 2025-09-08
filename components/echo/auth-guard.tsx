import { isSignedIn } from '@/src/echo'
import { EchoSignInModal } from './sign-in-modal'

interface Props {
  children: React.ReactNode
}

export async function EchoAuthGuard({ children }: Props) {
  const signedIn = await isSignedIn()
  
  return (
    <>
      {!signedIn && <EchoSignInModal />}
      {children}
    </>
  )
}