import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'utils';
import { TextArea, QueryModeSwitch, Variations } from './components';
import styled from '@emotion/styled';

const HomePageWrapper = styled.div`
  h1 {
    font-size: 22px;
  }
`;

const TextAreasWrapper = styled.div`
  display: ${(props) => (props.queryMode ? 'block' : 'flex')};
  justify-content: space-between;
`;

export class HomePage extends Component {
  static propTypes = {
    queryMode: PropTypes.bool.isRequired,
  };

  render() {
    const { queryMode } = this.props;
    const textAreasLabel = queryMode
      ? ['boolean query']
      : ['any', 'and', 'not'];
    return (
      <Container>
        <HomePageWrapper>
          <h1>Create a New Sub-query</h1>
          <QueryModeSwitch />
          <TextAreasWrapper queryMode={queryMode}>
            {textAreasLabel.map((textArea) => (
              <TextArea labelWord={textArea} key={textArea} />
            ))}
          </TextAreasWrapper>
          <Variations />
        </HomePageWrapper>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { queryMode } = state.variations;
  return {
    queryMode,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
