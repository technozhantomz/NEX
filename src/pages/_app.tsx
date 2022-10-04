import type { AppProps } from "next/app";

import {
  AssetsProvider,
  BrowserHistoryProvider,
  ConnectionManagerProvider,
  FeesProvider,
  MenuProvider,
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
                          <p> hello world </p> 
                      </MenuProvider>
                    </UserSettingsProvider>
                  </BrowserHistoryProvider>
                </FeesProvider>
              </UserProvider>
            </AssetsProvider>
          </ConnectionManagerProvider>
        </PeerplaysApiProvider>
      </SettingsProvider>
    </ViewportProvider>
  );
}

export default App;
