import type { AppProps } from "next/app";

import {
  AppSettingsProvider,
  AssetsProvider,
  BrowserHistoryProvider,
  ConnectionManagerProvider,
  FeesProvider,
  MenuProvider,
  NotificationsProvider,
  PeerplaysApiProvider,
  UserProvider,
  ViewportProvider,
} from "../common/providers";
import "../ui/src/ui.less";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ViewportProvider>
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
    </ViewportProvider>
  );
}

export default App;
