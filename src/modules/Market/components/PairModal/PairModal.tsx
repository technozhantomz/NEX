import { Dispatch, SetStateAction } from "react";

import { Exchanges } from "../../../../common/types";
import { Form, Select } from "../../../../ui/src";

import * as Styled from "./PairModal.styled";
import { usePairModal } from "./hooks";

type Props = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  currentPair: string;
  exchanges: Exchanges;
};

const { Option } = Select;

export const PairModal = ({
  isVisible,
  setIsVisible,
  currentPair,
  exchanges,
}: Props): JSX.Element => {
  const {
    pairModalForm,
    formValdation,
    allAssetsSymbols,
    useResetFormOnCloseModal,
    handleCancel,
    handleSelectPair,
    handleSelectRecent,
  } = usePairModal({ setIsVisible, currentPair });

  useResetFormOnCloseModal(pairModalForm, isVisible);
  return (
    <Styled.PairModal
      title="Selet Pair"
      visible={isVisible}
      centered={true}
      onOk={pairModalForm.submit}
      onCancel={handleCancel}
    >
      <Styled.PairModalForm
        form={pairModalForm}
        onFinish={handleSelectPair}
        initialValues={{
          base: currentPair.split("_")[1],
          quote: currentPair.split("_")[0],
          recents: exchanges.list[exchanges.list.length - 1],
        }}
        name="pairModal"
        size="large"
      >
        <Form.Item
          name="quote"
          validateFirst={true}
          rules={formValdation.quote}
        >
          <Select>
            {allAssetsSymbols.map((asset) => (
              <Option value={asset} key={`${asset}_quote`}>
                {asset}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="base" validateFirst={true} rules={formValdation.base}>
          <Select>
            {allAssetsSymbols.map((asset) => (
              <Option value={asset} key={`${asset}_base`}>
                {asset}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <p>Recent Pairs</p>
        <Form.Item name="recents">
          <Select onSelect={handleSelectRecent}>
            {exchanges.list.map((pair) => (
              <Option value={pair} key={pair}>
                {pair}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Styled.PairModalForm>
    </Styled.PairModal>
  );
};
