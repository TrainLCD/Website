import styled from 'styled-components';
import AppStoreJPImg from '../../assets/images/store/app-store-jp.png';
import PlayStoreJPImg from '../../assets/images/store/google-play-jp.png';
import { mediaQueries } from '../../constants/media';
import DescriptionText from '../DescriptionText';
import ImageWithoutSize from '../ImageWithoutSize';

const Container = styled.section`
  min-height: 100vh;
  position: relative;
  padding: 0 32px;
  background-color: #fefefe;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${mediaQueries.md} {
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 0;
    padding: 0 64px;
  }
`;
const StoresContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
`;

const Heading = styled.h3`
  line-height: 1.25;
  font-size: 1.5rem;
  @media ${mediaQueries.md} {
    font-size: 3rem;
  }
`;

const StoreLink = styled.a`
  display: block;
  margin-bottom: 24px;
  max-width: 100%;
  &:last-child {
    margin-bottom: 0;
  }
  @media ${mediaQueries.md} {
    max-width: 300px;
    margin-bottom: 32px;
  }
`;

const DownloadSection: React.FC = () => {
  return (
    <Container id="download">
      <StoresContainer>
        <StoreLink
          href="https://apps.apple.com/jp/app/trainlcd/id1486355943"
          target="_blank"
          rel="noreferrer noopener"
        >
          <ImageWithoutSize alt="App Store" src={AppStoreJPImg} />
        </StoreLink>
        <StoreLink
          href="https://play.google.com/store/apps/details?id=me.tinykitten.trainlcd"
          target="_blank"
          rel="noreferrer noopener"
        >
          <ImageWithoutSize alt="Play Store" src={PlayStoreJPImg} />
        </StoreLink>
      </StoresContainer>
      <TextsContainer>
        <ShortHeading>早速使ってみよう</ShortHeading>
        {/* スペースの有無 */}
        <Heading>
          iOSとAndroid
          <br />
          <AccentText>どちらも対応</AccentText>
        </Heading>

        <DescriptionText>
          iPhone、iPad、Androidスマートフォンに対応していて、もちろん無料です。
          <br />
          早速お使いのスマートフォンで使ってみましょう！
        </DescriptionText>
      </TextsContainer>
    </Container>
  );
};

export default DownloadSection;
