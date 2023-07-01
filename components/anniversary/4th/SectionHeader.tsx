import React from 'react';
import styled from 'styled-components';
import useIsJa from '../../../hooks/useIsJa';
import Divider from './Divider';

type Props = {
  title: string;
  subTitle: string;
  white?: boolean;
};

const SectionHeader: React.VFC<Props> = ({ title, subTitle, white }) => {
  const isJa = useIsJa();

  return (
    <>
      <TitleContainer white={white}>
        <SectionTitle>{title}</SectionTitle>
        {isJa && <SectionSubTitle>{subTitle}</SectionSubTitle>}
      </TitleContainer>
      <Divider white={white} />
    </>
  );
};

const TitleContainer = styled.div<{ white?: boolean }>`
  color: ${({ white }) => (white ? '#fff' : '#111')};
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  letter-spacing: 0.25rem;
  font-weight: bold;
`;

const SectionSubTitle = styled.h3`
  font-size: 1rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
`;

export default SectionHeader;
