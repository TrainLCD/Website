import Modal from 'react-modal';
import commonStyles from '../../styles/components/modals/Common.module.css';
import { isJa } from '../../utils/isJa';
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
      contentLabel={
        isJa
          ? 'TrainLCDは日本全国で使えます'
          : 'TrainLCD can be used all over Japan'
      }
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
        <h3 className={commonStyles.heading}>
          {isJa
            ? 'TrainLCDは日本全国で使えます'
            : 'TrainLCD can be used all over Japan'}
        </h3>
        <p className={commonStyles.text}>
          {isJa
            ? 'TrainLCDは、鶴見線、一部の直通路線・支線を除けば日本全国のほぼすべての路線で使用可能です。'
            : 'TrainLCD can be used on almost all lines in Japan except for the Tsurumi line and some direct passage lines and branch lines.'}
          <br />
          {isJa
            ? '現在、各駅停車の列車と一部の優等列車のみ対応していますが、対応する列車種別は順次増加予定です。'
            : 'Currently, only trains that stop at each station and some excellent trains are supported, but the number of supported train types is scheduled to increase gradually.'}
        </p>
      </main>
    </Modal>
  );
};

export default JapanModal;
