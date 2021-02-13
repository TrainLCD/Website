import Modal from 'react-modal';
import commonStyles from '../../styles/components/modals/Common.module.css';
import CloseIcon from '../CloseIcon';
import JapanIcon from '../JapanIcon';

type Props = {
  isOpen: boolean;
  onAfterOpen?: () => void;
  onRequestClose?: () => void;
  customStyles?: Modal.Styles;
};

const JapanModal: React.FC<Props> = ({
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
      contentLabel="TrainLCDは日本全国で使えます"
    >
      <header className={commonStyles.headerContainer}>
        <CloseIcon
          className={commonStyles.closeIcon}
          onClick={onRequestClose}
        />
      </header>
      <main className={commonStyles.main}>
        <div className={commonStyles.circle}>
          <JapanIcon />
        </div>
        <h3 className={commonStyles.heading}>TrainLCDは日本全国で使えます</h3>
        <p className={commonStyles.text}>
          TrainLCDは、鶴見線、直通路線、支線を除けば日本全国のほぼすべての路線で使用可能です。
          <br />
          現在、各駅停車の列車と一部の快速路線のみ対応しています。
        </p>
        <button onClick={onRequestClose} className={commonStyles.close}>
          閉じる
        </button>
      </main>
    </Modal>
  );
};

export default JapanModal;
