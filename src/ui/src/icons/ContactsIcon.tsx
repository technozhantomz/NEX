import Icon from "@ant-design/icons";
import { IconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { RefAttributes } from "react";

const ContactsSVG = () => {
  return (
    <svg height="1em" viewBox="0 0 24 24" width="1em" fill="currentColor">
      <defs>
        <path
          d="M20.84 5.22c-.05-.12-.11-.23-.18-.34-.14-.21-.33-.4-.54-.54-.11-.07-.22-.13-.34-.18-.24-.1-.5-.16-.78-.16h-1V2h-2v2H8V2H6v2H5c-.42 0-.8.13-1.12.34-.21.14-.4.33-.54.54-.07.11-.13.22-.18.34-.1.24-.16.5-.16.78v14a2 2 0 0 0 2 2h14c.28 0 .54-.06.78-.16.12-.05.23-.11.34-.18.21-.14.4-.33.54-.54.21-.32.34-.71.34-1.12V6c0-.28-.06-.54-.16-.78zM5 20V6h14v14H5zm7-6.12c-2.03 0-6 1.08-6 3.58V19h12v-1.53c0-2.51-3.97-3.59-6-3.59zM8.31 17c.69-.56 2.38-1.12 3.69-1.12s3.01.56 3.69 1.12H8.31zM12 13c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"
          id="contacts"
        />
      </defs>
      <g transform="translate(-3 -1.5)" fill="none" fillRule="evenodd">
        <mask id="contactsMask" fill="#fff">
          <use xlinkHref="#contacts" />
        </mask>
        <g className="mask" mask="url(#contactsMask)" fill="#647090">
          <path d="M0 0h24v24H0z" />
        </g>
      </g>
    </svg>
  );
};

const ContactsIcon = (
  props: JSX.IntrinsicAttributes &
    IconComponentProps &
    RefAttributes<HTMLSpanElement>
): JSX.Element => {
  return <Icon component={ContactsSVG} {...props} />;
};

export default ContactsIcon;
