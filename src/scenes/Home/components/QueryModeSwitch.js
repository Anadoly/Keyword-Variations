import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { variationsActions } from 'redux/actions';
import Switch from 'react-switch';
import styled from '@emotion/styled';
import { Colors } from 'utils';

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  label {
    margin-left: 10px;
    font-weight: bold;
  }
`;

export class QueryModeSwitch extends Component {
  static propTypes = {
    setQueryMode: PropTypes.func.isRequired,
    queryMode: PropTypes.bool.isRequired,
  };
  handleChange = (checked) => {
    const { setQueryMode } = this.props;
    return setQueryMode(checked);
  };
  render() {
    const { queryMode } = this.props;
    return (
      <SwitchWrapper>
        <Switch
          onChange={this.handleChange}
          checked={queryMode}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor={Colors.secondaryColor}
          height={28}
          width={50}
          id="query-mode"
        />
        <label htmlFor="query-mode">Boolean Query Mode</label>
      </SwitchWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { queryMode } = state.variations;
  return {
    queryMode,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setQueryMode: (queryMode) =>
    dispatch(variationsActions.setQueryMode(queryMode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryModeSwitch);
