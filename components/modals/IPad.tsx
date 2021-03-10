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
      contentLabel={
        isJa ? 'TrainLCDはiPadに対応' : 'TrainLCD compatible with iPad'
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
            src="/images/ipad.png"
            alt={isJa ? 'iPadで動くTrainLCD' : 'TrainLCD running on iPad'}
            width={2360}
            height={1640}
          />
        </div>
        <h3 className={commonStyles.heading}>
          {isJa
            ? 'TrainLCDはiPadに対応しています。'
            : 'TrainLCD is compatible with iPad.'}
        </h3>
        <p className={commonStyles.text}>
          {isJa
            ? 'iPadと一緒に使えば、もっとわかりやすく次の駅を知ることができます。'
            : 'If you use it with an iPad, you can know the next station more easily.'}
          <br />
          {isJa
            ? '最新のどのiPadにも対応しているため、アプリをダウンロードすれば快適に使えます。'
            : `It's compatible with all the latest iPads, so you can use it comfortably by downloading the app.`}
        </p>
        <button onClick={onRequestClose} className={commonStyles.close}>
          {isJa ? '閉じる' : 'Close'}
        </button>
      </main>
    </Modal>
  );
};

export default IPadModal;
