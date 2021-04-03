import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ContainerWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  padding: 0 20px;
`;

export default function Container(props) {
  return <ContainerWrapper {...props}>{props.children}</ContainerWrapper>;
}

Container.propTypes = {
  children: PropTypes.object,
};
