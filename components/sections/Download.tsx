import Image from 'next/image';
import styled from 'styled-components';
import PlayStoreJPImg from '../../assets/images/store/google-play-jp.png';
import PlayStoreUSImg from '../../assets/images/store/google-play-us.png';
import { Media, mediaQueries } from '../../constants/media';
import { isJa } from '../../utils/isJa';
import AppStoreJPIcon from '../AppStoreJPIcon';
import AppStoreUSIcon from '../AppStoreUSIcon';

const Container = styled.section`
  height: 100vh;
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
  @media ${mediaQueries.md} {
    margin-top: 24px;
    font-size: 1.5rem;
  }
`;

const ResizedAppStoreIcon = styled(isJa ? AppStoreJPIcon : AppStoreUSIcon)`
  width: 160px;
  height: 52.5px;
  margin-bottom: 21px;
  @media ${mediaQueries.md} {
    width: 320px;
    height: 113.07px;
    margin-bottom: 64px;
  }
`;

const DownloadSection: React.FC = () => {
  return (
    <Container id="download">
      <StoresContainer>
        <a
          href="https://apps.apple.com/jp/app/trainlcd/id1486355943"
          target="_blank"
          rel="noreferrer noopener"
        >
          <ResizedAppStoreIcon />
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=me.tinykitten.trainlcd"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Media greaterThanOrEqual="lg">
            <Image
              width={320}
              height={95.32}
              src={isJa ? PlayStoreJPImg : PlayStoreUSImg}
            />
          </Media>
          <Media lessThan="lg">
            <Image
              width={160}
              height={47.66}
              src={isJa ? PlayStoreJPImg : PlayStoreUSImg}
            />
          </Media>
        </a>
      </StoresContainer>
      <TextsContainer>
        <ShortHeading>早速使ってみよう</ShortHeading>
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
