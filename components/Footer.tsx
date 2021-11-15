import Link from 'next/link';
import styled, { css } from 'styled-components';
import { isJa } from '../utils/isJa';

const FooterContainer = styled.footer`
  background-color: #f4f6fa;
  text-align: center;
  padding: 32px;
`;

const commonLinkStyle = css`
  display: block;
  color: #555;
  text-decoration: none;
  margin-bottom: 12px;
`;

const FooterLink = styled.a`
  ${commonLinkStyle}
`;

const TwitterLink = styled.a`
  ${commonLinkStyle}
  font-weight: bold;
`;

const CopyrightText = styled.p`
  color: #555;
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <TwitterLink
        href="https://twitter.com/TrainLCD"
        rel="noreferrer noopener"
      >
        {isJa ? '公式Twitter' : 'Twitter(Japanese only)'}
      </TwitterLink>

      <Link href={isJa ? '/privacy-policy' : '/privacy-policy-en'} passHref>
        <FooterLink>
          {isJa ? 'プライバシーポリシー' : 'Privacy Policy'}
        </FooterLink>
      </Link>
      <CopyrightText>© 2019-{currentYear} TinyKitten</CopyrightText>
    </FooterContainer>
  );
};

export default Footer;
