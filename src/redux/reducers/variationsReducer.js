import { variationsConstants } from 'redux/actions/types';
import { copyToClipboard, sortingVariations } from 'utils';

function variations(
  state = {
    loading: false,
    variations: [],
    searchedWords: [],
    queryMode: false,
    error: null,
    copiedVariation: '',
  },
  action
) {
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
        variations: sortingVariations(action.variations, action.sortedWords),
      };
    case variationsConstants.GET_VARIATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case variationsConstants.SET_QUERY_MODE:
      return {
        ...state,
        queryMode: action.queryMode,
        variations: [],
        searchedWords: [],
        copiedVariation: '',
      };
    case variationsConstants.REARRANGEMENT_VARIATIONS:
      return {
        ...state,
        variations: sortingVariations(state.variations, action.words),
      };
    case variationsConstants.COPY_VARIATIONS:
      state.variations.map((variation) => {
        if (variation.word === action.word) {
          let copiedString = '';
          const spacers = state.queryMode ? ' OR ' : ',';
          variation.variations.map((word, index) =>
            index === 0
              ? (copiedString += `${word}`)
              : (copiedString += `${spacers}${word}`)
          );
          copyToClipboard(copiedString);
          return variation;
        } else {
          return variation;
        }
      });
      return {
        ...state,
        copiedWord: '',
        copiedVariation: action.word,
      };
    case variationsConstants.CLEAR_VARIATIONS:
      return {
        ...state,
        variations: [],
      };
    case variationsConstants.COPY_WORD:
      copyToClipboard(action.word);
      return {
        ...state,
        copiedVariation: '',
        copiedWord: action.word,
      };
    default:
      return state;
  }
}

export default variations;
