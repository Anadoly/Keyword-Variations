import { variationsConstants } from 'redux/actions/types';
import { copyToClipboard } from 'utils';
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';
function variations(
  state = {
    loading: false,
    variations: [],
    searchedWords: [],
    queryMode: false,
    error: null,
  },
  action
) {
  let newVariation;
  function sortingVariations(searchedWords, variations) {
    newVariation = [];
    searchedWords.map((word) => {
      return variations.map(
        (variation) => variation.word === word && newVariation.push(variation)
      );
    });
    newVariation = uniqWith([...newVariation, ...state.variations], isEqual);
    return newVariation;
  }
  switch (action.type) {
    case variationsConstants.GET_VARIATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        searchedWords: action.words,
      };
    case variationsConstants.GET_VARIATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        variations: sortingVariations(state.searchedWords, action.variations),
      };
    case variationsConstants.GET_VARIATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case variationsConstants.SER_QUERY_MODE:
      return {
        ...state,
        queryMode: action.queryMode,
      };
    case variationsConstants.REARRANGEMENT_VARIATIONS:
      return {
        ...state,
        variations: sortingVariations(action.words, state.variations),
      };
    case variationsConstants.COPY_VARIATIONS:
      newVariation = state.variations.map((variation) => {
        if (variation.word === action.word) {
          let copiedString = '';
          const spacers = state.queryMode ? ' OR ' : ',';
          variation.variations.map((word, index) =>
            index === 0
              ? (copiedString += `${word}`)
              : (copiedString += `${spacers}${word}`)
          );
          copyToClipboard(copiedString);
          return { ...variation, copied: true };
        } else {
          return { ...variation, copied: false };
        }
      });
      return {
        ...state,
        variations: newVariation,
      };

    default:
      return state;
  }
}

export default variations;
