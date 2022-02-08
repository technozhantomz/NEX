import type { AppProps } from "next/app";

import { ConnectionManager } from "../common/components/ConnectionManager";
import { UserProvider, ViewportProvider } from "../context/index";
import { PeerplaysApiProvider } from "../modules/peerplaysApi";

import "../ui/src/ui.less";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ViewportProvider>
      <PeerplaysApiProvider>
        <ConnectionManager>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </ConnectionManager>
      </PeerplaysApiProvider>
    </ViewportProvider>
  );
}

export default App;
