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
        isStopped: false,
        board: {},
        speed: 10,
        cellDensity: 100,
        boardSize: { width: 100, height: 200 },
        initialCellsNum: 100,
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
        isStopped: false,
        board: {},
        speed: 10,
        cellDensity: 100,
        boardSize: { width: 100, height: 200 },
        initialCellsNum: 100,
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

  describe('when the simulation is stopped', () => {
    beforeEach(() => {
      const initialState = {
        isPlaying: false,
        isStopped: true,
        board: {},
        speed: 10,
        cellDensity: 100,
        boardSize: { width: 100, height: 200 },
        initialCellsNum: 100,
      };

      renderWithProviders(<Menu />, {
        preloadedState: {
          simulation: initialState,
        },
      });
    });

    test('it should disable the play button', () => {
      expect(screen.queryByTestId('play-button')).toBeDisabled();
    });

    test('it should disable the stop button', () => {
      expect(screen.queryByTestId('stop-button')).toBeDisabled();
    });
  });

  describe('when the simulation is running', () => {
    beforeEach(() => {
      const initialState = {
        isPlaying: true,
        isStopped: false,
        board: {},
        speed: 10,
        cellDensity: 100,
        boardSize: { width: 100, height: 200 },
        initialCellsNum: 100,
      };

      renderWithProviders(<Menu />, {
        preloadedState: {
          simulation: initialState,
        },
      });
    });

    test('it should enable the play button', () => {
      expect(screen.queryByTestId('play-button')).not.toBeDisabled();
    });

    test('it should enable the stop button', () => {
      expect(screen.queryByTestId('stop-button')).not.toBeDisabled();
    });
  });
});
