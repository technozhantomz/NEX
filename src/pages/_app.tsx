import "../styles/globals.css";

import type { AppProps } from "next/app";

import { ConnectionManager } from "../common/components/ConnectionManager";
import { PeerplaysApiProvider } from "../modules/peerplaysApi";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <PeerplaysApiProvider>
      <ConnectionManager>
        <Component {...pageProps} />
      </ConnectionManager>
    </PeerplaysApiProvider>
  );
}

export default App;
