import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import Paragraph from '@bbc/psammead-paragraph';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import Image from '@bbc/psammead-image';

export const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

export const Item = styled.div`
  grid-column: ${props => props.startAtCol} / span ${props => props.span};
`;

export const ItemWithConfig = styled.div`
  @media (min-width: ${props => props.breakpointMin}) and (max-width: ${props =>
      props.breakpointMax}) {
    grid-column: ${props => props.start} / span ${props => props.span};
  }
`;

export const ItemMultiConfig = styled.div`
  @media (min-width: ${props =>
      props.layouts[0].breakpointMin}) and (max-width: ${props =>
      props.layouts[0].breakpointMax}) {
    grid-column: ${props => props.layouts[0].start} /
      ${props =>
        props.layouts[0].end
          ? props.layouts[0].end
          : `span ${props.layouts[0].span}`};
  }
`;

export const ExampleParagraph = ({ identifier }) => (
  <Paragraph script={cyrillicAndLatin} service="news">
    {identifier}This is a long paragraph that will wrap for several lines. This
    is a long paragraph that will wrap for several lines. This is a long
    paragraph that will wrap for several lines. This is a long paragraph that
    will wrap for several lines. This is a long paragraph that will wrap for
    several lines. This is a long paragraph that will wrap for several lines.
    This is a long paragraph that will wrap for several lines. This is a long
    paragraph that will wrap for several lines.
  </Paragraph>
);

export const ExampleFigure = styled.figure`
  margin: 0;
  padding: 0;
`;

export const ExampleImage = () => (
  <Image
    alt="Robert Downey Junior in Iron Man"
    src="https://ichef.bbci.co.uk/news/660/cpsprodpb/11897/production/_106613817_999_al_.jpg"
    width="640"
  />
);

ExampleParagraph.propTypes = {
  identifier: string,
};
ExampleParagraph.defaultProps = {
  identifier: '1',
};
