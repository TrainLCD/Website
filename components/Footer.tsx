import Link from 'next/link';
import styled, { css } from 'styled-components';
import AppLogo from './AppLogo';
import DiscordLogo from './DiscordLogo';
import TinyKittenProduct from './TinyKittenProduct';
import TwitterLogo from './TwitterLogo';

const FooterContainer = styled.footer`
  background-color: #212121;
  padding: 40px 64px;
`;
const AppInfoContainer = styled.div`
  padding-bottom: 40px;
  display: flex;
`;
const StyledAppLogo = styled(AppLogo)`
  width: 37.89px;
  height: 48px;
  border: 0.5px solid #fff;
  border-radius: 4px;
`;
const AppInfoTextContainer = styled.div`
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const AppDescriptionText = styled.p`
  font-size: 0.75rem;
  color: white;
  font-weight: bold;
`;
const AppNameText = styled.p`
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
  line-height: 1;
  margin-top: 2px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #afafaf;
`;

const BottomContainer = styled.div`
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
`;

const BottomLeftContainer = styled.div``;

const buttonAnimationMixin = css`
  opacity: 0.75;
  transition: 250ms;
  &:hover {
    opacity: 1;
  }
`;

const SocialMediaList = styled.div`
  display: flex;
  gap: 14px;
`;

const ResizedTwitterLogo = styled(TwitterLogo)`
  ${buttonAnimationMixin}
  width: 24px;
  height: 19.75px;
`;

const ResizedDiscordLogo = styled(DiscordLogo)`
  ${buttonAnimationMixin}
  width: 26.06px;
  height: 19.75px;
`;

const LinkList = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 21px;
`;

const StyledAnchor = styled.a`
  ${buttonAnimationMixin}
  font-weight: bold;
  color: white;
  font-size: 0.75rem;
  text-decoration: none;
`;

const BottomRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const CopyrightText = styled.p`
  font-size: 0.75rem;
  color: white;
  margin-top: 12px;
  line-height: 1.2;
  opacity: 0.75;
  text-align: right;
  line-height: 1.25;
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <AppInfoContainer>
        <StyledAppLogo />
        <AppInfoTextContainer>
          <AppDescriptionText>
            日本全国の鉄道路線で使える 新感覚ナビゲーションアプリ
          </AppDescriptionText>
          <AppNameText>TrainLCD</AppNameText>
        </AppInfoTextContainer>
      </AppInfoContainer>
      <Divider />
      <BottomContainer>
        <BottomLeftContainer>
          <SocialMediaList>
            <a
              href="https://twitter.com/trainlcd"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ResizedTwitterLogo />
            </a>
            <a
              href="https://discord.gg/qKT7zSGQre"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ResizedDiscordLogo />
            </a>
          </SocialMediaList>
          <LinkList>
            <StyledAnchor
              href="https://tinykitten.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              開発者のポートフォリオ
            </StyledAnchor>
            <Link href="/privacy-policy" passHref>
              <StyledAnchor>プライバシーポリシー</StyledAnchor>
            </Link>
            <StyledAnchor
              href="https://discord.gg/qKT7zSGQre"
              target="_blank"
              rel="noreferrer noopener"
            >
              Discordコミュニティに参加する
            </StyledAnchor>
          </LinkList>
        </BottomLeftContainer>
        <BottomRightContainer>
          <a
            href="https://tinykitten.me"
            target="_blank"
            rel="noreferrer noopener"
          >
            <TinyKittenProduct />
          </a>
          <CopyrightText>
            © 2019-{currentYear} TinyKitten(Tsubasa SEKIGUCHI)
            <br />
            and the Volunteer TrainLCD development team.
          </CopyrightText>
        </BottomRightContainer>
      </BottomContainer>
    </FooterContainer>
  );
};

export default Footer;
