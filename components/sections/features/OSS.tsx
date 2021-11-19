import styled from 'styled-components';
import { isJa } from '../../../utils/isJa';
import ButtonLink from '../../ButtonLink';
import { FeatureContainer } from '../../FeatureItemElements';
import GitHubIcon from '../../GitHubIcon';

const TextContainer = styled.div`
  margin-top: 24px;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.5;
  @media (min-width: 800px) {
    text-align: center;
  }
`;

const Description = styled.p`
  font-weight: bold;
  color: #555;
  line-height: 1.5;
  @media (min-width: 800px) {
    text-align: center;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
`;

const OSSFeatureSection: React.FC = () => {
  return (
    <FeatureContainer>
      <GitHubIcon width={128} height={128} />
      <TextContainer>
        <Heading style={{ marginBottom: '12px' }}>
          {isJa ? 'オープンソースプロジェクト' : 'An open source project'}
        </Heading>
        <Description>
          {isJa
            ? 'TrainLCDはMITライセンスのオープンソースプロジェクトです'
            : 'TrainLCD is an MIT licensed open source project.'}
          <br />
          {isJa
            ? 'つまり、誰でもTrainLCDの改善のサポートができるということです！'
            : `This means that anyone can help improve the TrainLCD!`}
        </Description>
        <ButtonContainer>
          <ButtonLink
            href="https://github.com/TrainLCD/MobileApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            {isJa ? 'リポジトリを見る' : 'See repository'}
          </ButtonLink>
        </ButtonContainer>
      </TextContainer>
    </FeatureContainer>
  );
};

export default OSSFeatureSection;
