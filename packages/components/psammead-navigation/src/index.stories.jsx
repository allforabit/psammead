import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import {
  color,
  select,
  number,
  text,
  withKnobs,
  boolean,
} from '@storybook/addon-knobs';
import * as svgs from '@bbc/psammead-assets/svgs';
import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import Brand from '@bbc/psammead-brand';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import Navigation, { NavigationUl, NavigationLi } from './index';
import { ampDecorator } from '../../../../.storybook/config';
import {
  CanonicalMenuButton,
  AmpMenuButton,
  CanonicalDropdown,
  AmpDropdown,
  DropdownUl,
  DropdownLi,
} from './DropdownNavigation';
import igboNavData from '../testHelpers/igbo';
import pidginNavData from '../testHelpers/pidgin';
import yorubaNavData from '../testHelpers/yoruba';
import arabicNavData from '../testHelpers/arabic';

import notes from '../README.md';

const navStoriesData = [
  {
    title: 'igbo',
    currentPageText: 'Current page',
    data: igboNavData,
  },
  {
    title: 'pidgin',
    currentPageText: 'Current page',
    data: pidginNavData,
  },
  {
    title: 'yoruba',
    currentPageText: 'Current page',
    data: yorubaNavData,
  },
  {
    title: 'arabic',
    currentPageText: 'Current page',
    data: arabicNavData,
    dir: 'rtl',
  },
];

const BackgroundContainer = styled.div`
  background-color: #000000;
  height: 100vh;
`;

const inputs = () => {
  // capitalization is only for presentation purpose on the knob
  const options = Object.keys(svgs)
    .filter(key => key !== 'BBC_BLOCKS')
    .map(key => key.charAt(0).toUpperCase() + key.slice(1));

  const svgChoice = select('Service SVG', options, 'Igbo').toLowerCase();
  const productInput = text('Product', 'BBC News');
  const serviceLocalisedNameInput = text('Localised service name', 'Igbo');
  const svgRatio = svgs[svgChoice].ratio;
  const svgMaxHeight = 24;
  const svgMinHeight = 16;
  const minWidthInput = number('minimum svg width', svgRatio * svgMinHeight);
  const maxWidthInput = number('maximum svg width', svgRatio * svgMaxHeight);
  const svgHeightInput = number('desired height svg', svgMaxHeight);
  const borderBottom = boolean('Border Bottom', false);
  const borderTop = boolean('Border Top', false);
  const backgroundColour = color('Background colour', `${C_POSTBOX}`);
  const logoColour = color('Logo colour', `${C_WHITE}`);

  return {
    productInput,
    serviceLocalisedNameInput,
    svgChoice,
    svgHeightInput,
    minWidthInput,
    maxWidthInput,
    borderTop,
    borderBottom,
    backgroundColour,
    logoColour,
  };
};

const getBrand = () => {
  const {
    productInput,
    serviceLocalisedNameInput,
    svgHeightInput,
    minWidthInput,
    maxWidthInput,
    svgChoice,
    borderBottom,
    borderTop,
    backgroundColour,
    logoColour,
  } = inputs();

  return (
    <Brand
      product={productInput}
      serviceLocalisedName={serviceLocalisedNameInput}
      svgHeight={svgHeightInput}
      minWidth={minWidthInput}
      maxWidth={maxWidthInput}
      svg={svgs[svgChoice]}
      url="https://www.bbc.com/news"
      borderBottom={borderBottom}
      borderTop={borderTop}
      backgroundColour={backgroundColour}
      logoColour={logoColour}
    />
  );
};

const navigationStory = (
  skipLinkText,
  currentPageText,
  navData,
  dir,
  brand,
) => ({ script, service }) => (
  <>
    {brand && getBrand()}

    <Navigation
      script={script}
      skipLinkText={skipLinkText}
      service={service}
      dir={dir}
    >
      <NavigationUl>
        {navData.map((item, index) => {
          const { title, url } = item;
          const active = index === 0;

          return (
            <NavigationLi
              key={title}
              url={url}
              script={script}
              active={active}
              currentPageText={currentPageText}
              service={service}
            >
              {title}
            </NavigationLi>
          );
        })}
      </NavigationUl>
    </Navigation>
  </>
);

const dropdownStory = type => ({ dir, script, service }) => {
  const dropdownList = (
    <DropdownUl>
      {pidginNavData.map((item, index) => {
        const active = index === 3;
        const { title, url } = item;
        return (
          <DropdownLi
            script={script}
            service={service}
            key={title}
            dir={dir}
            url={url}
            active={active}
            currentPageText="Current page"
          >
            {title}
          </DropdownLi>
        );
      })}
    </DropdownUl>
  );

  return type === 'canonical' ? (
    <CanonicalDropdown>{dropdownList}</CanonicalDropdown>
  ) : (
    <AmpDropdown>{dropdownList}</AmpDropdown>
  );
};

const storiesWithoutBrand = storiesOf(
  'Components|Navigation/without brand',
  module,
)
  .addDecorator(withKnobs)
  .addDecorator(ampDecorator)
  .addDecorator(withServicesKnob());

navStoriesData.map(item => {
  const { title, skipLinkText, currentPageText, data, dir } = item;
  return storiesWithoutBrand.add(
    title,
    navigationStory(skipLinkText, currentPageText, data, dir),
    {
      notes,
    },
  );
});

storiesWithoutBrand.add(
  'Canonical Closed Menu',
  () => (
    <BackgroundContainer>
      <CanonicalMenuButton
        announcedText="Menu"
        onOpen={() => {}}
        isOpen={false}
        onClose={() => {}}
      />
    </BackgroundContainer>
  ),
  {
    notes,
  },
);

storiesWithoutBrand.add(
  'Canonical Open Menu',
  () => (
    <BackgroundContainer>
      <CanonicalMenuButton
        announcedText="Menu"
        onOpen={() => {}}
        isOpen
        onClose={() => {}}
      />
    </BackgroundContainer>
  ),
  {
    notes,
  },
);

storiesWithoutBrand.add(
  'AMP Menu Button',
  () => (
    <BackgroundContainer>
      <AmpMenuButton announcedText="Menu" onToggle="" />
    </BackgroundContainer>
  ),
  {
    notes,
  },
);

storiesWithoutBrand.add('Canonical Dropdown menu', dropdownStory('canonical'), {
  notes,
});

storiesWithoutBrand.add('AMP Dropdown menu', dropdownStory('amp'), {
  notes,
});

const storiesWithBrand = storiesOf('Components|Navigation/with brand', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob());

storiesWithBrand.add(
  navStoriesData[0].title,
  navigationStory(
    navStoriesData[0].skipLinkText,
    navStoriesData[0].currentPageText,
    igboNavData,
    navStoriesData[0].dir,
    true,
  ),
  {
    notes,
  },
);
