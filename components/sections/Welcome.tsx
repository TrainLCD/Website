import Image from 'next/image';
import styled from 'styled-components';
import mockImage from '../../assets/images/mockup/iphone-and-ipad.png';
import RingsPC from '../RingsPC';

const Container = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  padding: 0 64px;
  background-color: #fefefe;
`;

const LeftContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;

const ColoredText = styled.span`
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
  margin-top: 24px;
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 0.75;
`;

const StyledRingsPC = styled(RingsPC)`
  position: absolute;
  right: 0;
  bottom: 256px;
`;

const TryButton = styled.button`
  appearance: none;
  background-color: #277bc0;
  width: 180px;
  height: 48px;
  border: none;
  border-radius: 48px;
  color: white;
  font-weight: bold;
  margin-top: 32px;
  cursor: pointer;
`;

const WelcomeSection: React.FC = () => {
  const handleTryButtonClick = () => {
    const aboutElem = document.querySelector('#download');
    window.scrollTo({
      top: aboutElem?.getBoundingClientRect().top,
      behavior: 'smooth',
    });
  };

  return (
    <Container>
      <LeftContainer>
        <Heading>
          日本全国の鉄道路線で使える
          <br />
          <ColoredText>新感覚ナビゲーション</ColoredText>アプリ
        </Heading>
        <DescriptionText>
          今までにありそうでなかった あなたのスマートフォンで使える電車のLCD。
          <br />
          それが、新感覚ナビゲーションアプリ「TrainLCD」
          <br />
          迷いそうな時、降りれるか不安な時。きっとあなたの役に立つはずです。
        </DescriptionText>
        <TryButton onClick={handleTryButtonClick}>使ってみる</TryButton>
      </LeftContainer>
      <RightContainer>
        <StyledRingsPC />
        <Image src={mockImage} alt="iPhone and iPad" />
      </RightContainer>
    </Container>
  );
};

export default WelcomeSection;
