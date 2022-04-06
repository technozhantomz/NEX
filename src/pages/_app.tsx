import type { AppProps } from "next/app";

import {
  ConnectionManager,
  HistoryProvider,
  PeerplaysApiProvider,
  SettingsProvider,
  UserProvider,
  ViewportProvider,
} from "../common/components";
import "../ui/src/ui.less";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ViewportProvider>
      <SettingsProvider>
        <PeerplaysApiProvider>
          <ConnectionManager>
            <HistoryProvider>
              <UserProvider>
                <Component {...pageProps} />
              </UserProvider>
            </HistoryProvider>
          </ConnectionManager>
        </PeerplaysApiProvider>
      </SettingsProvider>
    </ViewportProvider>
  );
}

export default App;
