import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Container = styled.main`
  color: #333;
  max-width: 1024px;
  padding: 128px 32px 32px 32px;
  line-height: 1.5;
`;

export const InternalLink = styled.a`
  font-weight: bold;
  color: #333;
`;

export const HeadingContainer = styled.header`
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 12px;
  line-height: 1.25;
`;

export const HeadingMetaContainer = styled.aside`
  margin-top: 32px;
  text-align: right;
`;

export const Paragraph = styled.p`
  line-height: 2;
  margin: 24px 0;
`;

export const HeadingText = styled.h3`
  font-size: 1.5rem;
  margin: 24px 0;
`;

export const listStyle = css`
  margin-left: 32px;
`;

export const OrderedList = styled.ol`
  ${listStyle}
`;

export const UnorderedList = styled.ul`
  ${listStyle}
`;
