import { MetaMaskProvider } from "metamask-react";
import type { AppProps } from "next/app";

import {
  AppSettingsProvider,
  AssetsProvider,
  BrowserHistoryProvider,
  ConnectionManagerProvider,
  FeesProvider,
  MenuProvider,
  NotificationsProvider,
  PeerLinkProvider,
  PeerplaysApiProvider,
  UserProvider,
  ViewportProvider,
} from "../common/providers";
import "../ui/src/ui.less";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ViewportProvider>
      <MetaMaskProvider>
        <PeerLinkProvider>
          <AppSettingsProvider>
            <PeerplaysApiProvider>
              <ConnectionManagerProvider>
                <AssetsProvider>
                  <FeesProvider>
                    <UserProvider>
                      <BrowserHistoryProvider>
                        <NotificationsProvider>
                          <MenuProvider>
                            <Component {...pageProps} />
                          </MenuProvider>
                        </NotificationsProvider>
                      </BrowserHistoryProvider>
                    </UserProvider>
                  </FeesProvider>
                </AssetsProvider>
              </ConnectionManagerProvider>
            </PeerplaysApiProvider>
          </AppSettingsProvider>
        </PeerLinkProvider>
      </MetaMaskProvider>
    </ViewportProvider>
  );
}

export default App;
