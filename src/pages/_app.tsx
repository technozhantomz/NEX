import type { AppProps } from "next/app";

import {
  BrowserHistoryProvider,
  ConnectionManager,
  MenuProvider,
  PeerplaysApiProvider,
  SettingsProvider,
  UserProvider,
  ViewportProvider,
} from "../common/providers";
import "../ui/src/ui.less";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ViewportProvider>
      <SettingsProvider>
        <PeerplaysApiProvider>
          <ConnectionManager>
            <UserProvider>
              <BrowserHistoryProvider>
                <MenuProvider>
                  <Component {...pageProps} />
                </MenuProvider>
              </BrowserHistoryProvider>
            </UserProvider>
          </ConnectionManager>
        </PeerplaysApiProvider>
      </SettingsProvider>
    </ViewportProvider>
  );
}

export default App;
