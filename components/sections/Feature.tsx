import React from 'react';
import { isJa } from '../../utils/isJa';
import Container from '../Container';
import { Subtitle, Title } from '../Typography';
import AppleWatchFeatureSection from './features/AppleWatch';
import AreaFeatureSection from './features/Area';
import IPadFeatureSection from './features/IPad';
import OSSFeatureSection from './features/OSS';

const AboutSection: React.FC = () => (
  <Container odd>
    {isJa && <Title>FEATURE</Title>}
    <Subtitle>{isJa ? 'TrainLCDの特徴' : 'TrainLCD features'}</Subtitle>
    <AreaFeatureSection />
    <IPadFeatureSection />
    <AppleWatchFeatureSection />
    <OSSFeatureSection />
  </Container>
);

export default AboutSection;
