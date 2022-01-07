import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PeerplaysApiProvider } from '../modules/peerplaysApi'
import { ConnectionManager } from '../common/components/ConnectionManager'



function App({ Component, pageProps }: AppProps) {
    return (
      <PeerplaysApiProvider>
        <ConnectionManager>
          <Component {...pageProps} />
        </ConnectionManager>
      </PeerplaysApiProvider>
    )
  }

export default App
