import React, { useState } from 'react';
import styles from '../../styles/components/sections/Feature.module.css';
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
        <h1 className={styles.title}>FEATURE</h1>
        <h2 className={styles.subtitle}>TrainLCDの特徴</h2>
        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.circle}>
              <JapanIcon />
            </div>
            <h3 className={styles.heading}>日本全国サービス対象</h3>
            <p className={styles.text}>
              地下鉄路線や一部の路線<sup className={styles.sup}>*1</sup>
              を除き、日本全国のほとんどの路線に対応しています。
            </p>
            <p className={styles.captionText}>
              <sup className={styles.sup}>*1</sup>鶴見線、直通路線、支線など
            </p>
            <button onClick={handleJapanClick} className={styles.learnMore}>
              詳しくはこちら
            </button>
          </div>
          <div className={styles.feature}>
            <div className={styles.circle}>
              <IPadIcon />
            </div>
            <h3 className={styles.heading}>iPad対応</h3>
            <p className={styles.text}>
              iPadと一緒に使えば、もっとわかりやすく次の駅を知ることができます。
            </p>
            <button onClick={handleIPadClick} className={styles.learnMore}>
              詳しくはこちら
            </button>
          </div>
          <div className={styles.feature}>
            <div className={styles.circle}>
              <AppleIcon />
            </div>
            <h3 className={styles.heading}>Apple Watch対応</h3>
            <p className={styles.text}>
              iPhoneを見なくても、Apple
              Watchを見れば次の駅がわかるようになります。
            </p>
            <button
              onClick={handleAppleWatchClick}
              className={styles.learnMore}
            >
              詳しくはこちら
            </button>
          </div>
          <div className={styles.feature}>
            <div className={styles.circle}>
              <OSSIcon />
            </div>
            <h3 className={styles.heading}>オープンソースプロジェクト</h3>
            <p className={styles.text}>
              TrainLCDはオープンソースプロジェクトです。誰でも開発に参加・貢献できます。
            </p>
            <button onClick={handleOSSClick} className={styles.learnMore}>
              詳しくはこちら
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
