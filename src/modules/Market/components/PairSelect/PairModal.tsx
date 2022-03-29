import { Form, Select } from "../../../../ui/src";

import * as Styled from "./PairModal.styled";
import { usePairModal } from "./hooks";

type Props = {
  visible: boolean;
  recentPairs: string[];
  onCancel: () => void;
};

const { Option } = Select;

export const PairModal = ({
  visible,
  recentPairs,
  onCancel,
}: Props): JSX.Element => {
  const {
    pairModalForm,
    assets,
    formValdation,
    useResetFormOnCloseModal,
    onSeletRecent,
  } = usePairModal(recentPairs);

  useResetFormOnCloseModal(pairModalForm, visible);

  return (
    <Styled.PairModal
      title="Selet Pair"
      visible={visible}
      centered={true}
      onOk={pairModalForm.submit}
      onCancel={onCancel}
    >
      <Styled.PairModalForm form={pairModalForm} name="pairModal" size="large">
        <Form.Item
          name="quote"
          validateFirst={true}
          rules={formValdation.quote}
        >
          <Select>
            {assets.map((asset) => (
              <Option value={asset}>{asset}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="base" validateFirst={true} rules={formValdation.base}>
          <Select>
            {assets.map((asset) => (
              <Option value={asset}>{asset}</Option>
            ))}
          </Select>
        </Form.Item>
      </Styled.PairModalForm>
      <p>Recent Pairs</p>
      <Form.Item name="recents">
        <Select onSelect={onSeletRecent} defaultValue={recentPairs[0]}>
          {recentPairs.map((pair) => (
            <Option value={pair}>{pair}</Option>
          ))}
        </Select>
      </Form.Item>
    </Styled.PairModal>
  );
};
