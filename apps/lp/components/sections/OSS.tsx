import useTranslation from 'next-translate/useTranslation';
import styled from 'styled-components';
import { Media, mediaQueries } from '../../constants/media';
import DescriptionText from '../DescriptionText';
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
  margin-top: 24px;
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
  white-space: pre-wrap;
`;

const Heading = styled.h3`
  line-height: 1.25;
  font-size: 1.5rem;
  @media ${mediaQueries.md} {
    font-size: 3rem;
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
  const { t } = useTranslation();

  return (
    <TextsContainer>
      <ShortHeading>PRs Welcome</ShortHeading>
      <Heading>
        {t('common:section.oss.trainlcdIs')}
        <br />
        <AccentText>{t('common:section.oss.ossProject')}</AccentText>
      </Heading>
      <DescriptionText>{t('common:section.oss.description')}</DescriptionText>
      <ToGHButton
        href="https://github.com/TrainLCD/MobileApp"
        rel="noopener noreferrer"
      >
        {t('common:section.oss.viewRepo')}
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
