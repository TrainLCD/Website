import Modal from 'react-modal';
import styled from 'styled-components';
import { isJa } from '../utils/isJa';
import Button from './Button';

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const customStyles: Modal.Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
    zIndex: 2,
    borderRadius: 8,
    maxWidth: '640px',
    maxHeight: '100%',
    overflow: 'scroll',
    marginTop: '24px',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
  },
};

const Container = styled.div`
  padding: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 64px;
  @media (min-width: 800px) {
    padding: 32px;
  }
`;

const Heading = styled.h3`
  font-weight: bold;
  font-size: 1.5rem;
  color: #212121;
  font-family: serif;
`;

const Description = styled.p`
  color: #212121;
  margin-top: 12px;
  line-height: 2;
  white-space: pre-wrap;
  font-size: 0.75em;
  font-weight: bold;
  font-family: serif;
  @media (min-width: 800px) {
    font-size: 0.9em;
  }
`;

const Credit = styled.p`
  color: #212121;
  margin-top: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
  font-size: 0.75rem;
  font-weight: bold;
  font-family: serif;
  width: 100%;
  text-align: right;
  @media (min-width: 800px) {
    font-size: 0.9em;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 24px;
  opacity: 1;
`;

const ShareModal = ({ isOpen, onRequestClose }: Props): React.ReactElement => {
  return (
    <Modal
      closeTimeoutMS={250}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel={isJa ? '重要なお知らせ' : 'IMPORTANT NOTICE'}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <Container>
        <Heading>{isJa ? '重要なお知らせ' : 'IMPORTANT NOTICE'}</Heading>
        <Description>
          {isJa
            ? `いつもTrainLCDをご利用いただきありがとうございます。
2年ほどにわたってTrainLCDを開発してまいりましたが、2021年12月15日よりTrainLCDのサービスを一部中断・アプリストアからの取り下げを行わせていただきます。
サービスの一部中断の理由といたしまして、ほぼ私一人の開発者で開発するのに限界を感じ、今後利用者の方々に満足していただけるサービスの提供が難しいと判断したためです。
TrainLCDサービスを皆様により便利に利用できる様になりましたら、サービスを全面的に再開いたします。
当面の間はTrainLCDの一部サービスをご利用いただけませんが、何卒ご理解・ご協力をお願い致します。`
            : `Thank you for using TrainLCD.
We have been developing TrainLCD for about two years, but from December 15, 2021, we will suspend some TrainLCD services and withdraw from the app store.
The reason for the partial interruption of the service is that I felt that it was difficult for me to develop it by myself, and decided that it would be difficult to provide a service that would satisfy the users in the future.
When the TrainLCD service becomes more convenient for you, we will fully resume the service.
Some TrainLCD services will not be available for the time being, but we appreciate your understanding and cooperation.`}
        </Description>
        <Credit>
          {isJa
            ? 'TrainLCD開発者\n屋号TinyKitten(関口 翼)'
            : 'TrainLCD developer\nTinyKitten(Tsubasa SEKIGUCHI)'}
        </Credit>
        <LinksContainer>
          <Button onClick={onRequestClose} color={'#252525'}>
            閉じる
          </Button>
        </LinksContainer>
      </Container>
    </Modal>
  );
};
export default ShareModal;
