import Modal from 'react-modal';
import commonStyles from '../../styles/components/modals/Common.module.css';
import { isJa } from '../../utils/isJa';
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
      closeTimeoutMS={150}
      className={commonStyles.modalContent}
      overlayClassName={commonStyles.modalOverlay}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel={
        isJa
          ? 'TrainLCDはオープンソースプロジェクト'
          : 'TrainLCD is an open source project'
      }
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
          {isJa
            ? 'TrainLCDはオープンソースプロジェクト'
            : 'TrainLCD is an open source project'}
        </h3>
        <p className={commonStyles.text}>
          {isJa
            ? 'TrainLCDはMITライセンスのオープンソースプロジェクトです。'
            : 'TrainLCD is an MIT licensed open source project.'}
          <br />
          {isJa
            ? 'つまり、誰でもTrainLCDの改善のサポートができるということです！'
            : 'This means that anyone can help improve the TrainLCD!'}
        </p>
        <a
          href="https://github.com/TrainLCD/MobileApp"
          target="_blank"
          rel="noopener noreferrer"
          className={commonStyles.link}
        >
          {isJa ? 'リポジトリを見る' : 'See Repository'}
        </a>
      </main>
    </Modal>
  );
};

export default OSSModal;
