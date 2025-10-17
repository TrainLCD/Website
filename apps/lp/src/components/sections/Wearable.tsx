import styles from './Wearable.module.css';
import appleWatchAppMock from '../../assets/images/applewatch_app.png';
import appleWatchLiveActivitiesMock from '../../assets/images/applewatch_la.png';
import DescriptionText from '../DescriptionText';
import ImageWithoutSize from '../ImageWithoutSize';

const WearableSection = () => {
  return (
    <section className={styles.container}>
      <div className={styles.mockupWithDisclaimer}>
        <div className={styles.mockup}>
          <ImageWithoutSize
            src={appleWatchLiveActivitiesMock}
            alt="Smart Stack Live Activities"
            className={styles.mockImage}
          />
          <ImageWithoutSize
            src={appleWatchAppMock}
            alt="Apple Watch App"
            className={styles.mockImage}
          />
        </div>
      </div>
      <div className={styles.texts}>
        <p className={styles.shortHeading}>満員電車でも安心</p>
        <h3 className={styles.heading}>
          <span className={styles.accent}>スマートウォッチ</span>
          <sup className={styles.caption}>*3</sup>
          <br />
          でも使えます
        </h3>

        <DescriptionText>
          Apple WatchもしくはWear OS by
          Google搭載スマートウォッチ組み合わせれば手首を見るだけで今停車している駅や、
          <br />
          次に停まる駅を知ることができます。
        </DescriptionText>
        <p className={styles.disclaimer}>
          <sup>*3</sup>
          Wear OS by Googleでのご使用はAndroidスマートフォンとペアリングされている必要があります。
          <br />
          iPhoneとペアリングされている場合はご使用になれませんのでご了承下さい。
        </p>
      </div>
    </section>
  );
};

export default WearableSection;
