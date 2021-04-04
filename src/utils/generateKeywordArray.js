function generateKeywordArray(string, splitter) {
  const words = [];
  const wordsArray = string.split(splitter);
  wordsArray.forEach((word) => {
    if (word.replace(/ /g, '').replace(/"/g, '').length >= 3) {
      return words.push(word.replace(/"/g, '').trim());
    }
  });
  return words;
}
export default generateKeywordArray;
