import type { AppProps } from "next/app";

import { ConnectionManager } from "../common/components/ConnectionManager";
import { PeerplaysApiProvider } from "../common/components/PeerplaysApiProvider";
import { SettingsProvider } from "../common/components/SettingsProvider/SettingsProvider";
import { UserProvider } from "../common/components/UserProvider/UserProvider";
import { ViewportProvider } from "../common/components/ViewportProvider";

import "../ui/src/ui.less";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ViewportProvider>
      <SettingsProvider>
        <PeerplaysApiProvider>
          <ConnectionManager>
            <UserProvider>
              <Component {...pageProps} />
            </UserProvider>
          </ConnectionManager>
        </PeerplaysApiProvider>
      </SettingsProvider>
    </ViewportProvider>
  );
}

export default App;
