import Image from 'next/image';
import Modal from 'react-modal';
import commonStyles from '../../styles/components/modals/Common.module.css';
import { isJa } from '../../utils/isJa';
import CloseIcon from '../CloseIcon';

type Props = {
  isOpen: boolean;
  onAfterOpen?: () => void;
  onRequestClose?: () => void;
  customStyles?: Modal.Styles;
};

const AppleWatchModal: React.FC<Props> = ({
  isOpen,
  onAfterOpen,
  onRequestClose,
  customStyles,
}: Props) => {
  return (
    <Modal
      closeTimeoutMS={150}
      className={commonStyles.modalContent}
      overlayClassName={commonStyles.modalOverlay}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel={
        isJa
          ? 'TrainLCDはApple Watchに対応'
          : 'TrainLCD compatible with Apple Watch'
      }
    >
      <header className={commonStyles.headerContainer}>
        <CloseIcon
          className={commonStyles.closeIcon}
          onClick={onRequestClose}
        />
      </header>
      <main className={commonStyles.main}>
        <div className={commonStyles.imageContainer}>
          <Image
            src="/images/applewatch.png"
            alt={
              isJa
                ? 'Apple Watchで動くTrainLCD'
                : 'TrainLCD running on Apple Watch'
            }
            width={184}
            height={224}
          />
        </div>
        <h3 className={commonStyles.heading}>
          {isJa
            ? 'TrainLCDはApple Watchに対応しています。'
            : 'Train LCD is compatible with Apple Watch.'}
        </h3>
        <p className={commonStyles.text}>
          {isJa
            ? 'Apple Watchと一緒に使えば、さらに便利に次の駅を知ることができます。'
            : 'If you use it with your Apple Watch, you can find out the next station even more conveniently.'}
          <br />
          {isJa
            ? 'iPhoneを出せないときでも、手首を見るだけで今停車している駅や、次に停まる駅を知ることが出来ます。'
            : `Even when you can't take out your iPhone, you can find out which station is currently stopped or next by just looking at your wrist.`}
        </p>
        <button onClick={onRequestClose} className={commonStyles.close}>
          {isJa ? '閉じる' : 'Close'}
        </button>
      </main>
    </Modal>
  );
};

export default AppleWatchModal;
