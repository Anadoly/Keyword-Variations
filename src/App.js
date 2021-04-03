import { GlobalStyles } from 'utils';
import { Home } from 'scenes';

import 'utils/fetchIntercept';

function App() {
  return (
    <div>
      <GlobalStyles />
      <Home />
    </div>
  );
}

export default App;
