import Image from 'next/image';
import styled from 'styled-components';
import { ShowingImage } from '../../models/ShowingImage';
import { isJa } from '../../utils/isJa';
import ArrowIcon from '../ArrowIcon';

type Props = {
  showingImg: ShowingImage;
};

const Container = styled.section`
  min-height: 100vh;
  background: #333;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;
const Content = styled.div`
  background: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
`;

const AppNameTitle = styled.h1`
  font-size: 2rem;
  margin-top: 32px;
  padding: 0 32px;
`;
const AppDescription = styled.h2`
  margin-top: 12px;
  font-weight: normal;
  text-align: center;
  line-height: 1.5;
  white-space: pre-wrap;
  padding: 0 32px;
`;
const MockupImage = styled(Image)`
  width: 75%;

  @media (min-width: 800px) {
    max-width: 30%;
  }
`;
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

const Arrow = styled(ArrowIcon)`
  margin-top: 64px;
  @media (min-width: 800px) {
    position: absolute;
    bottom: 32px;
    cursor: pointer;
    bottom: 64px;
  }
`;

const WelcomeSection: React.FC<Props> = ({ showingImg }: Props) => {
  const handleNextClick = () => {
    const aboutElem = document.querySelector('#about');
    window.scrollTo({
      top: aboutElem?.getBoundingClientRect().top,
      behavior: 'smooth',
    });
  };

  return (
    <Container
      style={{
        backgroundImage: `url('${showingImg.bg}')`,
      }}
    >
      <Content>
        <MockupImage
          src={showingImg.mock}
          alt="Mockup"
          width={361.5}
          height={191.25}
        />
        <AppNameTitle>TrainLCD</AppNameTitle>
        <AppDescription>
          {isJa
            ? `日本全国の鉄道路線で使える\n新感覚のナビゲーションアプリです。`
            : 'Can be used on routes all over Japan\nNew sense navigation app.'}
        </AppDescription>
        <StoresContainer>
          <StoreLink
            href="https://apps.apple.com/jp/app/trainlcd/id1486355943"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MockupImage
              src={
                isJa
                  ? '/images/store/appstore-jp.svg'
                  : '/images/store/appstore-us.svg'
              }
              alt="Mockup"
              width={135}
              height={40}
            />
          </StoreLink>
          <StoreLink
            href="https://play.google.com/store/apps/details?id=me.tinykitten.trainlcd"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MockupImage
              src={
                isJa
                  ? '/images/store/google-play-jp.png'
                  : '/images/store/google-play-us.png'
              }
              alt="Mockup"
              width={134}
              height={40}
            />
          </StoreLink>
        </StoresContainer>

        <Arrow onClick={handleNextClick} />
      </Content>
    </Container>
  );
};

export default WelcomeSection;
