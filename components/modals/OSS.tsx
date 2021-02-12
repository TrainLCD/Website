import Image from 'next/image';
import Modal from 'react-modal';
import commonStyles from '../../styles/components/modals/Common.module.css';
import CloseIcon from '../CloseIcon';
import GitHubIcon from '../GitHubIcon';

type Props = {
  isOpen: boolean;
  onAfterOpen?: () => void;
  onRequestClose?: () => void;
  customStyles?: Modal.Styles;
};

const OSSModal: React.FC<Props> = ({
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
      contentLabel="TrainLCDはiPad対応"
    >
      <header className={commonStyles.headerContainer}>
        <CloseIcon
          className={commonStyles.closeIcon}
          onClick={onRequestClose}
        />
      </header>
      <main className={commonStyles.main}>
        <GitHubIcon width={128} height={128} />
        <h3 className={commonStyles.heading}>
          TrainLCDはオープンソースプロジェクト
        </h3>
        <p className={commonStyles.text}>
          TrainLCDはMITライセンスのオープンソースプロジェクトです。
          <br />
          つまり、誰でもTrainLCDの改善のサポートができるということです！
        </p>
        <a
          href="https://github.com/TinyKitten/TrainLCD"
          target="_blank"
          rel="noopener noreferrer"
          className={commonStyles.link}
        >
          リポジトリを見る
        </a>
        <button onClick={onRequestClose} className={commonStyles.close}>
          閉じる
        </button>
      </main>
    </Modal>
  );
};

export default OSSModal;
