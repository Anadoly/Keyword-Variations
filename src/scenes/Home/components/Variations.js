import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'components';
import styled from '@emotion/styled';
import { Colors } from 'utils';
import { QuestionMark, RightArrow } from 'images';
import { variationsActions } from 'redux/actions';
const VariationsWrapper = styled.div`
  h2 {
    color: ${Colors.grey};
    font-weight: normal;
    display: flex;
    align-items: center;
    picture {
      width: 18px;
      height: 18px;
      display: flex;
      margin-left: 10px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
const VariationsWords = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  picture {
    display: flex;
  }
  picture,
  picture + p {
    margin: 0;
    margin-left: 5px;
    margin-right: 5px;
    direction: rtl;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }
  span {
    background: ${Colors.secondaryColor};
    padding: 5px 7px;
    border-radius: 3px;
    color: ${Colors.white};
    font-weight: bold;
    margin-left: 5px;
    margin-right: 5px;
  }
  button {
    background: ${Colors.primaryColor};
    border-color: ${Colors.primaryColor};
    padding: 5px 7px;
    border-radius: 3px;
    color: ${Colors.white};
    font-weight: bold;
    line-height: 1.6;
    font-size: 16px;

    &:hover {
      box-shadow: 2px 2px 3px 3px ${Colors.grey};
    }
  }
`;

export class Variations extends Component {
  static propTypes = {
    variations: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    copyVariations: PropTypes.func.isRequired,
  };

  render() {
    const { variations, loading, copyVariations } = this.props;
    const variationsContent =
      variations.length > 0 &&
      variations.slice(0, 3).map((variation) => (
        <VariationsWords key={JSON.stringify(variation)}>
          <p>{variation.word}</p>
          <picture>
            <img src={RightArrow} alt="Right Arrow" />
          </picture>
          <p>
            {variation.variations.map((word) => (
              <span key={JSON.stringify(word)}> {word} </span>
            ))}
          </p>
          {variation.copied ? (
            <button onClick={() => copyVariations(variation.word)}>
              Copied
            </button>
          ) : (
            <button onClick={() => copyVariations(variation.word)}>
              Copy All
            </button>
          )}
        </VariationsWords>
      ));
    return (
      <VariationsWrapper>
        <>
          <h2>
            keyword variations:{' '}
            <picture>
              <img src={QuestionMark} alt="Question Mark" />
            </picture>{' '}
            {loading && <Loader />}{' '}
          </h2>
          {variationsContent}
        </>
      </VariationsWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { variations, loading } = state.variations;
  return {
    variations,
    loading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  copyVariations: (queryMode) =>
    dispatch(variationsActions.copyVariations(queryMode)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Variations);
