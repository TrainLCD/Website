import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { Media, mediaQueries } from '../../constants/media';
import useIsJa from '../../hooks/useIsJa';
import GitHubIcon from '../GitHubIcon';

const Container = styled.section`
  min-height: 100vh;
  position: relative;
  padding: 32px;
  background-color: #fefefe;

  @media ${mediaQueries.md} {
    padding: 0 64px;
  }
`;

const MockupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media ${mediaQueries.md} {
    width: 50%;
  }
`;

const TextsContainer = styled.div`
  width: 100%;
  @media ${mediaQueries.md} {
    width: 50%;
  }
`;

const ShortHeading = styled.p`
  color: #277bc0;
  font-weight: bold;
  margin-top: 32px;
  @media ${mediaQueries.md} {
    font-size: 1.5rem;
    margin-top: 0;
  }
`;

const AccentText = styled.span`
  color: #277bc0;
  @media ${mediaQueries.md} {
    white-space: pre-wrap;
  }
`;

const Heading = styled.h1`
  line-height: 1.5;
  @media ${mediaQueries.md} {
    font-size: 3rem;
  }
`;

const DescriptionText = styled.p`
  line-height: 1.5;
  font-weight: bold;
  color: #444;
  margin-top: 16px;
  white-space: pre-wrap;
  @media ${mediaQueries.md} {
    margin-top: 24px;
    font-size: 1.5rem;
  }
`;

const ResizedGitHubIcon = styled(GitHubIcon)`
  width: 160px;
  height: 156.04px;
  @media ${mediaQueries.md} {
    width: 290px;
    height: 282.82px;
  }
`;

const ToGHButton = styled.a`
  display: block;
  background-color: #277bc0;
  width: 180px;
  height: 48px;
  border: none;
  border-radius: 48px;
  color: white;
  font-weight: bold;
  margin-top: 32px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledMedia = styled(Media)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${mediaQueries.md} {
    flex-direction: row;
  }
`;
const TextFragment = () => {
  const isJa = useIsJa();
  const { t } = useTranslation();

  return (
    <TextsContainer>
      <ShortHeading>PRs Welcome</ShortHeading>
      <Heading>
        {t('section.oss.trainlcdIs')}
        <br />
        <AccentText>{t('section.oss.ossProject')}</AccentText>
      </Heading>
      <DescriptionText>{t('section.oss.description')}</DescriptionText>
      <ToGHButton
        href="https://github.com/TrainLCD/MobileApp"
        rel="noopener noreferrer"
      >
        {t('section.oss.viewRepo')}
      </ToGHButton>
    </TextsContainer>
  );
};

const MockupFragment = () => (
  <MockupContainer>
    <ResizedGitHubIcon />
  </MockupContainer>
);

const OSSSection: React.FC = () => {
  return (
    <Container>
      <StyledMedia greaterThanOrEqual="lg">
        <TextFragment />
        <MockupFragment />
      </StyledMedia>
      <StyledMedia lessThan="lg">
        <MockupFragment />
        <TextFragment />
      </StyledMedia>
    </Container>
  );
};

export default OSSSection;
