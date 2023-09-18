import Image, { ImageProps } from 'next/image';
import styled from 'styled-components';

const StyledImage = styled(Image)`
  object-fit: contain;
  position: relative !important;
  width: auto !important;
`;

const ImageWithoutSize: React.FC<ImageProps> = (props) => (
  <StyledImage {...props} fill />
);

export default ImageWithoutSize;
