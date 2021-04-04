import { getWordFromCoursePosition } from 'utils';

describe('get Word From Course Position ', () => {
  it('Array with ,', () => {
    expect(
      getWordFromCoursePosition('تصالات, فودافون, اورنج, سوق', 11, 11, ',')
    ).toEqual('فودافون');
  });
});
