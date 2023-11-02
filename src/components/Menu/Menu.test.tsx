import { describe, test, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../../utils/test-utils';
import Menu from './Menu';

describe('Menu', () => {
  describe('when the animation is playing', () => {
    beforeEach(() => {
      const initialState = {
        isPlaying: true,
        board: {},
        speed: 10,
        cellDensity: 100,
        boardSize: { width: 100, height: 200 },
      };

      renderWithProviders(<Menu />, {
        preloadedState: {
          simulation: initialState,
        },
      });
    });

    test('it should not display the play icon', () => {
      expect(screen.queryByTestId('play-icon')).not.toBeInTheDocument();
    });

    test('it should display the pause icon', () => {
      expect(screen.queryByTestId('pause-icon')).toBeInTheDocument();
    });
  });

  describe('when the animation is not playing', () => {
    beforeEach(() => {
      const initialState = {
        isPlaying: false,
        board: {},
        speed: 10,
        cellDensity: 100,
        boardSize: { width: 100, height: 200 },
      };

      renderWithProviders(<Menu />, {
        preloadedState: {
          simulation: initialState,
        },
      });
    });

    test('it should display the play icon', () => {
      expect(screen.queryByTestId('play-icon')).toBeInTheDocument();
    });

    test('it should not display the pause icon', () => {
      expect(screen.queryByTestId('pause-icon')).not.toBeInTheDocument();
    });
  });
});
