import { GithubOutlined, TwitterOutlined } from "../../../../ui/src";
import { DiscordIcon, TelegramIcon } from "../../../../ui/src/icons";

import * as Styled from "./SocialBar.styles";

export const SocialBar = (): JSX.Element => {
  return (
    <Styled.SocialBarWrapper>
      <Styled.SocialLinks>
        <Styled.SocialLink>
          <TwitterOutlined />
          <span className="link-text">Twitter</span>
        </Styled.SocialLink>
        <Styled.SocialLink>
          <TelegramIcon />
          <span className="link-text">Telegram</span>
        </Styled.SocialLink>
        <Styled.SocialLink>
          <GithubOutlined />
          <span className="link-text">GitHub</span>
        </Styled.SocialLink>
        <Styled.SocialLink>
          <DiscordIcon />
          <span className="link-text">Discord</span>
        </Styled.SocialLink>
      </Styled.SocialLinks>
    </Styled.SocialBarWrapper>
  );
};
