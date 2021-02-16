import Image from 'next/image';
import { ShowingImage } from '../../models/ShowingImage';
import styles from '../../styles/components/sections/About.module.css';
import { isJa } from '../../utils/isJa';

type Props = {
  showingImg: ShowingImage;
};

const AboutSection: React.FC<Props> = ({ showingImg }: Props) => {
  return (
    <div id="about" className={styles.root}>
      {isJa && <h1 className={styles.title}>ABOUT</h1>}
      <h2 className={styles.subtitle}>
        {isJa ? 'TrainLCDとは' : 'What is TrainLCD?'}
      </h2>
      <div className={styles.mockup}>
        <Image
          src={showingImg.mock}
          alt="TrainLCD"
          width={542.25}
          height={288.375}
        />
        <h2 className={styles.heading}>
          {isJa
            ? `電車のLCDを再現した\nスマホ/iPadアプリ`
            : 'TrainLCD is a smartphone/iPad app\nthat reproduces the LCD of a train.'}
        </h2>
        <p className={styles.text}>
          {isJa
            ? `あなたのスマートフォンで使える電車のLCD。\n満員電車でどこにいるかわからないときや、乗ったことのない路線に乗車する際など、\nきっとあなたの役に立つはずです。`
            : `LCD of the train that can be used on your smartphone.\nIf you don't know where you are on a crowded train, or if you're on a route you've never taken,\nit's sure to help you.`}
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
