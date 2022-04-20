import { Exchanges } from "../../../../common/types";
import { Form, FormInstance, Select } from "../../../../ui/src";

import * as Styled from "./PairModal.styled";
import { FormValidation, PairForm } from "./hooks/usePairModal.types";

type Props = {
  isVisible: boolean;
  pairModalForm: FormInstance<PairForm>;
  allAssetsSymbols: string[];
  formValdation: FormValidation;
  useResetFormOnCloseModal: (
    form: FormInstance<PairForm>,
    visible: boolean
  ) => void;
  handleCancel: () => void;
  handleSelectPair: () => void;
  handleSelectRecent: (value: string) => void;
  exchanges: Exchanges;
};

const { Option } = Select;

export const PairModal = ({
  isVisible,
  pairModalForm,
  allAssetsSymbols,
  formValdation,
  useResetFormOnCloseModal,
  handleCancel,
  handleSelectPair,
  handleSelectRecent,
  exchanges,
}: Props): JSX.Element => {
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
          base: exchanges.active.split("_")[1],
          quote: exchanges.active.split("_")[0],
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
