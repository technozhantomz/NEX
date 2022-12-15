import { MetaMaskProvider } from "metamask-react";
import type { AppProps } from "next/app";

import {
  AssetsProvider,
  BrowserHistoryProvider,
  ConnectionManagerProvider,
  FeesProvider,
  MenuProvider,
  PeerLinkProvider,
  PeerplaysApiProvider,
  SettingsProvider,
  UserProvider,
  UserSettingsProvider,
  ViewportProvider,
} from "../common/providers";
import "../ui/src/ui.less";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ViewportProvider>
      <MetaMaskProvider>
        <PeerLinkProvider>
          <SettingsProvider>
            <PeerplaysApiProvider>
              <ConnectionManagerProvider>
                <AssetsProvider>
                  <UserProvider>
                    <FeesProvider>
                      <BrowserHistoryProvider>
                        <UserSettingsProvider>
                          <MenuProvider>
                            <Component {...pageProps} />
                          </MenuProvider>
                        </UserSettingsProvider>
                      </BrowserHistoryProvider>
                    </FeesProvider>
                  </UserProvider>
                </AssetsProvider>
              </ConnectionManagerProvider>
            </PeerplaysApiProvider>
          </SettingsProvider>
        </PeerLinkProvider>
      </MetaMaskProvider>
    </ViewportProvider>
  );
}

export default App;
