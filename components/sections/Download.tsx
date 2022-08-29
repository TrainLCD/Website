import Image from 'next/image';
import styled from 'styled-components';
import PlayStoreJPImg from '../../assets/images/store/google-play-jp.png';
import PlayStoreUSImg from '../../assets/images/store/google-play-us.png';
import { isJa } from '../../utils/isJa';
import AppStoreJPIcon from '../AppStoreJPIcon';
import AppStoreUSIcon from '../AppStoreUSIcon';

const Container = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 64px;
  background-color: #fcfcfc;
`;
const StoresContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  flex-direction: column;
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

const ResizedAppStoreIcon = styled(isJa ? AppStoreJPIcon : AppStoreUSIcon)`
  width: 320px;
  height: 113.07px;
  margin-bottom: 64px;
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
          <Image
            width={320 - 13}
            height={95.32 - 13}
            src={isJa ? PlayStoreJPImg : PlayStoreUSImg}
          />
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
