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

const IPadModal: React.FC<Props> = ({
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
      contentLabel="TrainLCDはiPadに対応"
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
            src="/images/ipad.png"
            alt="iPadで動くTrainLCD"
            width={2360}
            height={1640}
          />
        </div>
        <h3 className={commonStyles.heading}>
          TrainLCDはiPadに対応しています。
        </h3>
        <p className={commonStyles.text}>
          iPadと一緒に使えば、もっとわかりやすく次の駅を知ることができます。
          <br />
          最新のどのiPadにも対応しているため、アプリをダウンロードすれば快適に使えます。
        </p>
        <button onClick={onRequestClose} className={commonStyles.close}>
          閉じる
        </button>
      </main>
    </Modal>
  );
};

export default IPadModal;
