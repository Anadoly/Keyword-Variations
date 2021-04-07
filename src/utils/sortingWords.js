import uniq from 'lodash/uniq';

function sortingWords(searchedWords, currentWord) {
  const wordIndex = searchedWords.indexOf(currentWord);
  const wordBefore =
    searchedWords[wordIndex === 0 ? searchedWords.length - 1 : wordIndex - 1];
  const wordAfter =
    searchedWords[searchedWords.length - 1 === wordIndex ? 0 : wordIndex + 1];
  const sortedWords = uniq([
    currentWord,
    wordAfter,
    wordBefore,
    ...searchedWords,
  ]);
  return sortedWords;
}

export default sortingWords;
