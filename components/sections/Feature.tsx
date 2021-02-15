import React, { useState } from 'react';
import styles from '../../styles/components/sections/Feature.module.css';
import { isJa } from '../../utils/isJa';
import AppleIcon from '../AppleIcon';
import IPadIcon from '../iPadIcon';
import JapanIcon from '../JapanIcon';
import AppleWatchModal from '../modals/AppleWatch';
import IPadModal from '../modals/IPad';
import JapanModal from '../modals/Japan';
import OSSModal from '../modals/OSS';
import OSSIcon from '../OSSIcon';

const AboutSection: React.FC = () => {
  const [isJapanModalOpen, setIsJapanModalOpen] = useState(false);
  const [isIPadModalOpen, setIsIPadModalOpen] = useState(false);
  const [isAppleWatchModalOpen, setIsAppleWatchModalOpen] = useState(false);
  const [isOSSModalOpen, setIsOSSModalOpen] = useState(false);

  const handleJapanClick = () => setIsJapanModalOpen(true);
  const handleJapanModalRequestClose = () => {
    setIsJapanModalOpen(false);
  };

  const handleIPadClick = () => setIsIPadModalOpen(true);
  const handleIPadModalRequestClose = () => {
    setIsIPadModalOpen(false);
  };

  const handleAppleWatchClick = () => setIsAppleWatchModalOpen(true);
  const handleAppleWatchModalRequestClose = () => {
    setIsAppleWatchModalOpen(false);
  };

  const handleOSSClick = () => setIsOSSModalOpen(true);
  const handleOSSModalRequestClose = () => {
    setIsOSSModalOpen(false);
  };

  return (
    <>
      <JapanModal
        isOpen={isJapanModalOpen}
        onRequestClose={handleJapanModalRequestClose}
      />
      <IPadModal
        isOpen={isIPadModalOpen}
        onRequestClose={handleIPadModalRequestClose}
      />
      <AppleWatchModal
        isOpen={isAppleWatchModalOpen}
        onRequestClose={handleAppleWatchModalRequestClose}
      />
      <OSSModal
        isOpen={isOSSModalOpen}
        onRequestClose={handleOSSModalRequestClose}
      />
      <div className={styles.root}>
        {isJa && <h1 className={styles.title}>FEATURE</h1>}
        <h2 className={styles.subtitle}>
          {isJa ? 'TrainLCDの特徴' : 'TrainLCD features'}
        </h2>
        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.circle}>
              <JapanIcon />
            </div>
            <h3 className={styles.heading}>
              {isJa ? '日本全国サービス対象' : 'Service target all over Japan'}
            </h3>
            <p className={styles.text}>
              {isJa
                ? '地下鉄路線や一部の路線'
                : 'Except for subway lines and some lines'}
              <sup className={styles.sup}>*1</sup>
              {isJa
                ? 'を除き、日本全国のほとんどの路線に対応しています。'
                : ', it supports most lines throughout Japan.'}
            </p>
            <p className={styles.captionText}>
              <sup className={styles.sup}>*1</sup>
              {isJa
                ? '鶴見線、直通路線、支線など'
                : 'Tsurumi line, direct communication line, branch line, etc.'}
            </p>
            <button onClick={handleJapanClick} className={styles.learnMore}>
              {isJa ? '詳しくはこちら' : 'Learn more'}
            </button>
          </div>
          <div className={styles.feature}>
            <div className={styles.circle}>
              <IPadIcon />
            </div>
            <h3 className={styles.heading}>
              {isJa ? 'iPad対応' : 'Compatible with iPad'}
            </h3>
            <p className={styles.text}>
              {isJa
                ? 'iPadと一緒に使えば、もっとわかりやすく次の駅を知ることができます。'
                : 'If you use it with an iPad, you can know the next station more easily.'}
            </p>
            <button onClick={handleIPadClick} className={styles.learnMore}>
              {isJa ? '詳しくはこちら' : 'Learn more'}
            </button>
          </div>
          <div className={styles.feature}>
            <div className={styles.circle}>
              <AppleIcon />
            </div>
            <h3 className={styles.heading}>
              {isJa ? 'Apple Watch対応' : 'Compatible with Apple Watch'}
            </h3>
            <p className={styles.text}>
              {isJa
                ? `iPhoneを見なくても、Apple Watchを見れば次の駅がわかるようになります。`
                : `Even if you don't look at your iPhone, you can see the next station by looking at your Apple Watch.`}
            </p>
            <button
              onClick={handleAppleWatchClick}
              className={styles.learnMore}
            >
              {isJa ? '詳しくはこちら' : 'Learn more'}
            </button>
          </div>
          <div className={styles.feature}>
            <div className={styles.circle}>
              <OSSIcon />
            </div>
            <h3 className={styles.heading}>
              {isJa ? 'オープンソースプロジェクト' : 'Open Source Project'}
            </h3>
            <p className={styles.text}>
              {isJa
                ? 'TrainLCDはオープンソースプロジェクトです。誰でも開発に参加・貢献できます。'
                : 'TrainLCD is an open source project. Anyone can participate in and contribute to the development.'}
            </p>
            <button onClick={handleOSSClick} className={styles.learnMore}>
              {isJa ? '詳しくはこちら' : 'Learn more'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
