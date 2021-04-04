import { generateKeywordArray } from 'utils';

describe('Generate Keyword ', () => {
  const expected = ['تصالات', 'فودافون', 'اورنج', 'سوق'];
  it('Array with ,', () => {
    expect(generateKeywordArray('تصالات, فودافون, اورنج, سوق', ',')).toEqual(
      expect.arrayContaining(expected)
    );
  });
});
