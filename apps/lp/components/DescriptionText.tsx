import styled from 'styled-components';
import { mediaQueries } from '../constants/media';

const StyledParagraph = styled.p`
  line-height: 1.5;
  font-weight: bold;
  color: #212121;
  white-space: pre-wrap;
  margin-top: 12px;
  font-size: 1rem;

  @media ${mediaQueries.md} {
    margin-top: 12px;
    font-size: 1.25rem;
    line-height: 1.5;
  }
`;

const DescriptionText = ({ children }: { children: React.ReactNode }) => {
  return <StyledParagraph>{children}</StyledParagraph>;
};

export default DescriptionText;
