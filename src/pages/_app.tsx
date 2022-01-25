import "antd/dist/antd.variable.min.css";
import "../styles/globals.scss";

import type { AppProps } from "next/app";

import { ConnectionManager } from "../common/components/ConnectionManager";
import { ViewportProvider } from "../context/index";
import { PeerplaysApiProvider } from "../modules/peerplaysApi";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ViewportProvider>
      <PeerplaysApiProvider>
        <ConnectionManager>
          <Component {...pageProps} />
        </ConnectionManager>
      </PeerplaysApiProvider>
    </ViewportProvider>
  );
}

export default App;
