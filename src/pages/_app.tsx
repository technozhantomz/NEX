import type { AppProps } from "next/app";

import { ConnectionManager2 } from "../common/components";
import {
  AssetsProvider,
  BrowserHistoryProvider,
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
          <ConnectionManager2>
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
          </ConnectionManager2>
        </PeerplaysApiProvider>
      </SettingsProvider>
    </ViewportProvider>
  );
}

export default App;
