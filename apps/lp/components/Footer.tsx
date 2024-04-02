import Link from 'next/link';
import styled, { css } from 'styled-components';
import { mediaQueries } from '../constants/media';
import AppLogo from './AppLogo';
import DiscordLogo from './DiscordLogo';
import TinyKittenProduct from './TinyKittenProduct';
import TwitterLogo from './TwitterLogo';

const FooterContainer = styled.footer`
  position: sticky;
  background-color: #212121;
  padding: 40px 16px;
  z-index: 1;
  @media ${mediaQueries.md} {
    padding: 40px 64px;
  }
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
  font-size: 0.5rem;
  color: white;
  font-weight: bold;
  white-space: pre-wrap;
  @media ${mediaQueries.md} {
    font-size: 0.75rem;
    white-space: initial;
  }
`;
const AppNameText = styled.p`
  font-size: 1rem;
  color: white;
  font-weight: bold;
  line-height: 1;
  margin-top: 2px;
  @media ${mediaQueries.md} {
    font-size: 1.5rem;
  }
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
  flex-direction: column;
  @media ${mediaQueries.md} {
    flex-direction: row;
  }
`;

const BottomLeftContainer = styled.div``;

const buttonAnimationMixin = css`
  @media ${mediaQueries.md} {
    opacity: 0.75;
    transition: 250ms;
    &:hover {
      opacity: 1;
    }
  }
`;

const SocialMediaList = styled.div`
  display: flex;
  gap: 14px;
  @media ${mediaQueries.md} {
    gap: 8px;
  }
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
  flex-direction: column;
  @media ${mediaQueries.md} {
    flex-direction: row;
  }
`;

const linkMixin = css`
  ${buttonAnimationMixin}
  font-weight: bold;
  color: white;
  font-size: 0.75rem;
  text-decoration: none;
`;

const StyledAnchor = styled.a`
  ${linkMixin}
`;

const StyledLink = styled(Link)`
  ${linkMixin}
`;

const BottomRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 32px;
  @media ${mediaQueries.md} {
    align-items: flex-end;
    margin-top: 0;
  }
`;

const CopyrightText = styled.p`
  font-size: 0.75rem;
  color: white;
  margin-top: 12px;
  line-height: 1.2;
  opacity: 0.75;
  text-align: left;
  line-height: 1.25;
  white-space: pre-wrap;
  @media ${mediaQueries.md} {
    text-align: right;
  }
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
              href="https://x.com/trainlcd"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ResizedTwitterLogo />
            </a>
            <a
              href="https://discord.gg/jbVE7tj9SE"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ResizedDiscordLogo />
            </a>
          </SocialMediaList>
          <LinkList>
            <StyledAnchor
              href="https://status.trainlcd.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              障害情報
            </StyledAnchor>
            <StyledAnchor
              href="https://tinykitten.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              開発者のポートフォリオ
            </StyledAnchor>
            <StyledLink href="/privacy-policy" passHref>
              プライバシーポリシー
            </StyledLink>
            <StyledLink href="/privacy-policy-en" passHref>
              Privacy Policy(English)
            </StyledLink>
            {/* <StyledAnchor
              href="https://discord.gg/qKT7zSGQre"
              target="_blank"
              rel="noreferrer noopener"
            >
              {t('common:component.footer.joinCom')}
            </StyledAnchor> */}
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
            © 2019-${currentYear} TinyKitten(Tsubasa SEKIGUCHI)
            <br />
            and the Volunteer TrainLCD development team.
          </CopyrightText>
        </BottomRightContainer>
      </BottomContainer>
    </FooterContainer>
  );
};

export default Footer;
