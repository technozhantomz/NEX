import type { AppProps } from "next/app";

import {
  AssetsProvider,
  BrowserHistoryProvider,
  ConnectionManager,
  FeesProvider,
  MenuProvider,
  PeerplaysApiProvider,
  SettingsProvider,
  UserProvider,
  ViewportProvider,
} from "../common/providers";
import "../ui/src/ui.less";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ViewportProvider>
      <SettingsProvider>
        <PeerplaysApiProvider>
          <ConnectionManager>
            <AssetsProvider>
              <UserProvider>
                <FeesProvider>
                  <BrowserHistoryProvider>
                    <MenuProvider>
                      <Component {...pageProps} />
                    </MenuProvider>
                  </BrowserHistoryProvider>
                </FeesProvider>
              </UserProvider>
            </AssetsProvider>
          </ConnectionManager>
        </PeerplaysApiProvider>
      </SettingsProvider>
    </ViewportProvider>
  );
}

export default App;
