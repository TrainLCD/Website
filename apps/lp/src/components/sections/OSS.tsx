import styles from './OSS.module.css';
import DescriptionText from '../DescriptionText';
import GitHubIcon from '../GitHubIcon';

const OSSSection = () => {
  return (
    <section className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.texts}>
          <p className={styles.shortHeading}>PRs Welcome</p>
          <h3 className={styles.heading}>
            TrainLCDは
            <br />
            <span className={styles.accent}>
              オープンソース
              <br />
              プロジェクト
            </span>
          </h3>
          <DescriptionText>
            TrainLCDはMITライセンスのオープンソースプロジェクトです。
            <br />
            エンジニアの皆さん、
            <br />
            TrainLCDの開発に貢献してみませんか？
          </DescriptionText>
          <a
            className={styles.cta}
            href="https://github.com/TrainLCD/MobileApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            リポジトリを見る
          </a>
        </div>
        <div className={styles.mockup}>
          <GitHubIcon className={styles.githubIcon} />
        </div>
      </div>
    </section>
  );
};

export default OSSSection;
