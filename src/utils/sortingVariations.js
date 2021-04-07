import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';

function sortingVariations(variations, sortedWords) {
  let newVariation;
  newVariation = [];
  sortedWords.map((word) => {
    return variations.map(
      (variation) => variation.word === word && newVariation.push(variation)
    );
  });
  newVariation = uniqWith([...newVariation], isEqual);
  return newVariation;
}
export default sortingVariations;
