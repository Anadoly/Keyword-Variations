import { variationsServices } from 'services';
import variationsConstants from './variationsTypes';

const getVariations = (words) => {
  return (dispatch) => {
    dispatch(getVariationsRequest(words));
    variationsServices
      .getVariations(words)
      .then((res) => {
        return dispatch(getVariationsSuccess(res.variations));
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
const getVariationsSuccess = (variations) => ({
  type: variationsConstants.GET_VARIATIONS_SUCCESS,
  variations,
});
const getVariationsFailure = (error) => ({
  type: variationsConstants.GET_VARIATIONS_FAILURE,
  error,
});

const setQueryMode = (queryMode) => ({
  type: variationsConstants.SER_QUERY_MODE,
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
const variationsActions = {
  getVariations,
  setQueryMode,
  copyVariations,
  rearrangementVariations,
};

export default variationsActions;
