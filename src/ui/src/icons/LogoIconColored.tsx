import Icon from "@ant-design/icons";
import { IconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { RefAttributes } from "react";

import { colors } from "../colors";

const LogoColoredSVG = () => {
  return (
    <svg width="40px" height="40px" viewBox="0 0 170 140">
      <g>
        <polygon
          className="cls-3"
          points="41.3 0.01 124.64 0 131.31 11.56 100.27 65.53 63.36 65.53 29.88 123.72 18.95 104.81 52.62 45.93 88.94 45.93 104.09 19.61 52.86 19.61 11.43 91.43 0 71.96 41.3 0.01"
          fill={colors.PeerPlaysBlue}
        />
        <polygon
          className="cls-4"
          points="124.85 143.78 41.52 143.79 37.07 136.03 70.8 77.21 106.48 77.21 137.7 22.86 148.29 40.98 116.23 97 82.23 97 66.34 124.32 113.45 124.32 154.73 52.36 166.16 71.83 124.85 143.78"
          fill={colors.PeerPlaysOrange}
        />
      </g>
    </svg>
  );
};

const LogoIconColored = (
  props: JSX.IntrinsicAttributes &
    IconComponentProps &
    RefAttributes<HTMLSpanElement>
): JSX.Element => {
  return <Icon component={LogoColoredSVG} {...props} />;
};

export default LogoIconColored;
