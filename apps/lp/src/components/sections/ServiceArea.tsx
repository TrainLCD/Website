import styles from './ServiceArea.module.css';
import mojikoMock from '../../assets/images/mockup/mojiko.png';
import DescriptionText from '../DescriptionText';
import ImageWithoutSize from '../ImageWithoutSize';

const ServiceAreaSection = () => {
  return (
    <section className={styles.container}>
      <div className={styles.mockup}>
        <ImageWithoutSize src={mojikoMock} alt="TrainLCD" />
      </div>
      <div className={styles.texts}>
        <p className={styles.shortHeading}>サービス対象エリア</p>
        <h3 className={styles.heading}>
          <span className={styles.accent}>日本全国</span>
          サービス対象
        </h3>
        <DescriptionText>
          一部例外を除き、日本全国のほとんどの
          <br />
          鉄道路線に対応しています
          <sup className={styles.caption}>*1</sup>
        </DescriptionText>
        <p className={styles.disclaimer}>
          <sup>*1</sup>
          地下鉄などの電波の入りづらい路線、鶴見線などの入り組んだ路線は一部サービス保証外となります。またサービス対象は鉄道路線のみであり、バス等の移動手段には対応しておりません。
        </p>
      </div>
    </section>
  );
};

export default ServiceAreaSection;
