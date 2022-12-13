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
  SideChainProvider,
  UserProvider,
  UserSettingsProvider,
  ViewportProvider,
} from "../common/providers";
import "../ui/src/ui.less";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ViewportProvider>
      <MetaMaskProvider>
        <SettingsProvider>
          <PeerplaysApiProvider>
            <ConnectionManagerProvider>
              <AssetsProvider>
                <UserProvider>
                  <SideChainProvider>
                    <FeesProvider>
                      <BrowserHistoryProvider>
                        <UserSettingsProvider>
                          <MenuProvider>
                            <PeerLinkProvider>
                              <Component {...pageProps} />
                            </PeerLinkProvider>
                          </MenuProvider>
                        </UserSettingsProvider>
                      </BrowserHistoryProvider>
                    </FeesProvider>
                  </SideChainProvider>
                </UserProvider>
              </AssetsProvider>
            </ConnectionManagerProvider>
          </PeerplaysApiProvider>
        </SettingsProvider>
      </MetaMaskProvider>
    </ViewportProvider>
  );
}

export default App;
