import React from 'react';
import { number, oneOfType, string } from 'prop-types';
import styled from 'styled-components';

export { default as AmpImg } from './index.amp';

const StyledImg = styled.img`
  display: block;
  width: 100%;
`;

export const Img = ({ alt, src, srcset, height, width }) => {
  const props = { alt, src, height, width };

  if (srcset) {
    props.srcSet = srcset;
  }
  if (!width) {
    delete props.width;
  }

  return <StyledImg {...props} />;
};

Img.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
  srcset: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
};

Img.defaultProps = {
  height: null,
  srcset: null,
  width: null,
};

export default Img;
