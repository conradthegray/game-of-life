import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../../utils/test-utils';
import Header from './Header';

describe('Header', () => {
  test('should have the Menu component', () => {
    const { getByTestId } = renderWithProviders(<Header />);
    expect(getByTestId('menu')).toBeInTheDocument();
  });
});
