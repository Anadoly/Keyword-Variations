import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { variationsActions } from 'redux/actions';
import {
  arrayEquals,
  Colors,
  generateKeywordArray,
  getWordFromCoursePosition,
  sortingWords,
} from 'utils';
import styled from '@emotion/styled';

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
    clearVariations: PropTypes.func.isRequired,
  };

  onClick = (e) => {
    if (e.target.value === '') {
      return;
    }

    const {
      searchedWords,
      rearrangementVariations,
      queryMode,
      getVariations,
    } = this.props;
    const value = e.target.value;
    const startPosition = e.target.selectionStart;
    const endPosition = e.target.selectionEnd;
    const spacers = queryMode ? 'OR' : ',';
    const splitter = queryMode ? /or|OR|Or|oR/ : ',';
    const currentWord = getWordFromCoursePosition(
      value,
      startPosition,
      endPosition,
      spacers
    );

    if (searchedWords.includes(currentWord)) {
      const sortedWords = sortingWords(searchedWords, currentWord);
      return rearrangementVariations(sortedWords);
    } else {
      const newWords = generateKeywordArray(e.target.value, splitter);
      const sortedWords = sortingWords(newWords.reverse(), currentWord);
      return getVariations(newWords, sortedWords);
    }
  };

  onChange = (e) => {
    console.log('On Change');
    const {
      getVariations,
      searchedWords: lastWords,
      queryMode,
      clearVariations,
    } = this.props;
    const splitter = queryMode ? /or|OR|Or|oR/ : ',';
    const words = generateKeywordArray(e.target.value, splitter);

    clearTimeout(timeout);
    if (words.length > 0 && !arrayEquals(lastWords)) {
      const searchWords = words.reverse();
      timeout = setTimeout(function () {
        getVariations(searchWords, searchWords);
      }, 1000);
      return timeout;
    } else if (e.target.value === '') {
      clearVariations();
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
            id={labelWord.replaceAll(' ', '-')}
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
  getVariations: (searchWords, sortedWords) =>
    dispatch(variationsActions.getVariations(searchWords, sortedWords)),
  rearrangementVariations: (words) =>
    dispatch(variationsActions.rearrangementVariations(words)),
  clearVariations: () => dispatch(variationsActions.clearVariations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TextArea);
