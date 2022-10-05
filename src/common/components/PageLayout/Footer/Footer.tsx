import counterpart from "counterpart";

import { LoadingIndicator } from "../..";
import { usePeerplaysApiContext } from "../../../providers";

import * as Styled from "./Footer.styled";
import { ChoiceModal } from "./components";
import { useFooter } from "./hooks";

export const Footer = (): JSX.Element => {
  const {
    isOutOfSyncModalVisible,
    hideOutOfSyncModal,
    triggerReconnect,
    getForceReconnectAfterSeconds,
    getBlockTimeDelta,
    synced,
    connected,
  } = useFooter();
  const { isTransitionInProgress, getTransitionTarget, isAutoSelection } =
    usePeerplaysApiContext();

  const choiceModalContent = (
    <div>
      <span>
        {counterpart.translate("connection.out_of_sync", {
          out_of_sync_seconds: String(getBlockTimeDelta()),
        })}
      </span>

      <br />
      <br />
      <span>{counterpart.translate("connection.want_to_reconnect")}</span>

      {isAutoSelection() && (
        <span>
          {counterpart.translate(`connection.automatic_reconnect`, {
            reconnect_in_seconds: String(getForceReconnectAfterSeconds()),
          })}
        </span>
      )}
    </div>
  );
  return (
    <>
      {isTransitionInProgress() && (
        <LoadingIndicator
          loadingText={getTransitionTarget() as string | boolean}
        />
      )}
      <Styled.Footer>
        <ChoiceModal
          hideModal={hideOutOfSyncModal}
          visible={isOutOfSyncModalVisible}
          choices={[
            {
              translationKey: "connection.manual_reconnect",
              callback: () => {
                if (!synced) {
                  triggerReconnect(false);
                }
              },
            },
          ]}
          content={choiceModalContent}
        />
        <Styled.ConnectionStatusWrapper>
          {synced ? null : (
            <Styled.NoSync>
              {counterpart.translate(`footer.nosync`)}
            </Styled.NoSync>
          )}
          {!connected ? (
            <Styled.NotConnected className="grid-block shrink txtlabel error">
              {counterpart.translate(`footer.no_connection`)}
            </Styled.NotConnected>
          ) : null}
        </Styled.ConnectionStatusWrapper>
      </Styled.Footer>
    </>
  );
};
