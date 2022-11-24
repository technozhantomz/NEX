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
    </ViewportProvider>
  );
}

export default App;
