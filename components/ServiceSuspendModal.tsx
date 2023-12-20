import Modal from 'react-modal';
import styled from 'styled-components';
import useIsJa from '../hooks/useIsJa';
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

const ServiceSuspendModal = ({
  isOpen,
  onRequestClose,
}: Props): React.ReactElement => {
  const isJa = useIsJa();

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
大変恐れ入りますが、2023年12月20日よりTrainLCD開発の一時中断・アプリストアからの取り下げを行わせていただきました。
開発の一時中断の理由といたしまして、開発者のプライベートにて重大な問題が発生し、今後利用者の方々に満足していただけるサービスの提供が難しいと判断したためです。
TrainLCDサービスを皆様により便利に利用できる様になりましたら、開発を全面的に再開いたします。
当面の間はTrainLCDのアップデートをご利用いただけませんが、何卒ご理解・ご協力をお願い致します。`
            : `Thank you for using TrainLCD.
            We regret to inform you that we have temporarily suspended the development of TrainLCD and withdrawn it from the app store effective December 20, 2023.
            The reason for this suspension is that a serious problem has occurred in the developer's private life, and we have determined that it will be difficult to provide a service that satisfies users in the future.
            We will resume full development when the TrainLCD service becomes more convenient for everyone.
            For the time being, TrainLCD updates will not be available, and we appreciate your understanding and cooperation in this matter.`}
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
export default ServiceSuspendModal;
