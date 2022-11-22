import { YoutubeFilled } from "@ant-design/icons";

import { TwitterOutlined } from "../../../../ui/src";
import {
  RedditFilledIcon,
  TelegramIcon,
  TiktokFilledIcon,
} from "../../../../ui/src/icons";

import * as Styled from "./SocialBar.styles";

export const SocialBar = (): JSX.Element => {
  return (
    <Styled.SocialBarWrapper>
      <Styled.SocialLinks>
        <Styled.SocialLink
          href="https://www.youtube.com/c/PeerplaysBlockchain"
          target="_blank"
        >
          <YoutubeFilled />
          <span className="link-text">Youtube</span>
        </Styled.SocialLink>
        <Styled.SocialLink href="https://twitter.com/Peerplays" target="_blank">
          <TwitterOutlined />
          <span className="link-text">Twitter</span>
        </Styled.SocialLink>
        <Styled.SocialLink href="https://t.me/Peerplays" target="_blank">
          <TelegramIcon />
          <span className="link-text">Telegram</span>
        </Styled.SocialLink>
        <Styled.SocialLink
          href="https://www.reddit.com/r/Peerplays/"
          target="_blank"
        >
          <RedditFilledIcon />
          <span className="link-text">Reddit</span>
        </Styled.SocialLink>
        <Styled.SocialLink
          href="https://www.tiktok.com/@peerplays"
          target="_blank"
        >
          <TiktokFilledIcon />
          <span className="link-text">Tiktok</span>
        </Styled.SocialLink>
      </Styled.SocialLinks>
    </Styled.SocialBarWrapper>
  );
};
