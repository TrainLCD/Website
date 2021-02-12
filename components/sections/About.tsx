import Image from 'next/image';
import React from 'react';
import { ShowingImage } from '../../models/ShowingImage';
import styles from '../../styles/components/sections/About.module.css';

type Props = {
  showingImg: ShowingImage;
};

const AboutSection: React.FC<Props> = ({ showingImg }: Props) => {
  return (
    <div id="about" className={styles.root}>
      <h1 className={styles.title}>ABOUT</h1>
      <h2 className={styles.subtitle}>TrainLCDとは</h2>
      <div className={styles.mockup}>
        <Image
          src={showingImg.mock}
          alt="TrainLCD"
          width={542.25}
          height={288.375}
        />
        <h2 className={styles.heading}>
          電車のLCDを再現した
          <br />
          スマホ/iPadアプリ
        </h2>
        <p className={styles.text}>
          あなたのスマートフォンで使える電車のLCD。
          <br />
          満員電車でどこにいるかわからないときや、乗ったことのない路線に乗車する際など、
          <br />
          きっとあなたの役に立つはずです。
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
