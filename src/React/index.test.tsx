import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactMD from './index';

describe('<ReactMD />', () => {
  it('render ReactMD with dumi', () => {
    const msg = 'dumi';

    render(<ReactMD title={msg} />);
    expect(screen.queryByText(msg)).toBeInTheDocument();
  });
});
