import Image from 'next/image';
import Modal from 'react-modal';
import commonStyles from '../../styles/components/modals/Common.module.css';
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
      className={commonStyles.modalContent}
      overlayClassName={commonStyles.modalOverlay}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="TrainLCDはApple Watchに対応"
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
            alt="Apple Watchで動くTrainLCD"
            width={184}
            height={224}
          />
        </div>
        <h3 className={commonStyles.heading}>
          TrainLCDはApple Watchに対応しています。
        </h3>
        <p className={commonStyles.text}>
          Apple Watchと一緒に使えば、さらに便利に次の駅を知ることができます。
          <br />
          iPhoneを出せないときでも、手首を見るだけで今停車している駅や、次に停まる駅を知ることが出来ます。
        </p>
        <button onClick={onRequestClose} className={commonStyles.close}>
          閉じる
        </button>
      </main>
    </Modal>
  );
};

export default AppleWatchModal;
