import React from 'react';
import { isJa } from '../../utils/isJa';
import Container from '../Container';
import { Subtitle, Title } from '../Typography';

const AboutSection: React.FC = () => (
  <Container>
    {isJa && <Title>FEATURE</Title>}
    <Subtitle>{isJa ? 'TrainLCDの特徴' : 'TrainLCD features'}</Subtitle>
  </Container>
);

export default AboutSection;
