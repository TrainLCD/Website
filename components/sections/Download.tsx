import Image from 'next/image';
import styled from 'styled-components';
import PlayStoreJPImg from '../../assets/images/store/google-play-jp.png';
import PlayStoreUSImg from '../../assets/images/store/google-play-us.png';
import { isJa } from '../../utils/isJa';
import AppStoreJPIcon from '../AppStoreJPIcon';
import AppStoreUSIcon from '../AppStoreUSIcon';
import Container from '../Container';
import { Subtitle, Text, Title } from '../Typography';

const StoresContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
`;
const StoreLink = styled.a`
  margin: 0 8px;
`;

const DownloadSection: React.FC = () => {
  return (
    <Container odd>
      <Title>DOWNLOAD</Title>
      <Subtitle>{isJa ? 'TrainLCDを使ってみよう' : 'Try TrainLCD'}</Subtitle>
      <Text>
        {isJa
          ? 'iPhone、iPad、Androidスマートフォンに対応しています。'
          : 'Compatible with iPhone, iPad and Android smartphones.'}
        <br />
        {isJa
          ? `早速お使いのスマートフォンで使ってみましょう！`
          : `Let's use it on your smartphone right away!`}
      </Text>
      <StoresContainer>
        <StoreLink
          href="https://apps.apple.com/jp/app/trainlcd/id1486355943"
          target="_blank"
          rel="noopener noreferrer"
        >
          {isJa ? <AppStoreJPIcon /> : <AppStoreUSIcon />}
        </StoreLink>
        <StoreLink
          href="https://play.google.com/store/apps/details?id=me.tinykitten.trainlcd"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={isJa ? PlayStoreJPImg : PlayStoreUSImg}
            alt="Play Store"
            width={134}
            height={40}
          />
        </StoreLink>
      </StoresContainer>
    </Container>
  );
};

export default DownloadSection;
