import styled from 'styled-components';

const HistorySection: React.VFC = () => {
  return (
    <Container>
      <h1>WIP: History Page!</h1>
    </Container>
  );
};

const Container = styled.div`
  position: sticky;
  min-height: 100vh;
  color: #fff;
  background-color: black;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default HistorySection;
