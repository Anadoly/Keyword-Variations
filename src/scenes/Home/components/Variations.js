import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'components';
import styled from '@emotion/styled';
import { Colors } from 'utils';
import { QuestionMark, RightArrow } from 'images';
import { variationsActions } from 'redux/actions';
import { keyframes } from '@emotion/react';

const disappear = keyframes`
  0% { 
    opacity: 1;
  }
  100% { 
    opacity: 0;
  }
`;
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
  p {
    margin-top: 0;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 15px;
  }
  picture {
    display: flex;
    margin-bottom: 15px;
  }
  picture,
  picture + p {
    direction: rtl;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }
  .variation {
    background: ${Colors.secondaryColor};
    padding: 5px 7px;
    border-radius: 3px;
    color: ${Colors.white};
    font-weight: bold;
    cursor: pointer;
    line-height: 31px;
    position: relative;
    &:hover {
      box-shadow: 2px 2px 3px 3px ${Colors.grey};
    }
    &.copied {
      &::before {
        content: 'Copied';
        position: absolute;
        top: -52%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        color: #fff;
        z-index: 2;
        background: #000;
        border-radius: 5px;
        padding: 5px 10px;
        opacity: 0.8;
        animation: ${disappear} 1s forwards;
      }
    }
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
    margin-bottom: 15px;
    margin-left: 5px;

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
    copiedVariation: PropTypes.string.isRequired,
    copyWord: PropTypes.func.isRequired,
    copiedWord: PropTypes.string.isRequired,
  };

  render() {
    const {
      variations,
      loading,
      copyVariations,
      copiedVariation,
      copyWord,
      copiedWord,
    } = this.props;
    const variationsContent =
      variations.length > 0 &&
      variations.slice(0, 3).map((variation) => (
        <VariationsWords key={JSON.stringify(variation)}>
          <p>{variation.word}</p>
          <picture>
            <img src={RightArrow} alt="Right Arrow" />
          </picture>
          {variation.variations.map((word) => (
            <p
              className={copiedWord === word ? 'variation copied' : 'variation'}
              key={JSON.stringify(word)}
              onClick={() => {
                return copyWord(word);
              }}
            >
              {word}
            </p>
          ))}
          <button onClick={() => copyVariations(variation.word)}>
            {variation.word === copiedVariation ? 'Copied' : 'Copy All'}
          </button>
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
          <div id="variations">{variationsContent}</div>
        </>
      </VariationsWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { variations, loading, copiedVariation, copiedWord } = state.variations;
  return {
    variations,
    loading,
    copiedVariation,
    copiedWord,
  };
};

const mapDispatchToProps = (dispatch) => ({
  copyVariations: (queryMode) =>
    dispatch(variationsActions.copyVariations(queryMode)),
  copyWord: (word) => dispatch(variationsActions.copyWord(word)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Variations);
