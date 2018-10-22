/* eslint no-undef: 0 */

import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <div>Test</div>;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
