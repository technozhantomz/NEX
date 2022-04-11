export type GenerateBitcoinAddressResult = {
  visible: boolean;
  onFormFinish: (name: string, info: { values: any; forms: any }) => void;
  onCancel: () => void;
  confirm: () => void;
  status: string;
  loading: boolean;
};
