import { variationsServices } from 'services';
import variationsConstants from './variationsTypes';

const getVariations = (searchWords, sortedWords) => {
  return (dispatch) => {
    dispatch(getVariationsRequest(searchWords));
    variationsServices
      .getVariations(searchWords)
      .then((res) => {
        return dispatch(getVariationsSuccess(res.variations, sortedWords));
      })
      .catch((error) => {
        return dispatch(getVariationsFailure(error.error));
      });
  };
};

const getVariationsRequest = (words) => ({
  type: variationsConstants.GET_VARIATIONS_REQUEST,
  words,
});
const getVariationsSuccess = (variations, sortedWords) => ({
  type: variationsConstants.GET_VARIATIONS_SUCCESS,
  variations,
  sortedWords,
});
const getVariationsFailure = (error) => ({
  type: variationsConstants.GET_VARIATIONS_FAILURE,
  error,
});

const setQueryMode = (queryMode) => ({
  type: variationsConstants.SET_QUERY_MODE,
  queryMode,
});

const copyVariations = (word) => ({
  type: variationsConstants.COPY_VARIATIONS,
  word,
});
const rearrangementVariations = (words) => ({
  type: variationsConstants.REARRANGEMENT_VARIATIONS,
  words,
});
const clearVariations = () => ({
  type: variationsConstants.CLEAR_VARIATIONS,
});
const copyWord = (word) => ({
  type: variationsConstants.COPY_WORD,
  word,
});

const variationsActions = {
  getVariations,
  setQueryMode,
  copyVariations,
  rearrangementVariations,
  clearVariations,
  copyWord,
};

export default variationsActions;
