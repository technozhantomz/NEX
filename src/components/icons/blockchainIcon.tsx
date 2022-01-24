import Icon from "@ant-design/icons";
import { IconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { RefAttributes } from "react";

const BlockchainSVG = () => {
  return (
    <svg height="1em" viewBox="0 0 24 24" width="1em" fill="currentColor">
      <defs>
        <path
          d="M15 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zM3 12a5.99 5.99 0 0 1 4-5.65V4.26C3.55 5.15 1 8.27 1 12c0 3.73 2.55 6.85 6 7.74v-2.09A5.99 5.99 0 0 1 3 12z"
          id="blockChain"
        />
      </defs>
      <g transform="translate(-1 -3.5)" fill="none" fillRule="evenodd">
        <mask id="blockChainMask" fill="#fff">
          <use xlinkHref="#blockChain" />
        </mask>
        <g className="mask" mask="url(#blockChainMask)" fill="#647090">
          <path d="M0 0h24v24H0z" />
        </g>
      </g>
    </svg>
  );
};

const BlockchainIcon = (
  props: JSX.IntrinsicAttributes &
    IconComponentProps &
    RefAttributes<HTMLSpanElement>
): JSX.Element => {
  return <Icon component={BlockchainSVG} {...props} />;
};

export default BlockchainIcon;
