import { isSignedIn } from '@/src/echo'
import { EchoBalanceDisplay } from './balance-display'

export async function EchoBalanceServerWrapper() {
  const signedIn = await isSignedIn()
  
  return <EchoBalanceDisplay isSignedIn={signedIn} />
}