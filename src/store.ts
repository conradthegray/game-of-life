// eslint-disable-next-line import/named
import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import simulationReducer from './features/simulation/simulationSlice';

const rootReducer = combineReducers({
  simulation: simulationReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
