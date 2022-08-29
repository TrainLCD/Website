import styled from 'styled-components';
import GitHubIcon from '../GitHubIcon';

const Container = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 64px;
  background-color: #fcfcfc;
`;
const MockupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

const TextsContainer = styled.div`
  width: 50%;
`;

const ShortHeading = styled.p`
  font-size: 1.5rem;
  color: #277bc0;
  font-weight: bold;
`;

const AccentText = styled.span`
  color: #277bc0;
`;

const Heading = styled.h1`
  font-size: 3rem;
  line-height: 1.5;
`;

const DescriptionText = styled.p`
  line-height: 1.5;
  font-weight: bold;
  color: #444;
  font-size: 1.5rem;
  margin-top: 24px;
`;

const ResizedGitHubIcon = styled(GitHubIcon)`
  width: 290px;
  height: 282.82px;
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

const OSSSection: React.FC = () => {
  return (
    <Container>
      <TextsContainer>
        <ShortHeading>PRs Welcome</ShortHeading>
        <Heading>
          TrainLCDは
          <br />
          <AccentText>
            オープンソース
            <br />
            プロジェクト
          </AccentText>
        </Heading>
        <DescriptionText>
          TrainLCDはMITライセンスのオープンソースプロジェクトです。
          <br />
          エンジニアの皆さん、
          <br />
          TrainLCDの開発に貢献してみませんか？
        </DescriptionText>
        <ToGHButton
          href="https://github.com/TrainLCD/MobileApp"
          rel="noopener noreferrer"
        >
          リポジトリを見る
        </ToGHButton>
      </TextsContainer>
      <MockupContainer>
        <ResizedGitHubIcon />
      </MockupContainer>
    </Container>
  );
};

export default OSSSection;
