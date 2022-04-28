import { FormInstance, Rule } from "../../../../../../../ui/src";

export type UseProxyForm = {
  proxyForm: FormInstance<ProxyForm>;
  formValidator: FormValidation;
  submittingPassword: boolean;
  isPasswordModalVisible: boolean;
  confirm: () => void;
  handlePasswordModalCancel: () => void;
  handleSearch: (name: string) => Promise<void>;
  onFormFinish: (name: string, info: { values: any; forms: any }) => void;
};

export type ProxyForm = {
  usersToProxy: string[];
};

export type FormValidation = {
  proxyUsername: Rule[];
};
