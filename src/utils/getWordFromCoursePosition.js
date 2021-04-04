function getWordFromCoursePosition(
  string,
  startPosition,
  endPosition,
  spacers
) {
  const spacersReg = new RegExp(`${spacers}`, 'g');
  const targetWord =
    string.indexOf(spacers, endPosition) < 0
      ? string.substring(
          string.lastIndexOf(spacers, startPosition) < 0
            ? 0
            : string.lastIndexOf(spacers, startPosition)
        )
      : string.substring(
          string.lastIndexOf(spacers, startPosition) < 0
            ? 0
            : string.lastIndexOf(spacers, startPosition),
          string.indexOf(spacers, endPosition)
        );

  const currentWord = targetWord.replace(spacersReg, '').trim();
  return currentWord;
}

export default getWordFromCoursePosition;
