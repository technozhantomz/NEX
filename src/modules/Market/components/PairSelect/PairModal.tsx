import { Form, Select } from "../../../../ui/src";

import * as Styled from "./PairModal.styled";
import { usePairModal } from "./hooks";

type Props = {
  visible: boolean;
  onCancel: () => void;
};

const { Option } = Select;

export const PairModal = ({ visible, onCancel }: Props): JSX.Element => {
  const {
    pairModalForm,
    assets,
    recentPairs,
    formValdation,
    useResetFormOnCloseModal,
    updatePair,
  } = usePairModal();

  useResetFormOnCloseModal(pairModalForm, visible);

  return (
    <Styled.PairModal
      title="Selet Pair"
      visible={visible}
      centered={true}
      onOk={pairModalForm.submit}
      onCancel={onCancel}
      //   footer={null}
    >
      <Styled.PairModalForm
        form={pairModalForm}
        name="pairModal"
        size="large"
        onFinish={updatePair}
      >
        <Form.Item
          name="quote"
          validateFirst={true}
          rules={formValdation.quote}
        >
          <Select defaultValue={assets[0]}>
            {assets.map((asset) => (
              <Option value={asset}>{asset}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="base" validateFirst={true} rules={formValdation.base}>
          <Select defaultValue={assets[1]}>
            {assets.map((asset) => (
              <Option value={asset}>{asset}</Option>
            ))}
          </Select>
        </Form.Item>
        <p>Recent Pairs</p>
        <Form.Item
          name="recents"
          validateFirst={true}
          //rules={formValdation.recents}
        >
          <Select defaultValue={recentPairs[0]}>
            {recentPairs.map((pair) => (
              <Option value={pair}>{pair}</Option>
            ))}
          </Select>
        </Form.Item>
      </Styled.PairModalForm>
    </Styled.PairModal>
  );
};
