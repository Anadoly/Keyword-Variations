import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { variationsActions } from 'redux/actions';
import { arrayEquals, Colors } from 'utils';
import styled from '@emotion/styled';
import uniq from 'lodash/uniq';

let timeout = null;

const TextAreaWrapper = styled.div`
  width: ${(props) => (props.queryMode ? '100%' : '32%')};
  h2 {
    font-weight: 300;
    font-size: 16px;
    text-transform: uppercase;
    margin-bottom: 0;
    span {
      background: ${Colors.secondaryColor};
      padding: 5px 5px;
      border-radius: 3px;
      color: ${Colors.white};
      font-weight: bold;
      display: inline-block;
      margin-bottom: ${(props) => (props.queryMode ? '10px' : '0')};
    }
    & + p {
      margin: 0;
      margin-bottom: 10px;
      font-weight: normal;
      color: ${Colors.grey};
    }
  }
  textarea {
    width: 100%;
    height: 250px;
    border: 1px solid ${Colors.grey};
    border-radius: 10px;
    resize: none;
    padding: 15px;
  }
`;
export class TextArea extends Component {
  static propTypes = {
    labelWord: PropTypes.string.isRequired,
    getVariations: PropTypes.func.isRequired,
    searchedWords: PropTypes.array.isRequired,
    queryMode: PropTypes.bool.isRequired,
    rearrangementVariations: PropTypes.func.isRequired,
  };

  onClick = (e) => {
    const { searchedWords, rearrangementVariations, queryMode } = this.props;
    const value = e.target.value;
    const startPosition = e.target.selectionStart;
    const endPosition = e.target.selectionEnd;
    const spacers = queryMode ? 'OR' : ',';
    const targetWord =
      value.indexOf(spacers, endPosition) < 0
        ? value.substring(
            value.lastIndexOf(spacers, startPosition) < 0
              ? 0
              : value.lastIndexOf(spacers, startPosition)
          )
        : value.substring(
            value.lastIndexOf(spacers, startPosition) < 0
              ? 0
              : value.lastIndexOf(spacers, startPosition),
            value.indexOf(spacers, endPosition)
          );
    const currentWord = targetWord.replaceAll(spacers, '').trim();

    if (searchedWords.includes(currentWord)) {
      const wordIndex = searchedWords.indexOf(currentWord);
      const wordBefore =
        searchedWords[
          wordIndex === 0 ? searchedWords.length - 1 : wordIndex - 1
        ];
      const wordAfter =
        searchedWords[
          searchedWords.length - 1 === wordIndex ? 0 : wordIndex + 1
        ];
      const sortedWords = uniq([
        currentWord,
        wordAfter,
        wordBefore,
        ...searchedWords,
      ]);
      rearrangementVariations(sortedWords);
    } else {
      return;
    }
  };

  onChange = (e) => {
    const { getVariations, searchedWords: lastWords, queryMode } = this.props;
    const valueArray = queryMode
      ? e.target.value.split(/or|OR|Or|oR/)
      : e.target.value.split(',');
    const words = [];
    valueArray.forEach((word) => {
      if (word.replaceAll(' ', '').replaceAll('"', '').length >= 3) {
        return words.push(word.replaceAll('"', '').trim());
      }
    });
    clearTimeout(timeout);
    if (words.length > 0 && !arrayEquals(lastWords)) {
      const searchWords = uniq([...words.reverse(), ...lastWords]);
      timeout = setTimeout(function () {
        getVariations(searchWords);
      }, 1000);
      return timeout;
    } else {
      return;
    }
  };

  render() {
    const { labelWord, queryMode } = this.props;

    return (
      <TextAreaWrapper queryMode={queryMode}>
        <h2>
          <span>{labelWord}</span> {!queryMode && 'of these keywords'}
        </h2>
        {!queryMode && <p>Separate the words with comma</p>}

        <form>
          <label className="visually-hidden" htmlFor={labelWord}>
            Any Keywords
          </label>
          <textarea
            onChange={this.onChange}
            id={labelWord}
            onClick={this.onClick}
          />
        </form>
      </TextAreaWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { searchedWords, queryMode } = state.variations;
  return {
    searchedWords,
    queryMode,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getVariations: (words) => dispatch(variationsActions.getVariations(words)),
  rearrangementVariations: (words) =>
    dispatch(variationsActions.rearrangementVariations(words)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TextArea);
