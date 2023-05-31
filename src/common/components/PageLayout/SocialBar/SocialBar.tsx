import { YoutubeFilled } from "@ant-design/icons";

import {
  RedditFilledIcon,
  TelegramIcon,
  TiktokFilledIcon,
  TwitterOutlined,
} from "../../../../ui/src";

import * as Styled from "./SocialBar.styles";

export const SocialBar = (): JSX.Element => {
  return (
    <Styled.SocialBarWrapper>
      <Styled.SocialLinks>
        <Styled.SocialLink
          href="https://www.youtube.com/c/homepesa"
          target="_blank"
        >
          <YoutubeFilled />
          <span className="link-text">Youtube</span>
        </Styled.SocialLink>
        <Styled.SocialLink href="https://twitter.com/homepesa" target="_blank">
          <TwitterOutlined />
          <span className="link-text">Twitter</span>
        </Styled.SocialLink>
        <Styled.SocialLink href="https://t.me/homepesa" target="_blank">
          <TelegramIcon />
          <span className="link-text">Telegram</span>
        </Styled.SocialLink>
        <Styled.SocialLink
          href="https://www.reddit.com/r/homepesa/"
          target="_blank"
        >
          <RedditFilledIcon />
          <span className="link-text">Reddit</span>
        </Styled.SocialLink>
        <Styled.SocialLink
          href="https://www.tiktok.com/@homepesa"
          target="_blank"
        >
          <TiktokFilledIcon />
          <span className="link-text">Tiktok</span>
        </Styled.SocialLink>
      </Styled.SocialLinks>
    </Styled.SocialBarWrapper>
  );
};
