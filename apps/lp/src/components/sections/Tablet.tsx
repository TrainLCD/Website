import styles from './Tablet.module.css';
import iPadMock from '../../assets/images/ipad.png';
import DescriptionText from '../DescriptionText';
import ImageWithoutSize from '../ImageWithoutSize';

const TabletSection = () => {
  return (
    <section className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.texts}>
          <p className={styles.shortHeading}>タブレット対応</p>
          <h3 className={styles.heading}>
            <span className={styles.accent}>iPad</span>
            で使えます
          </h3>
          <DescriptionText>
            iPadと一緒に使えば、 もっとわかりやすく次の駅を知ることができます。
            <br />
            最新のどのiPadにも対応しているため、
            <br />
            アプリをダウンロードしてすぐ快適に使えます。
            <sup className={styles.caption}>*2</sup>
          </DescriptionText>
          <p className={styles.disclaimer}>
            <sup>*2</sup>
            Wi-FiモデルのiPadはGPSを搭載していないため、一定条件下で動作が不安定になる場合があります。
          </p>
        </div>
        <div className={styles.mockup}>
          <ImageWithoutSize src={iPadMock} alt="iPad" />
        </div>
      </div>
    </section>
  );
};

export default TabletSection;
