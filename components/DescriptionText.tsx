import styled from 'styled-components';
import { mediaQueries } from '../constants/media';
import useIsJa from '../hooks/useIsJa';

const StyledParagraph = styled.p<{ en?: boolean }>`
  line-height: ${({ en }) => (en ? 1.25 : 1.5)};
  font-weight: ${({ en }) => (en ? 'normal' : 'bold')};
  color: #212121;
  white-space: pre-wrap;
  margin-top: 12px;
  font-size: 1rem;

  @media ${mediaQueries.md} {
    margin-top: ${({ en }) => (en ? 8 : 12)}px;
    font-size: 1.25rem;
    line-height: 1.5;
  }
`;

const DescriptionText: React.FC = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isJa = useIsJa();
  return <StyledParagraph en={!isJa}>{children}</StyledParagraph>;
};

export default DescriptionText;
