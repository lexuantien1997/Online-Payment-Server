import React from 'react';
import ReactDOM from 'react-dom';
import UserRecharge from './Tables';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserRecharge />, div);
  ReactDOM.unmountComponentAtNode(div);
});
