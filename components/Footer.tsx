import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { mediaQueries } from '../constants/media';
import useIsJa from '../hooks/useIsJa';
import AppLogo from './AppLogo';
import DiscordLogo from './DiscordLogo';
import TinyKittenProduct from './TinyKittenProduct';
import TwitterLogo from './TwitterLogo';

const FooterContainer = styled.footer`
  background-color: #212121;
  padding: 40px 16px;
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
  font-size: 0.25rem;
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
  const { t } = useTranslation();
  const isJa = useIsJa();

  return (
    <FooterContainer>
      <AppInfoContainer>
        <StyledAppLogo />
        <AppInfoTextContainer>
          <AppDescriptionText>{t('component.footer.motto')}</AppDescriptionText>
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
              {t('component.footer.portfolio')}
            </StyledAnchor>
            <Link
              href={isJa ? '/privacy-policy' : '/privacy-policy-en'}
              passHref
            >
              <StyledAnchor>{t('component.footer.privacyPolicy')}</StyledAnchor>
            </Link>
            <StyledAnchor
              href="https://discord.gg/qKT7zSGQre"
              target="_blank"
              rel="noreferrer noopener"
            >
              {t('component.footer.joinCom')}
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
            {`© 2019-${currentYear} TinyKitten(Tsubasa SEKIGUCHI)\nand the Volunteer TrainLCD development team.`}
          </CopyrightText>
        </BottomRightContainer>
      </BottomContainer>
    </FooterContainer>
  );
};

export default Footer;
