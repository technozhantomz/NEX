import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
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
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

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
                      <UserSettingsProvider>
                        <BrowserHistoryProvider>
                          <MenuProvider>
                            <Component {...pageProps} />
                          </MenuProvider>
                        </BrowserHistoryProvider>
                      </UserSettingsProvider>
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
